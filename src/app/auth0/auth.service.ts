import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { UserService } from '../d7services/user/user.service';
import { MainService } from '../d7services/main/main.service';
import { NotificationBarService, NotificationType } from 'angular2-notification-bar';
import { Router } from '@angular/router';
import * as globals from '../d7services/globals';

//import Auth0 from 'auth0-js';

// Avoid name not found warnings
let Auth0Lock = require('auth0-lock').default;

@Injectable()
export class Auth {
  // Configure Auth0
  screen = 'login';
  yearsArr= [];
  lock = new Auth0Lock('yvcmke0uOoc2HYv0L2LYWijpGi0K1LlU', 'makermedia.auth0.com', {
    socialButtonStyle: 'small',
    initialScreen: this.screen,
    languageDictionary: {
      title: ""
    },
    theme: {
      logo: globals.domain + '/sites/default/files/logo.png',
      primaryColor: '#d41c2b'
    },
    additionalSignUpFields: [
      {
        name: "firstName",
        placeholder: "First Name",
        validator: function (firstName) {
          return {
            valid: firstName.length >= 3,
            hint: "Please enter your first name"
          };
        },
      },  
      {
        name: "lastName",
        placeholder: "Last Name",
        validator: function (LastName) {
          return {
            valid: LastName.length >= 3,
            hint: "Please enter your last name"
          };
        },
      },
      {
        type: "select",
        name: "year",
        placeholder: "Year",
        options: [
          {value: "2017", label: "2017"},
          {value: "2016", label: "2016"},
          {value: "2015", label: "2015"},
          {value: "2014", label: "2014"},
          {value: "2013", label: "2013"},
          {value: "2012", label: "2012"},
          {value: "2011", label: "2011"},
          {value: "2010", label: "2010"},
          {value: "2009", label: "2009"},
          {value: "2008", label: "2008"},
          {value: "2007", label: "2007"},
          {value: "2006", label: "2006"},
          {value: "2005", label: "2005"},
        ],
      },
      {
        type: "select",
        name: "month",
        placeholder: "Month",
        options: [
          {value: "01", label: "January"},
          {value: "02", label: "February"},
          {value: "03", label: "March"},
          {value: "04", label: "April"},
          {value: "05", label: "May"},
          {value: "06", label: "June"},
          {value: "07", label: "July"},
          {value: "08", label: "August"},
          {value: "09", label: "September"},
          {value: "10", label: "October"},
          {value: "11", label: "November"},
          {value: "12", label: "December"},
        ],
      },      
      {
        type: "select",
        name: "day",
        placeholder: "Day",
        options: [
          {value: "01", label: "01"},
          {value: "02", label: "02"},
          {value: "03", label: "03"},
          {value: "04", label: "04"},
          {value: "05", label: "05"},
          {value: "06", label: "06"},
          {value: "07", label: "07"},
          {value: "08", label: "08"},
          {value: "09", label: "09"},
          {value: "10", label: "10"},
          {value: "11", label: "11"},
          {value: "12", label: "13"},
          {value: "12", label: "14"},
          {value: "15", label: "15"},
          {value: "16", label: "16"},
          {value: "17", label: "17"},
          {value: "18", label: "18"},
          {value: "19", label: "19"},
          {value: "20", label: "20"},
          {value: "21", label: "21"},
          {value: "22", label: "22"},
          {value: "23", label: "23"},
          {value: "24", label: "24"},
          {value: "25", label: "25"},
          {value: "26", label: "26"},
          {value: "27", label: "27"},
          {value: "28", label: "28"},
          {value: "29", label: "29"},
          {value: "30", label: "30"},
          {value: "31", label: "31"},
        ],
      },      
      // {
      //   name: "year",
      //   placeholder: "yyyy",
      //   validator: function (year) {
      //     return {
      //       valid: year.length == 4,
      //       hint: "Please enter year of 4 digits"
      //     };
      //   },        
      // },
      // {
      //   name: "month",
      //   placeholder: "mm",
      //   validator: function (month) {
      //     return {
      //       valid: month.length == 2,
      //       hint: "Please enter month of 2 digits"
      //     };
      //   },        
      // },      
      // {
      //   name: "day",
      //   placeholder: "dd",
      //   validator: function (day) {
      //     return {
      //       valid: day.length == 2,
      //       hint: "Please enter day of 2 digits"
      //     };
      //   },        
      // },       
    ],
  });


  constructor(
    private userService: UserService,
    private mainService: MainService,
    private notificationBarService: NotificationBarService,
    private router: Router,
  ) {
    // Add callback for lock `authenticated` event
    this.lock.on("authenticated", (authResult) => {
      
      console.log(authResult);
      // get the user profile
      this.lock.getProfile(authResult.idToken, (error, profile) => {
        if (error) {
          console.log(error);
          return;
        }
        console.log(profile);
        var data = profile;
        data.idToken = authResult.idToken;
        if (profile['email_verified'] == true) {
          this.userService.auth0_authenticate(data).subscribe(res => {
            if (res.user.uid != 0) {
              localStorage.setItem('id_token', authResult.idToken);
              localStorage.setItem('user_id', res.user.uid);
              localStorage.setItem('user_name', res.user.name);
            } else {
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