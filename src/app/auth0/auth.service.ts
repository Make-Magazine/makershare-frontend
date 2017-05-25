import { Injectable, OnInit } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { UserService,MainService } from '../d7services';
import * as globals from '../d7services/globals';
import { Observable } from 'rxjs/Observable';
import { NotificationBarService, NotificationType } from 'angular2-notification-bar/release';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { ProfilePictureService } from '../components/shared/profile-picture/profile-picture.service';

//import Auth0 from 'auth0-js';

// Avoid name not found warnings
let Auth0Lock = require('auth0-lock').default;

@Injectable()
export class Auth implements OnInit {

  // Configure Auth0
  // redirectURLObs: Observable<string>;
  // redirectURL: string;
  screen = 'login';
  yearsArr = [];
  stateValue: string;
  lock;



  constructor(
    private userService: UserService,
    private mainService: MainService,
    private notificationBarService: NotificationBarService,
    private router: Router,
    private route: ActivatedRoute,
    private profilePictureService: ProfilePictureService,
  ) {
    //router.events.subscribe((url:any) => {this.state = url.url});
  // router.events
  //   .filter(event => event instanceof NavigationStart)
  //   .subscribe((event:NavigationStart) => {
  //     this.stateValue = event.url;
      // localStorage.setItem('currentURL', event.url);
      // console.log(localStorage.getItem('currentURL'));
    // });
    
  this.lock = new Auth0Lock('yvcmke0uOoc2HYv0L2LYWijpGi0K1LlU', 'makermedia.auth0.com', {
    allowedConnections: ['Username-Password-Authentication'],
    loginUrl: '/login',
    auth: {
      redirectUrl: globals.appURL,
      responseType: 'token',
      // params: {
      //   state: 'makers',
      // },
    },
    socialButtonStyle: 'small',
    theme: {
      logo: globals.domain + '/sites/default/files/logo.png',
      primaryColor: '#d41c2b'
    },
    languageDictionary: {
      //emailInputPlaceholder: "something@youremail.com",
      title: ""
    },
  }

  );


    // Add callback for lock `authenticated` event
    this.lock.on("authenticated", (authResult) => {
      console.log(authResult);
      // get the user profile
      this.lock.getProfile(authResult.idToken, (error, profile) => {
        if (error) {
           console.log(error);
          return;
        }
        var data = profile;
        data.idToken = authResult.idToken;
        if (profile['email_verified'] == true) {


          this.userService.auth0_authenticate(data).subscribe(res => {
            if (res.user.uid != 0) {
              localStorage.setItem('id_token', authResult.idToken);
              localStorage.setItem('user_id', res.user.uid);
              localStorage.setItem('user_name', res.user.name);
              localStorage.setItem('roles',JSON.stringify(res.user.roles));

              this.profilePictureService.update(res.user_photo);
              //localStorage.setItem('user_photo', res.user_photo);

              // first time - redirection to profile edit page

              if (res.first_time == true) {

                this.router.navigate(['/portfolio']);
                
              }else {
                // console.log(localStorage.getItem('currentURL'));
                console.log(localStorage.getItem('currentURL'));

                //this.router.navigate([localStorage.getItem('currentURL')]);
              }
            
              // if (authResult.state != '') {
                  
              //     console.log(decodeURI(authResult.state));
              //     console.log(decodeURIComponent(authResult.state));
              //     console.log(JSON.parse(authResult.state));
              //     // this.router.navigate(authResult.state);
              // }


            } else {
              //localStorage.setItem('user_photo', res.user_photo);
              localStorage.setItem('user_id', '0');
            }

            this.mainService.saveCookies(res['token'], res['session_name'], res['sessid']);
            // if the first time, navigate to edit profile page


          });

        }

        //this.router.navigateByUrl('/user');
        // show warning message if mail not verfied
        if (profile['email_verified'] == false) {
          this.notificationBarService.create({ message: 'For your security, check email for our Welcome message and activate your Maker Share account.', type: NotificationType.Warning, autoHide: false, allowClose: true, hideOnHover: false });
        } else {
          // this.notificationBarService.create({ message: 'Welcome, You are now logged in.', type: NotificationType.Success });
        }


      });
    });

    this.lock.on("authorization_error", (err) => {
      console.log(err);
      if (err.error_description == "Sorry, we are not able to process your request.") {
         console.log('it is true');
         this.notificationBarService.create({ message: 'Only Makers 13 and older can use our site; please come back and create an account when you\'re a teenager.', type: NotificationType.Warning, autoHide: false, allowClose: true, hideOnHover: false });
         console.log('end......');
      }
    });
  }

  ngOnInit() {

  }



  public login() {
    // Call the show method to display the widget.
    this.screen = 'login';
    localStorage.setItem('currentURL', this.stateValue);
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
    return tokenNotExpired('id_token');
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
    localStorage.removeItem('user_photo');
    //this.notificationBarService.create({ message: 'Come back soon.', type: NotificationType.Success});
  }
}