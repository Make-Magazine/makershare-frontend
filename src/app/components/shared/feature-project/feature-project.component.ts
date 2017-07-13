import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FlagService, UserService } from '../../../d7services';
// import { NotificationBarService, NotificationType } from 'angular2-notification-bar/release';

@Component({
  selector: 'app-feature-project',
  templateUrl: './feature-project.component.html',
})

export class FeatureProjectComponent implements OnInit {

  @Input() featuredProjectId;
  isFeatured: boolean = false;
  userId;
  checkUserLogin = false;

  ButtonFeature: string = 'Feature this project';
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
        this.ButtonFeature = 'Feature this project';
      } else {
        this.flagService.isFlagged(this.featuredProjectId, this.userId, 'feature_project').subscribe(data => {
          this.isFeatured = data[0];
          /* initialize Button Feature*/
          if (this.isFeatured == false) {/* start if  */
            this.ButtonFeature = 'Feature this project';
          } else {
            this.ButtonFeature = 'UnFeature this project';
          }/* end else if  */
        }, err => {
          //this.notificationBarService.create({ message: 'Sorry, somthing went wrong, try again later.', type: NotificationType.Error});
        })
      }//end else if
    });//end if check user login


  }

  /* function Feature */
  featureProject(e: Event) {
    this.userService.isLogedIn().subscribe(data => {
      this.checkUserLogin = data;
      if (data == false) {
        this.router.navigate(['/access-denied']);
      }
      e.preventDefault();
      if (this.isFeatured) {
        this.flagService.unflag(this.featuredProjectId, this.userId, 'feature_project').subscribe(response => {
          this.isFeatured = false;
          this.ButtonFeature = 'Feature this project';
        }, err => {
          //this.notificationBarService.create({ message: 'Sorry, somthing went wrong, try again later.', type: NotificationType.Error});
        });
      } else {
        this.flagService.flag(this.featuredProjectId, this.userId, 'feature_project').subscribe(response => {
          this.isFeatured = true;
          this.ButtonFeature = 'UnFeature this project';

        }, err => {
          //this.notificationBarService.create({ message: 'Sorry, somthing went wrong, try again later.', type: NotificationType.Error});
        });
      }
    });//end if check user login
  }
  /* end function feature */



}
