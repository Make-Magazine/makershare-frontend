import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {Singleton} from '../../core/models/application/singleton';
import * as auth0 from 'auth0-js';
import { Subject } from 'rxjs/Subject';
import {
  NotificationBarService,
  NotificationType,
} from 'ngx-notification-bar/release';
import { UserService } from '../../core/d7services';
import { ProfilePictureService } from '../shared/profile-picture/profile-picture.service';

@Injectable()
export class Auth {
  private _toggleModal = new Subject<boolean>();
  toggleModal$ = this._toggleModal.asObservable();

  auth0 = new auth0.WebAuth({
    clientID: 'yvcmke0uOoc2HYv0L2LYWijpGi0K1LlU',
    domain: 'makermedia.auth0.com',
    // responseType: 'token id_token access_token profile',
    responseType: 'token',
    audience: 'https://makermedia.auth0.com/userinfo',
    // redirectUri: 'http://localhost:4200/',
    redirectUri: Singleton.Settings.appURL,
    scope: 'openid id_token access_token profile',
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

  /**
   * login
   *
   * @param {string} username
   * @param {string} password
   */
  public login(username: string, password: string): void {
    this.auth0.client.login(
      {
        realm: 'Username-Password-Authentication',
        username,
        password,
      },
      (err, authResult) => {
        if (err) {
          console.log(err);
          alert(
            `Error: ${err.error_description}. Check the console for further details.`,
          );
          return;
        } else if (authResult && authResult.accessToken && authResult.idToken) {
          // this.setSession(authResult);
          this.doLogin(authResult);
        }
      },
    );
  }

  /**
   * signup
   *
   * @param {string} email
   * @param {string} password
   * @param {string} first_name
   * @param {string} last_name
   * @param {string} month
   * @param {string} day
   * @param {string} year
   * @param {string} birthdate
   * @param {boolean} checkbox
   */
  public signup(
    email: string,
    password: string,
    first_name: string,
    last_name: string,
    month: string,
    day: string,
    year: string,
    birthdate: string,
    checkbox: boolean,
  ): void {
    this.auth0.redirect.signupAndLogin(
      {
        connection: 'Username-Password-Authentication',
        email,
        password,
        user_metadata: {
          firstname: first_name,
          lastname: last_name,
          birthdate: '"' + birthdate + '"',
          dob: '"' + new Date(month + '/' + day + '/' + year).getTime() + '"',
          Month: month,
          Day: day,
          Year: year,
        },
      },
      err => {
        if (err) {
          alert(
            `Error: ${err.description}. Check the console for further details.`,
          );
          return;
        }
      },
    );
  }

  /**
   * handleAuthentication
   */
  public handleAuthentication(): void {
    this.auth0.parseHash(
      (
        window.location.hash,
        (err, authResult) => {
          if (authResult) {
            this.doLogin(authResult);
          } else if (err) {
            this.router.navigate(['/']);
            alert(
              `Error: ${err.error}. Check the console for further details.`,
            );
          }
        }
      ),
    );
  }

  /**
   * doLogin
   * @param authResult
   */
  public doLogin(authResult): void {
    var self = this;
    this.auth0.client.userInfo(authResult.accessToken, function(err, user) {
      if (err) {
        console.log(err);
        return;
      }
      var data = user;
      data.idToken = authResult.idToken;
      data.user_id = user.sub;
      (data.email_verified =
        user[
          'http://makershare.com/email_verified'
        ]), (data.access_token = authResult.accessToken);
      data.email = user.name;
      data.user_metadata = {
        firstname: user['http://makershare.com/firstname'],
        lastname: user['http://makershare.com/lastname'],
      };
      console.log(data);
      if (user.email_verified == true) {
        self.userService.auth0_authenticate(data).subscribe(res => {
          if (res.user.uid != 0) {
            localStorage.setItem('access_token', authResult.accessToken);
            localStorage.setItem('id_token', authResult.idToken);
            localStorage.setItem('user_id', res.user.uid);
            localStorage.setItem('user_name', res.user.name);
            localStorage.setItem('roles', JSON.stringify(res.user.roles));

            self.userService.saveCookies(
              res['token'],
              res['session_name'],
              res['sessid'],
            );
            // update profile picture globally
            self.profilePictureService.update(res.user_photo);
            // redirect to the profile page if it's first time
            if (res.first_time == true) {
              setTimeout(function() {
                self.router.navigate(['portfolio']);
                window.location.reload();
              }, 1000);
            } else if (res.user_photo.indexOf('profile-default') < 0) {
              self.router.navigate(['/']);
              window.location.reload();
            }
            window.location.reload();
          } else {
            // localStorage.setItem('user_photo', res.user_photo);
            localStorage.setItem('user_id', '0');
          }

          // if the first time, navigate to edit profile page
          window.location.hash = '';
          if (res.user_photo.indexOf('profile-default.png') >= 0) {
            self.notificationBarService.create({
              message:
                'Please upload a profile photo now to get started creating projects.',
              type: NotificationType.Warning,
              autoHide: false,
              allowClose: true,
              hideOnHover: false,
            });
            self.router.navigate(['/portfolio/']);
          }
        });
      } else {
        // not verified
        self.notificationBarService.create({
          message:
            'For your security, check email for our Welcome message and activate your Maker Share account.',
          type: NotificationType.Warning,
          autoHide: false,
          allowClose: true,
          hideOnHover: false,
        });
      }
      self.setSession(authResult);
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
  //   public password_reset(){
  //     auth0 .passwordlessStart({
  //     connection: 'email',
  //     send: 'link',
  //     email: 'ghadaezzat89@gmail.com'
  //   }, function (err,res) {
  //     // handle errors or continue
  //     console.log(err);
  //   }
  // );
  //   }

  /**
   * resetPassword
   *
   * @param {string} email
   * @param {string} connection
   */
  public resetPassword(
    email: string,
    connection: string = 'Username-Password-Authentication',
  ) {
    const options = {
      email: email,
      connection: connection,
    };
    this.auth0.changePassword(options, function() {});
  }
}
