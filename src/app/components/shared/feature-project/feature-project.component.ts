import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, RouterModule, ActivatedRoute, Params } from '@angular/router';
import { ViewService,FlagService,UserService } from '../../../d7services';
import { NotificationBarService, NotificationType } from 'angular2-notification-bar/release';

@Component({
  selector: 'app-feature-project',
  templateUrl: './feature-project.component.html',
  styleUrls: ['./feature-project.component.css']
})

export class FeatureProjectComponent implements OnInit {

@Input() featuredProjectId;
isFeatured = false;
userId;
ButtonFeature;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private viewService: ViewService,
    private userService: UserService,
    private flagService: FlagService,
    private notificationBarService: NotificationBarService,
  ) {} 
   ngOnInit() {
     this.userId = localStorage.getItem('user_id');
         if (this.featuredProjectId && this.userId) {
        this.flagService.isFlagged(this.featuredProjectId, this.userId, 'feature_project').subscribe(data => {
        this.isFeatured = data[0];
        
      });
      if (this.isFeatured == false) {/* start if  */
            this.ButtonFeature = 'Feature this project';
          } else {
            this.ButtonFeature = 'Unfeature this project';
          }/* end else if  */
       
   }
   }

   featureProject(e: Event){
      e.preventDefault();
        if (this.isFeatured){
           this.flagService.unflag(this.featuredProjectId, this.userId, 'feature_project').subscribe(response =>{
             this.isFeatured = false;
              this.ButtonFeature = 'Feature this project';
             
           });
         
        }else{
      this.flagService.isFlagged(this.featuredProjectId, this.userId, 'feature_project').subscribe(response => {
          this.isFeatured = true;
           this.ButtonFeature = 'Unfeature this project';
        });
        }
   }

}
