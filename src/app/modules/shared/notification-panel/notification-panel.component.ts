import { Component, OnInit } from '@angular/core';
import {
  StatisticsService,
  UserService,
  ViewService,
} from '../../../core/d7services';

@Component({
  selector: 'app-notification-panel',
  templateUrl: './notification-panel.component.html',
})
export class NotificationPanelComponent implements OnInit {
  notifications = [];
  userId;
  countNotifications: number = 0;
  newCount: number = 0;

  constructor(
    private viewService: ViewService,
    private userService: UserService,
    private statisticsService: StatisticsService,
  ) {}

  ngOnInit() {
    this.userService.isLogedIn().subscribe(
      data => {
        if (data) {
          this.userId = localStorage.getItem('user_id');
          this.getNotifications();
          this.getNewCont();
          this.getNotificationsCount();
          setInterval(() => {
            this.reload();
          }, 120000);
        }
      },
      err => {},
    );
  }

  getNotifications() {
    this.viewService
      .getView('views/api_notifications', [
        ['display_id', 'services_1'],
        ['uid', this.userId],
      ])
      .subscribe(
        data => {
          this.notifications = data;

          /*this.notifications.push({
            title: 'title of not',
            date: '01/01/0203',
            type: 'new_comment_project',
            status: 'Active',
            first_name: 'Jared',
            last_name: 'Smith'
          });*/
        },
        err => {
        },
      );
  }

  getNotificationsCount() {
    this.viewService.getView('maker_notification_api/' + this.userId).subscribe(
      data => {
        this.countNotifications = data[0] || 0;
      },
      err => {
      },
    );
  }

  getNewCont() {
    this.statisticsService
      .notificationGetNewCount(this.userId)
      .subscribe(count => {
        this.newCount = count || 0;
      });
  }

  lastSeen() {
    this.notifications = [];
    this.userService.getStatus().subscribe(data => {
      if (data.user.uid != 0 && this.notifications.length > 0) {
        this.statisticsService
          .notificationSetLastSeen(data.user.uid, this.notifications[0].mid)
          .subscribe();
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
