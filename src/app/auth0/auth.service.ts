// src/app/auth0/auth.service.ts
import * as globals from '../d7services/globals';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import auth0 from 'auth0-js';
import { UserService, MainService } from '../d7services';
import { NotificationBarService, NotificationType } from 'angular2-notification-bar/release';
import { ProfilePictureService } from '../components/shared/profile-picture/profile-picture.service';

@Injectable()
export class Auth {
  options = {
    allowedConnections: ['Username-Password-Authentication'],
    loginUrl: '/login',
    auth: {
      redirectUrl: globals.appURL,
      responseType: 'token',
    },
    socialButtonStyle: 'small',
    theme: {
      logo: globals.domain + '/sites/default/files/logo.png',
      primaryColor: '#d41c2b'
    },
    languageDictionary: {
      title: ""
    },
  };
  auth0 = new auth0.WebAuth({
    clientID: 'yvcmke0uOoc2HYv0L2LYWijpGi0K1LlU',
    domain: 'makermedia.auth0.com',
    responseType: 'token',
    audience: 'https://makermedia.auth0.com/userinfo',
    redirectUri: globals.appURL,
    scope: 'openid profile'
  });
  constructor(
    private router: Router,
    private userService: UserService,
    private mainService: MainService,
    private notificationBarService: NotificationBarService,
    private profilePictureService: ProfilePictureService,
  ) { }
  public login(): void {
    this.auth0.authorize();
  }
  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      this.auth0.client.userInfo(authResult.accessToken, (error, profile) => {
        if (error) {
          console.log(error);
          return;
        }
        var data = profile;
        data.idToken = authResult.idToken;
        if (profile['email_verified'] == true) {
          this.userService.auth0_authenticate(data).subscribe(res => {
            if (res.user.uid != 0) {
              window.location.hash = '';
              localStorage.setItem('id_token', authResult.idToken);
              localStorage.setItem('user_id', res.user.uid);
              localStorage.setItem('user_name', res.user.name);
              localStorage.setItem('roles', JSON.stringify(res.user.roles));
              const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
              localStorage.setItem('expires_at', expiresAt);
              this.profilePictureService.update(res.user_photo);
              // first time - redirection to profile edit page
              if (res.first_time == true) {
                this.router.navigate(['/portfolio']);
              }
            } else {
              localStorage.setItem('user_id', '0');
            }
            this.mainService.saveCookies(res['token'], res['session_name'], res['sessid']);
          });
        }
        // show warning message if mail not verfied
        if (profile['email_verified'] == false) {
          this.notificationBarService.create({ message: 'For your security, check email for our Welcome message and activate your Maker Share account.', type: NotificationType.Warning, autoHide: false, allowClose: true, hideOnHover: false });
        }
      });
      if (err) {
        if (err.error_description == "Sorry, we are not able to process your request.") {
          this.notificationBarService.create({ message: 'Only Makers 13 and older can use our site; please come back and create an account when you\'re a teenager.', type: NotificationType.Warning, autoHide: false, allowClose: true, hideOnHover: false });
        }
      }
    });
  }
  public logout(): void {
    // Remove token from localStorage
    localStorage.removeItem('id_token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_photo');
    localStorage.removeItem('expires_at');
    this.userService.auth0_logout().subscribe(res => {
      this.mainService.removeCookies();
      this.router.navigateByUrl('/');
    }, err => { });
  }
  public authenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
}