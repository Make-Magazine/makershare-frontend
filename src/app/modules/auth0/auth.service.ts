import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as auth0 from 'auth0-js';
import { NotificationBarService, NotificationType } from 'ngx-notification-bar/release';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { UserService } from '../../core/d7services';
import { Singleton } from '../../core/models/application/singleton';
import { ProfilePictureService } from '../shared/profile-picture/profile-picture.service';

@Injectable()
export class Auth {
  private _toggleModal = new Subject<boolean>();
  toggleModal$ = this._toggleModal.asObservable();

  auth0 = new auth0.WebAuth({
    clientID: 'yvcmke0uOoc2HYv0L2LYWijpGi0K1LlU',
    domain: 'makermedia.auth0.com',
    // responseType: 'token id_token access_token profile',
    responseType: 'token id_token',
    audience: 'https://makermedia.auth0.com/userinfo',
    redirectUri: Singleton.Settings.appURL,
    //scope: 'openid id_token access_token profile',
    scope: 'openid profile',
    leeway: 60
  });

  constructor(
    public router: Router,
    private userService: UserService,
    private profilePictureService: ProfilePictureService,
    private notificationBarService: NotificationBarService,
  ) {}

  /**
   * toggle
   *
   * @param {boolean} enable
   */
  public toggle(enable: boolean) {
    this._toggleModal.next(enable);
  }

  public Auth0Login(): void {
    //localStorage.setItem('redirect_to',location.href);
    this.auth0.authorize();
  }

  /**
   * handleAuthentication
   */
  public handleAuthentication(): void {
    this.auth0.parseHash(
      {
        hash: window.location.hash,
      },
      (err, authResult) => {
        if (authResult) {
          this.doLogin(authResult);
        } else if (err) {

        }
      }
    );
  }

  /**
   * doLogin
   * @param authResult
   */
  public doLogin(authResult): void {
    this.auth0.client.userInfo(authResult.accessToken, (err, user) => {
      if (err) {
        console.log(err);
        return;
      }
      const data = user;
      data.idToken = authResult.idToken;
      data.user_id = user.sub;
      (data.email_verified =
        user[
          'http://makershare.com/email_verified'
        ]), (data.access_token = authResult.accessToken);
      data.email_verified = true;
      data.email = user.name;
      data.user_metadata = {
        firstname: user['http://makershare.com/firstname'],
        lastname: user['http://makershare.com/lastname'],
        dob: user['http://makershare.com/dob'],
      };

      // Set session to let the browser know the user is now logged in
      this.setSession(authResult);
console.log(data);
      this.userService.auth0_authenticate(data).subscribe(res => {
        if (res.user.uid != 0) {
          localStorage.setItem('access_token', authResult.accessToken);
          localStorage.setItem('id_token', authResult.idToken);
          localStorage.setItem('user_id', res.user.uid);
          localStorage.setItem('user_name', res.user.name);
          localStorage.setItem('roles', JSON.stringify(res.user.roles));

          this.userService.saveCookies(
            res['token'],
            res['session_name'],
            res['sessid'],
          );
          // update profile picture globally
          this.profilePictureService.update(res.user_photo);

          // Set session
          this.setSession(authResult);

          // redirect to the profile page if it's first time
          if (res.first_time) {
            // Notification to visit portfolio page
            this.notificationBarService.create({
              message:
                'Welcome! Please <a href="/portfolio">visit you profile page</a> to complete your portfolio',
              type: NotificationType.Warning,
              autoHide: true,
              isHtml: true,
              allowClose: true,
              hideOnHover: false,
            });
          } else if (res.user_photo.indexOf('profile-default') < 0) {
            this.router.navigateByUrl('/');
            window.location.reload();
          } else if (res.user_photo.indexOf('profile-default.png') >= 0) {
            this.notificationBarService.create({
              message:
                'Please <a href="/portfolio">upload a profile photo</a> now to start creating projects.',
              type: NotificationType.Warning,
              autoHide: true,
              allowClose: true,
              hideOnHover: false,
              isHtml: true,
            });
            window.location.href = Singleton.Settings.appURL;
          }
        } else {
          // localStorage.setItem('user_photo', res.user_photo);
          localStorage.setItem('user_id', '0');
          window.location.href = Singleton.Settings.appURL;
        }
      }, err => {
        console.log(err);
      });


    });
  }

  /**
   * setSession
   * @param authResult
   */
  private setSession(authResult): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime(),
    );
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  /**
   * logout
   */
  public logout(): void {
    // logout from back-end
    this.userService.auth0_logout().subscribe(
      res => {
        this.userService.removeCookies();
        this.router.navigateByUrl('/');
      },
      err => {},
    );
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_photo');
    // Go back to the home route
    this.router.navigate(['/']);
    window.location.reload();
  }

  /**
   * authenticated
   *
   * @returns {boolean}
   */
  public authenticated(): boolean {
    if (
      localStorage.getItem('access_token') &&
      localStorage.getItem('id_token')
    ) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * IsCommuintyManager
   *
   * @returns {boolean}
   * @constructor
   */
  public IsCommuintyManager(): boolean {
    if (this.authenticated() == true) {
      const roles = JSON.parse(localStorage.getItem('roles'));
      if (roles) {
        return '4' in roles;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

}
