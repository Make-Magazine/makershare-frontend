import { Injectable }      from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { UserService } from '../d7services/user/user.service';
import { MainService } from '../d7services/main/main.service';
import { NotificationBarService, NotificationType } from 'angular2-notification-bar';
import { Router } from '@angular/router';

//import Auth0 from 'auth0-js';

// Avoid name not found warnings
let Auth0Lock = require('auth0-lock').default;

@Injectable()
export class Auth {
  // Configure Auth0
  screen = 'login';
  lock = new Auth0Lock('yvcmke0uOoc2HYv0L2LYWijpGi0K1LlU', 'makermedia.auth0.com', {
    initialScreen: this.screen,
  });
  constructor(
    private userService: UserService,
    private mainService: MainService,
    private notificationBarService: NotificationBarService,
    private router: Router,
  ) {
    // Add callback for lock `authenticated` event
    this.lock.on("authenticated", (authResult) => {
      localStorage.setItem('id_token', authResult.idToken);

      // get the user profile
      this.lock.getProfile(authResult.idToken, (error, profile) => {
        if (error) {
          alert(error);
          return;
        }
        console.log(profile);
        var data = profile;
        data.idToken = authResult.idToken;
        this.userService.auth0_authenticate(data).subscribe(res => {
          console.log(res);
            localStorage.setItem('user_id', res.user.uid);
            this.mainService.saveCookies(res['token'],res['session_name'],res['sessid']);
        });
        this.router.navigateByUrl('/user');
            // show warning message if mail not verfied
        if(profile['email_verified'] == false){
          this.notificationBarService.create({ message: 'For your security, confirm your email address. If you can’t find our Welcome email in your inbox, tell us your email address and we’ll resend.', type: NotificationType.Warning, autoHide: false, allowClose: true, hideOnHover: false});
        }else{
          this.notificationBarService.create({ message: 'Welcome, You are now loged in.', type: NotificationType.Success});
        }        


      });      
    });
  }

  public login() {
    // Call the show method to display the widget.
    this.screen = 'login';
    this.lock.show(); 
  }

  public signUp() {
    // Call the show method to display the widget.
    this.screen = 'signUp';
    this.lock.show(); 
  }

  public authenticated() {
    // Check if there's an unexpired JWT
    // This searches for an item in localStorage with key == 'id_token'
    return tokenNotExpired();
  }

  public logout() {
    // Remove token from localStorage
    localStorage.removeItem('id_token');
    this.mainService.removeCookies();
    this.router.navigateByUrl('/');
    //this.notificationBarService.create({ message: 'Come back soon.', type: NotificationType.Success});

    

  }
}