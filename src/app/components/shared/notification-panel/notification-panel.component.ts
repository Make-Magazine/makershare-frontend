import { Component, OnInit } from '@angular/core';
import { ViewService } from '../../../d7services/view/view.service';
import { UserService } from '../../../d7services/user/user.service';
import { StatisticsService } from '../../../d7services/statistics/statistics.service';

@Component({
  selector: 'app-notification-panel',
  templateUrl: './notification-panel.component.html'
})
export class NotificationPanelComponent implements OnInit {
  notifications = [];
  userId;
  countNotifications;
  newCount: number = 0;
  constructor(
    private viewService: ViewService,
    private userService: UserService,
    private statisticsService: StatisticsService,
  ) { }

  ngOnInit() {
    this.userService.isLogedIn().subscribe(data => {
      if (data) {
        this.userId = localStorage.getItem('user_id');
        console.log(this.userId);
        this.getNotifications();
        this.getNewCont();
        this.getNotificationsCount();
        let self = this;
        var timer = setInterval(function(){
          self.reload();
        }, 120000);
      }
    }, err => {
      console.log('user not logged in');
    });
  }
  getNotifications() {
    this.viewService.getView('views/api_notifications', [['display_id', 'services_1'],['uid', this.userId]]).subscribe(data => {
      this.notifications = data;

    }, err => {
      console.log(err);
    });
// <<<<<<< HEAD
//  }
//  getNotificationsCount(){
//     this.viewService.getView('maker_notification_api/'+this.userId).subscribe(data => {
//     this.countNotifications = data[0];
// =======
  }
  getNotificationsCount() {
    this.viewService.getView('maker_notification_api/' + this.userId).subscribe(data => {
      this.countNotifications = data[0];
      $("header.main-header .login-block li .notification-icon::after").css("content", '10');

    }, err => {
      console.log(err)
    });
  }

  getNewCont() {
    this.statisticsService.notificationGetNewCount(this.userId).subscribe(count => {
      // console.log(count);
      this.newCount = count;
    });
  }

  lastSeen() {
    this.userService.getStatus().subscribe(data => {
      if(data.user.uid != 0 && this.notifications.length > 0 ){
        this.statisticsService.notificationSetLastSeen(data.user.uid, this.notifications[0].mid).subscribe();
      }
    });
  }

  reload() {
    this.getNotifications();
    this.getNewCont();
    this.getNotificationsCount();
  }
}
