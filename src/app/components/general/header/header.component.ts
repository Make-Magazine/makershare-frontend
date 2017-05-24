import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../../../d7services';
import { Router, ActivatedRoute } from "@angular/router";
import { Auth } from '../../../auth0/auth.service';
import { SearchBoxComponent } from './search-box/search-box.component';
import { ProfilePictureService } from '../../shared/profile-picture/profile-picture.service';
import { domain } from '../../../d7services/globals';
import { NotificationBarService, NotificationType } from 'angular2-notification-bar/release';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  Back_End_Domain;
  roles = [];
  Manager:boolean = false;
  showSearchBox: boolean = false;
  user_photo: string;
  registrationFormStatusObs: Observable<any>;
  registrationFormStatus = false;
  registrationFormState: string;
  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    public auth: Auth,
    private profilePictureService: ProfilePictureService,
    private notificationBarService: NotificationBarService,
  ) { }


  ngOnInit() {
    this.Back_End_Domain = domain;
    if(localStorage.getItem('roles')){
      this.roles = localStorage.getItem('roles').split(',');
      if(this.roles.indexOf('3') != -1 || this.roles.indexOf('4') != -1 || this.roles.indexOf('6') != -1 || this.roles.indexOf('7') != -1 ||
        this.roles.indexOf('8') != -1 || this.roles.indexOf('9') != -1 || this.roles.indexOf('10') != -1){
        this.Manager = true;
      }
    }
    this.profilePictureService.url.subscribe((val: string) => {
      this.user_photo = val;
    })

    // handle the registration form to collect the firstname, lastname and age for the new created user
    this.registrationFormStatusObs = this.route.queryParams.map(params => params || null);
    this.registrationFormStatusObs.subscribe(params => {
      var arr = Object.keys(params).map(function (key) { return params[key]; });
      if(arr[0] == "registration" && arr[1] == "makermedia.auth0.com"){
        if(arr[2]){
          this.registrationFormStatus = true;
          this.registrationFormState = arr[2];
        }
        
        
      }

      if(arr[0] == "subscription"){
        this.notificationBarService.create({ message: 'Thank you for subscribing!', type: NotificationType.Success, allowClose: true, autoHide: false, hideOnHover: false });
      }
      
    });    


  }

  openSearchBox() {
    this.showSearchBox = true;
  }

  onNotify(event) {
    this.showSearchBox = false;
  }

}
