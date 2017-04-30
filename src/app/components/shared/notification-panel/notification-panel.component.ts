import { Component, OnInit } from '@angular/core';
import { ViewService } from '../../../d7services/view/view.service';
import { UserService } from '../../../d7services/user/user.service';
@Component({
  selector: 'app-notification-panel',
  templateUrl: './notification-panel.component.html'
})
export class NotificationPanelComponent implements OnInit {
notifications;
userId;
profile;
  constructor(
    private viewService: ViewService,
    private userService: UserService,
  ) { 
    
  }

  ngOnInit() {
    this.userService.isLogedIn().subscribe(data => {
  console.log('ghada');
console.log(data);
      if (data ){
           this.userId = localStorage.getItem('user_id');
           this.viewService.getView('web_notifications', [['uid', this.userId]]).subscribe(data => {
           this.notifications=data;
           console.log(this.notifications);
    }, err => {
      console.log(err);
    });

      }
        // this.router.events.subscribe((event) => {
        // });
      });
  
  }
 
}
