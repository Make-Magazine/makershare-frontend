import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserService, MainService } from '../../../core/d7services';
import { ActivatedRoute } from '@angular/router';
import { Auth } from '../../../modules/auth0/auth.service';
import { ProfilePictureService } from '../../shared/profile-picture/profile-picture.service';
import { Singleton } from '../../../core';
import { Store } from '@ngrx/store';
import { CurrentUserShape } from '../../../core/store/current-user-reducer';
import {
  NotificationBarService,
  NotificationType,
} from 'ngx-notification-bar/release';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  Back_End_Domain;
  roles = [];
  isManager: boolean = false;
  showSearchBox: boolean = false;
  user_photo: string;
  registrationFormStatusObs: Observable<any>;
  registrationFormStatus = false;
  registrationFormState: string;
  user_id;
  user_url;
  uid;
  org_data;

  orgId$: Observable<number>;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    public auth: Auth,
    private profilePictureService: ProfilePictureService,
    private notificationBarService: NotificationBarService,
    private mainService: MainService,
    private _currentUserStore: Store<CurrentUserShape>,
  ) {
    this.orgId$ = this._currentUserStore.select('orgId');
  }

  ngOnInit() {
    this.getOrgProfile();
    // temp fix for manager
    // setInterval(() => {
      this.isManager = this.auth.IsCommuintyManager();
    // }, 100);

    //

    this.Back_End_Domain = Singleton.Settings.getBackEndUrl();
    // if(localStorage.getItem('roles')){
    //   this.roles = localStorage.getItem('roles').split(',');
    //   if(this.roles.indexOf('3') != -1 || this.roles.indexOf('4') != -1 || this.roles.indexOf('6') != -1 || this.roles.indexOf('7') != -1 ||
    //     this.roles.indexOf('8') != -1 || this.roles.indexOf('9') != -1 || this.roles.indexOf('10') != -1){
    //     this.Manager = true;
    //   }
    // }
    if (localStorage.getItem('user_id')) {
      this.user_id = localStorage.getItem('user_id');
      alert(this.user_id);
      this.userService.getUrlFromId(this.user_id).subscribe(data => {
        this.user_url = data.url;
        alert(data.url);
      });
    }
    this.profilePictureService.url.subscribe((val: string) => {
      this.user_photo = val;
    });

    // handle the registration form to collect the firstname, lastname and age for the new created user
    this.registrationFormStatusObs = this.route.queryParams.map(
      params => params || null,
    );
    this.registrationFormStatusObs.subscribe(params => {
      const arr = Object.keys(params).map(function(key) {
        return params[key];
      });
      if (arr[0] == 'registration' && arr[1] == 'makermedia.auth0.com') {
        if (arr[2]) {
          this.registrationFormStatus = true;
          this.registrationFormState = arr[2];
        }
      }

      if (arr[0] == 'subscription') {
        this.notificationBarService.create({
          message: 'Thank you for subscribing!',
          type: NotificationType.Success,
          allowClose: true,
          autoHide: false,
          hideOnHover: false,
        });
      }
    });
  }

  openSearchBox() {
    this.showSearchBox = true;
  }

  onNotify(event) {
    this.showSearchBox = false;
  }

  getOrgProfile() {
    this.mainService
      .custompost('company_profile_api/my_org_profile', {
        uid: +localStorage.getItem('user_id'),
      })
      .subscribe(res => {
        this.org_data = res[0];
        if (this.org_data.path) {
          this.org_data.path = this.org_data.path.replace('orgs', 'groups');
        }

      });
  }
}
