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
countNotifications;
profile;
  constructor(
    private viewService: ViewService,
    private userService: UserService,
  ) { 
    
  }

  ngOnInit() {
    this.userService.isLogedIn().subscribe(data => {
      if (data ){
        this.userId = localStorage.getItem('user_id');
        this.getNotifications();
        this.getNotificationsCount();

      }
        // this.router.events.subscribe((event) => {
        // });
      },err=>{
        console.log('user not logged in');
      });
  }
 getNotifications(){
    this.viewService.getView('web_notifications', [['uid', this.userId]]).subscribe(data => {
    this.notifications=data;
    }, err => {
      console.log(err);
    });
 }
 getNotificationsCount(){
    this.viewService.getView('maker_notification_api/'+this.userId).subscribe(data => {
    this.countNotifications = data[0];
    $("header.main-header .login-block li .notification-icon::after" ).css( "content",'10');

    }, err => {
      console.log(err)
    });
}
}
