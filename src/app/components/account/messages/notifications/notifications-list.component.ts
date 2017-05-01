import { Component, OnInit } from '@angular/core';
import { ViewService } from '../../../../d7services/view/view.service';
import { UserService } from '../../../../d7services/user/user.service';
import { Notification } from '../../../../models';

@Component({
  selector: 'notifications-list',
  templateUrl: './notifications-list.component.html',
})
export class NotificationsListComponent implements OnInit {

  Notifications:Notification[];
  NotificationsCount:number;

  constructor(
    private viewService: ViewService,
  ) { }

  ngOnInit() {
    this.GetNotificationsList();
    this.GetNotificationsCount();
  }

  GetNotificationsList(){
    this.viewService.getView('web_notifications', [['uid', localStorage.getItem("user_id")]]).subscribe((notifications:Notification[]) => {
      console.log(notifications)
      this.Notifications = notifications;
    });
  }

  GetNotificationsCount(){
    this.viewService.getView('notifications_count_api', [['uid', localStorage.getItem("user_id")]]).subscribe(data => {
      this.NotificationsCount = data[0].count;
    });
  }
}
