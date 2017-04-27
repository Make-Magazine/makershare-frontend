import { Component, OnInit } from '@angular/core';
import { ViewService } from '../../../d7services/view/view.service';
import { UserService } from '../../../d7services/user/user.service';


@Component({
  selector: 'app-notification-panel',
  templateUrl: './notification-panel.component.html'
})
export class NotificationPanelComponent implements OnInit {
Notifications;
userId;
profile;
  constructor(
    private viewService: ViewService,
    private userService: UserService,
  ) { 
    
  }

  ngOnInit() {
    this.userService.isLogedIn().subscribe(data => {
      if (data ){
         this.userService.getUser(this.userId).subscribe(res => {
         this.profile = res;
        // console.log(this.profile.full_name);
        
      }, err => {
        console.log(err);
      });

      }
        // this.router.events.subscribe((event) => {
        // });
      });
     this.userId = localStorage.getItem('user_id');
     this.viewService.getView('web_notifications', [['uid', this.userId]]).subscribe(data => {
      //console.log(data);
    }, err => {
      console.log(err);
    });
  }
 
}
