import { Component, OnInit } from '@angular/core';
import { ViewService,UserService,StatisticsService } from '../../../d7services';

@Component({
  selector: 'app-notification-panel',
  templateUrl: './notification-panel.component.html'
})
export class NotificationPanelComponent implements OnInit {
  notifications = [];
  userId;
  countNotifications;
  newCount: number = 0;
  noNotification = false;
  constructor(
    private viewService: ViewService,
    private userService: UserService,
    private statisticsService: StatisticsService,
  ) { }

  ngOnInit() {
    this.userService.isLogedIn().subscribe(data => {
      if (data) {
        this.userId = localStorage.getItem('user_id');
        this.getNotifications();
        this.getNewCont();
        this.getNotificationsCount();
        let self = this;
        var timer = setInterval(function(){
          self.reload();
        }, 120000);
      }
    }, err => {
     // console.log('user not logged in');
    });
  }
  getNotifications() {
    this.viewService.getView('views/api_notifications', [['display_id', 'services_1'],['uid', this.userId]]).subscribe(data => {
      this.notifications = data;
      
      if(this.notifications.length ==0){
        this.noNotification = true;
      }else{
        this.noNotification=false;
      }

    }, err => {
    //  console.log(err);
    });

  }
  getNotificationsCount() {
    this.viewService.getView('maker_notification_api/' + this.userId).subscribe(data => {
      if(data[0] == 0 || data[0] == false){
        this.countNotifications = 0;
      }else{
        this.countNotifications = data[0];
      }

    }, err => {
      console.log(err)
    });
  }

  getNewCont() {
    this.statisticsService.notificationGetNewCount(this.userId).subscribe(count => {
      // console.log(count[0]);
     if(count[0] == 0 || count[0] == false){
        this.newCount  = 0;
      }else{
      this.newCount = count;
      }
    });
  }

  lastSeen() {
    this.userService.getStatus().subscribe(data => {
      if(data.user.uid != 0 && this.notifications.length > 0 ){
        this.statisticsService.notificationSetLastSeen(data.user.uid, this.notifications[0].mid).subscribe();
      }
    });
    this.getNotifications();
    
  }

  reload() {
    this.getNotifications();
    this.getNewCont();
    this.getNotificationsCount();
  }
   
}
