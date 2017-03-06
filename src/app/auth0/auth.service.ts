import { Injectable }      from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { UserService } from '../d7services/user/user.service';
import { MainService } from '../d7services/main/main.service';
//import Auth0 from 'auth0-js';

// Avoid name not found warnings
let Auth0Lock = require('auth0-lock').default;

@Injectable()
export class Auth {
  // Configure Auth0
  lock = new Auth0Lock('yvcmke0uOoc2HYv0L2LYWijpGi0K1LlU', 'makermedia.auth0.com', {});
  constructor(
    private userService: UserService,
    private mainService: MainService,
  ) {
    // Add callback for lock `authenticated` event
    this.lock.on("authenticated", (authResult) => {
      console.log(authResult);
      localStorage.setItem('id_token', authResult.idToken);

      // get the user profile
      this.lock.getProfile(authResult.idToken, (error, profile) => {
        if (error) {
          alert(error);
          return;
        }
        var data = profile;
        data.idToken = authResult.idToken;
        this.userService.auth0_authenticate(data).subscribe(res => {
            console.log(res);
            this.mainService.saveCookies(res['token'],res['session_name'],res['sessid']);
        });

      });      
    });
  }

  public login() {
    // Call the show method to display the widget.
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
    

  }
}