import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { UserService } from '../d7services/user/user.service';
import { MainService } from '../d7services/main/main.service';
import { Observable } from 'rxjs/Observable';
import { NotificationBarService, NotificationType } from 'angular2-notification-bar';
import { Router, ActivatedRoute } from '@angular/router';
import * as globals from '../d7services/globals';

//import Auth0 from 'auth0-js';

// Avoid name not found warnings
let Auth0Lock = require('auth0-lock').default;

@Injectable()
export class Auth {

  // Configure Auth0
  // redirectURLObs: Observable<string>;
  // redirectURL: string;
  screen = 'login';
  yearsArr= [];
  lock = new Auth0Lock('yvcmke0uOoc2HYv0L2LYWijpGi0K1LlU', 'makermedia.auth0.com', {
    loginUrl: '/login',
    auth: {
        redirectUrl: globals.appURL,
        responseType: 'token',
        params: {state: localStorage.getItem('redirectUrl')},
    },
    socialButtonStyle: 'small',
    initialScreen: this.screen,
    languageDictionary: {
      title: ""
    },
    theme: {
      logo: globals.domain + '/sites/default/files/logo.png',
      primaryColor: '#d41c2b'
    }
  });


  constructor(
    private userService: UserService,
    private mainService: MainService,
    private notificationBarService: NotificationBarService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    // Add callback for lock `authenticated` event
    this.lock.on("authenticated", (authResult) => {
      
       console.log(authResult);
      // get the user profile
      this.lock.getProfile(authResult.idToken, (error, profile) => {
        if (error) {
          // console.log(error);
          return;
        }
        // console.log(profile);
        var data = profile;
        data.idToken = authResult.idToken;
        if (profile['email_verified'] == true) {
          this.userService.auth0_authenticate(data).subscribe(res => {
            if (res.user.uid != 0) {
              // console.log(res);
              localStorage.setItem('id_token', authResult.idToken);
              localStorage.setItem('user_id', res.user.uid);
              localStorage.setItem('user_name', res.user.name);
              localStorage.setItem('user_photo', res.user_photo);
              if(authResult.state != ''){
                this.router.navigate([authResult.state]);
              }
              
            } else {
              localStorage.setItem('user_photo', res.user_photo);
              localStorage.setItem('user_id', '0');
            }

            this.mainService.saveCookies(res['token'], res['session_name'], res['sessid']);
          });
        }

        //this.router.navigateByUrl('/user');
        // show warning message if mail not verfied
        if (profile['email_verified'] == false) {
          this.notificationBarService.create({ message: 'For your security, confirm your email address. If you can’t find our Welcome email in your inbox, tell us your email address and we’ll resend.', type: NotificationType.Warning, autoHide: false, allowClose: true, hideOnHover: false });
        } else {
          this.notificationBarService.create({ message: 'Welcome, You are now loged in.', type: NotificationType.Success });
        }


      });
    });

    this.lock.on("authorization_error", (err) => {
      // console.log(err);
      if(err.error == "unauthorized"){
        // console.log('it is true');
        this.notificationBarService.create({ message: err.error_description, type: NotificationType.Error, autoHide: false, allowClose: true, hideOnHover: false });
      }
    });
  }

    // ngOnInit() {
    //   this.redirectURLObs = this.route.queryParams.map(params => params['redirectUrl'] || '');
    //   this.redirectURLObs.subscribe(param => {
    //     if(param.length > 0){
    //       this.redirectURL = param;
    //       console.log(this.redirectURL);
    //     }
        
    //   }); 
    // }



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
    this.userService.auth0_logout().subscribe(res => {
      this.mainService.removeCookies();
      this.router.navigateByUrl('/');
    }, err => {
    });
      localStorage.removeItem('id_token');
      localStorage.removeItem('user_id');
      localStorage.removeItem('user_name');

    //this.notificationBarService.create({ message: 'Come back soon.', type: NotificationType.Success});
  }
  
  public getYears(){
    var max = new Date().getFullYear();
    var yearsArr = [];
    for (var _i = 1; _i < 100; _i++) {
      yearsArr.push({value: max - _i, label: max - _i});

    }
    this.yearsArr = yearsArr;
    return yearsArr;
  }
}