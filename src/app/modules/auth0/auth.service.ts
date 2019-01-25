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
  ) {this.checkSession();}
  

  public checkSession(): void {
    //check if logged in another place
    this.auth0.checkSession({},
      (err, authResult) => {
        if (authResult) {
          this.setSession(authResult);

          //if the user isn't logged into drupal, log them in
          if (!localStorage.getItem('user_id') ) {
            this.doLogin(authResult);
          }
          if(localStorage.getItem('user_avatar') && localStorage.getItem('user_avatar')!=''){
            $("#user_avatar").attr("src",localStorage.getItem('user_avatar'));
				$(".profile-info .avatar").attr("src",localStorage.getItem('user_avatar'));
          } 
			 if(localStorage.getItem('user_email') && localStorage.getItem('user_email')!=''){
			 	$('.dropdown-links .profile-email').html(localStorage.getItem('user_email'));
			 }
			 if(localStorage.getItem('user_fullname') && localStorage.getItem('user_fullname')!=''){
			 	$('.profile-info .profile-name').html(localStorage.getItem('user_fullname'));
			 }
			 
        } else if (err) {
          console.log(err);
			 if($("#user_avatar").length){ // if we should be logged out, but the avatar is still trying to set
			 	this.logout(); 
			}
        }
      }
    );
  }

  /**
   * toggle
   *
   * @param {boolean} enable
   */
  public toggle(enable: boolean) {
    this._toggleModal.next(enable);
  }

  public Auth0Login(): void {
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

      //temp overwrite profile picture with auth0 avatar
      localStorage.setItem('user_avatar', user.picture);

      const data = user;
      data.idToken = authResult.idToken;
      data.user_id = user.sub;
      (data.email_verified =
        user[
          'http://makershare.com/email_verified'
        ]), (data.access_token = authResult.accessToken);
      data.email_verified = true;
      data.subscribeToNewsletter = localStorage.getItem('subscribeToNewsletter');
      data.email = user.name;

      data.user_metadata = {
        firstname: user["http://makershare.com/firstname"],
        lastname: user["http://makershare.com/lastname"],
        dob: user["http://makershare.com/dob"]
      };
		
		localStorage.setItem('user_email', data.email);
		localStorage.setItem('user_fullname', data.user_metadata['firstname'] + " " + data.user_metadata['lastname']);

      this.userService.auth0_authenticate(data).subscribe(res => {
		  console.log(res);
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

          //update userMeta on auth0
          //this.updUserMeta(authResult.accessToken, res, data);
			 
			 // Check if user has errors like being underage, if so log them out and let them know
			 var querystring = this.router.routerState.snapshot.url;
			 var querystringArray = querystring.split("&");
			 if(querystringArray[0] == "/#error=unauthorized") {
			    var errorDesc = querystringArray[1].split("=");
				 alert(errorDesc[1].replace(/%20/g, " ").replace(/%253B/g, ","));
				 this.logout();
			 } else {
				 // redirect to the profile page if it's a user's first time
				 if (res.first_time) {
					// Notification to visit portfolio page
					this.notificationBarService.create({
					  message: 'Welcome to Makershare! Let\'s get you to your portfolio page to get started.',
					  type: NotificationType.Success,
					  autoHide: true,
					  isHtml: true,
					  allowClose: true,
					  hideOnHover: false,
					});
					window.location.href = Singleton.Settings.appURL + "/portfolio";
				 // User doesn't have a profile picture	
				 } else if (res.user_photo.indexOf('profile-default.png') >= 0) {
					/* User sees this notification on the portfolio page we're bring them to, no need to show here
					this.notificationBarService.create({
					  message: 'Please <a href="/portfolio">upload a profile photo.</a>',
					  type: NotificationType.Success,
					  autoHide: true,
					  allowClose: true,
					  hideOnHover: false,
					  isHtml: true,
					});*/
					window.location.href = Singleton.Settings.appURL + "/portfolio";
				 } else if (res.user_photo.indexOf('profile-default') < 0) {
					this.router.navigateByUrl('/');
					window.location.reload();
				 }
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

  /*
   * updUserMeta
   * @param accessToken
   *        res
   */
  public updUserMeta(accessToken, res, data) {
    const settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://makermedia.auth0.com/api/v2/users",
      "method": "POST",
      "headers": {
        "authorization": "Bearer ABCD",
        "content-type": "application/json"
      },
      "processData": false,
      "data": {"email": data.email, "user_metadata": {"ms_user": true}}
    }

    $.ajax(settings).done(function (response) {
      console.log(response);
    });

  }

  /**
   * setSession
   * @param authResult
   */
  public setSession(authResult): void {
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
    localStorage.removeItem('expires_at');
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_photo');

    // logout of auth0
    window.location.href = 'https://makermedia.auth0.com/v2/logout?returnTo='+Singleton.Settings.appURL;
  }

  /**
   * authenticated
   *
   * @returns {boolean}
   */
  public authenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    var expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
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
