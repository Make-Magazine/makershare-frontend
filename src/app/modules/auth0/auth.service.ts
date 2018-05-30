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
   * login
   *
   * @param {string} username
   * @param {string} password
   */
  public login(username: string, password: string): Observable<Error | boolean> {
    return Observable.create(observer => {
      this.auth0.client.login(
        {
          realm: 'Username-Password-Authentication',
          username,
          password,
        },
        (err, authResult) => {
          if (err) {
            observer.error(err);
          } else if (authResult && authResult.accessToken && authResult.idToken) {
            observer.next(true);
            this.doLogin(authResult);
            observer.complete();
          }
        },
      );
    });
  }

  /**
   * signupNewsletter
   *
   * @param {string} email
   */
  public signupNewsletter(email: string) {
    return this.userService.newsletterSubscribe(email).subscribe(data => {
      this.notificationBarService.create({ message: 'Thank you for your subscription.', type: NotificationType.Success, allowClose: true, autoHide: false, hideOnHover: false });
    });
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
    year: string
  ): Observable<Error | boolean> {
    const birthdate: number = new Date(month + '/' + day + '/' + year).getTime();

    return Observable.create(observer => {
      this.auth0.redirect.signupAndLogin(
        {
          connection: 'Username-Password-Authentication',
          email,
          password,
          user_metadata: {
            firstname: first_name,
            lastname: last_name,
            birthdate: `${birthdate}`,
            dob: `${birthdate}`,
            Month: month,
            Day: day,
            Year: year,
          },
        },
        (err, authResult) => {
          observer.error(err);
        },
      );
    });
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
          observer.next(true);
          this.doLogin(authResult);
          observer.complete();
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
console.log('auth0 user');
console.log(user);
      const data = user;
      data.idToken = authResult.idToken;
      data.user_id = user.sub;

      /*
      (data.email_verified =
        user[
          'http://makershare.com/email_verified'
        ]), (data.access_token = authResult.accessToken);*/
      data.email_verified = true;
      data.email = user.name;
      data.user_metadata = {
        firstname: 'Alicia',
        lastname: 'Williams',
        dob: '1/11/1976',
      };

      // Set session to let the browser know the user is now logged in
      this.setSession(authResult);
console.log('after update');
console.log(data);

      this.userService.auth0_authenticate(data).subscribe(res => {
alert('res.user.uid='+res.user.uid);
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
