import * as globals from '../d7services/globals';
import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import 'rxjs/add/operator/filter';
import Auth0Lock from 'auth0-lock';
import { UserService, MainService } from '../d7services';
import { NotificationBarService, NotificationType } from 'angular2-notification-bar/release';
import { ProfilePictureService } from '../components/shared/profile-picture/profile-picture.service';

@Injectable()
export class Auth {


  lock = new Auth0Lock('yvcmke0uOoc2HYv0L2LYWijpGi0K1LlU', 'makermedia.auth0.com', {
    allowedConnections: ['Username-Password-Authentication'],
    loginUrl: '/login',
    oidcConformant: true,
    autoclose: true,
    auth: {
      redirectUrl: globals.appURL,
      responseType: 'token id_token',
      audience: 'https://makermedia.auth0.com/userinfo',
      params: {
        scope: 'openid'
      }
    },
    theme: {
      logo: globals.domain + '/sites/default/files/logo.png',
      primaryColor: '#d41c2b'
    },
    languageDictionary: {
      //emailInputPlaceholder: "something@youremail.com",
      title: ""
    },
  });
  constructor(
    public router: Router,
    private mainService: MainService,
    private userService: UserService,
    private profilePictureService: ProfilePictureService,
    private notificationBarService: NotificationBarService,
  ) { }


  public login(): void {
    this.lock.show();
  }


  // Call this method in app.component
  // if using path-based routing
  public handleAuthentication(): void {
    this.lock.on('authenticated', (authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.lock
        this.lock.getUserInfo(authResult.accessToken, (error, profile) => {
          if (error) {
            return;
          }
          var data = profile;
          data.idToken = authResult.idToken;
          data.user_id = profile.sub;
          data.access_token = authResult.access_token;
          if (profile.email_verified == true) {
            this.userService.auth0_authenticate(data).subscribe(res => {
              if (res.user.uid != 0) {
                localStorage.setItem('access_token', authResult.accessToken);
                localStorage.setItem('id_token', authResult.idToken);
                localStorage.setItem('user_id', res.user.uid);
                localStorage.setItem('user_name', res.user.name);
                localStorage.setItem('roles', JSON.stringify(res.user.roles));

                this.profilePictureService.update(res.user_photo);
                //localStorage.setItem('user_photo', res.user_photo);

                // first time - redirection to profile edit page

                if (res.first_time == true) {

                  this.router.navigate(['/portfolio']);

                } else {

                }


              } else {
                //localStorage.setItem('user_photo', res.user_photo);
                localStorage.setItem('user_id', '0');
              }

              this.mainService.saveCookies(res['token'], res['session_name'], res['sessid']);
              // if the first time, navigate to edit profile page


            });

          } else {
            // not verified
            this.notificationBarService.create({ message: 'For your security, check email for our Welcome message and activate your Maker Share account.', type: NotificationType.Warning, autoHide: false, allowClose: true, hideOnHover: false });
          }


        });
      }
    });
    this.lock.on('authorization_error', (err) => {
      //this.router.navigate(['/']);
      //console.log(err);
    });
  }

  // Call this method in app.component
  // if using hash-based routing
  public handleAuthenticationWithHash(): void {
    this
      .router
      .events
      .filter(event => event instanceof NavigationStart)
      .filter((event: NavigationStart) => (/access_token|id_token|error/).test(event.url))
      .subscribe(() => {
        this.lock.resumeAuth(window.location.hash, (err, authResult) => {
          if (err) {
            this.router.navigate(['/']);
            console.log(err);
            return;
          }
          this.setSession(authResult);
          this.router.navigate(['/']);
        });
      });
  }

  private setSession(authResult): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  public logout(): void {
    // logout from back-end
    this.userService.auth0_logout().subscribe(res => {
      this.mainService.removeCookies();
      this.router.navigateByUrl('/');
    }, err => {
    });
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');;
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_photo');
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public authenticated(): boolean {
    if (localStorage.getItem('access_token') && localStorage.getItem('id_token')) {
      return true;
    } else {
      return false;
    }
  }
  

}