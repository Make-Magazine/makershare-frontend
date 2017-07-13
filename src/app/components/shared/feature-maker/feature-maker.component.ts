import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FlagService, UserService } from '../../../d7services';
// import { NotificationBarService, NotificationType } from 'angular2-notification-bar/release';
@Component({
  selector: 'app-feature-maker',
  templateUrl: './feature-maker.component.html',
})
export class FeatureMakerComponent implements OnInit {
  @Input() featuredMakerId : number;
  isFeatured: boolean = false;
  userId;
  checkUserLogin = false;

  ButtonFeature: string = 'Feature this Maker';
  constructor(
    private router: Router,
    private userService: UserService,
    private flagService: FlagService,
    // private notificationBarService: NotificationBarService,
  ) { }

  ngOnInit() {
       this.userId = localStorage.getItem('user_id');
    this.userService.isLogedIn().subscribe(data => {
      this.checkUserLogin = data;
      if (data == false) {
        this.ButtonFeature = 'Feature this maker';
      } else {
        this.flagService.isFlagged(this.featuredMakerId, this.userId, 'feature_maker').subscribe(data => {
          this.isFeatured = data[0];
          /* initialize Button Feature*/
          if (this.isFeatured == false) {/* start if  */
            this.ButtonFeature = 'Feature this maker';
          } else {
            this.ButtonFeature = 'UnFeature this maker';
          }/* end else if  */
        }, err => {
          //this.notificationBarService.create({ message: 'Sorry, somthing went wrong, try again later.', type: NotificationType.Error});
        })
      }//end else if
    });//end if check user login
  }

   /* function Feature */
  featureMaker(e: Event) {
    this.userService.isLogedIn().subscribe(data => {
      this.checkUserLogin = data;
      if (data == false) {
        this.router.navigate(['/access-denied']);
      }
      e.preventDefault();
      if (this.isFeatured) {
        this.flagService.unflag(this.featuredMakerId, this.userId, 'feature_maker').subscribe(response => {
          this.isFeatured = false;
          this.ButtonFeature = 'Feature this maker';
        }, err => {
          //this.notificationBarService.create({ message: 'Sorry, somthing went wrong, try again later.', type: NotificationType.Error});
        });
      } else {
        this.flagService.flag(this.featuredMakerId, this.userId, 'feature_maker').subscribe(response => {
          this.isFeatured = true;
          this.ButtonFeature = 'UnFeature this maker';

        }, err => {
          //this.notificationBarService.create({ message: 'Sorry, somthing went wrong, try again later.', type: NotificationType.Error});
        });
      }
    });//end if check user login
  }
  /* end function feature */

}
