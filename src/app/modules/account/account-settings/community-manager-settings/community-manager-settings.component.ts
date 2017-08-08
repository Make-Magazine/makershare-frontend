import { Component, OnInit } from '@angular/core';
import {
  NotificationBarService,
  NotificationType,
} from 'ngx-notification-bar/release';
import { PmService, UserService } from '../../../../core/d7services';

@Component({
  selector: 'app-community-manager-settings',
  templateUrl: './community-manager-settings.component.html',
})
export class CommunityManagerSettingsComponent implements OnInit {
  notifications;
  email_notifications: Array<Object> = [];
  web_notifications: Array<Object> = [];
  uid;

  constructor(
    private notificationBarService: NotificationBarService,
    private pm: PmService,
    private userService: UserService,
  ) {}

  ngOnInit() {
    this.getNotificationSettings();
  }
  getNotificationSettings() {
    this.userService.isLogedIn().subscribe(data => {
      if (data) {
        this.uid = localStorage.getItem('user_id');
        this.pm
          .postAction('maker_notification_settings_api/get_settings/', this.uid)
          .subscribe(out => {
            this.notifications = out;
            this.email_notifications = this.notifications.email_notifications;
            this.web_notifications = this.notifications.web_notifications;
          });
      }
    });
  }
  checkedEmail(num, event) {
    // add to checkedArr
    if (event.target.checked === true) {
      if (this.email_notifications.length === 0) {
        this.email_notifications = [];
        this.email_notifications.push(num);
        // console.log(this.email_notifications);
      } else {
        this.email_notifications.push(num);
      }
    } else {
      // remove from checkedArr
      const index = this.email_notifications.indexOf(num, 0);
      if (index > -1) {
        this.email_notifications.splice(index, 1);
      }
    }
  }

  checkedWeb(num, event) {
    // add to checkedArr
    if (event.target.checked === true) {
      if (this.web_notifications.length === 0) {
        this.web_notifications = [];
        this.web_notifications.push(num);
      } else {
        this.web_notifications.push(num);
      }
    } else {
      // remove from checkedArr
      const index = this.web_notifications.indexOf(num, 0);
      if (index > -1) {
        this.web_notifications.splice(index, 1);
      }
    }
  }

  updateNotificationSettings(e) {
    e.preventDefault();
    const data = {
      uid: this.uid,
      field_email_notifications: this.email_notifications,
      field_web_notifications: this.web_notifications,
    };
    this.pm
      .postAction('maker_notification_settings_api/update_settings/', data)
      .subscribe(d => {
        this.notificationBarService.create({
          message: 'Settings updated successfully',
          type: NotificationType.Success,
          allowClose: true,
          autoHide: false,
          hideOnHover: false,
        });
      });
  }

  deleteNotificationSettings(e) {
    e.preventDefault();
    this.pm
      .postAction('maker_notification_settings_api/delete_settings/', this.uid)
      .subscribe(data => {
        if (!data.field_email_notifications) {
          this.email_notifications = [];
        }
        if (!data.field_web_notifications) {
          this.web_notifications = [];
        }
        this.notificationBarService.create({
          message: ' All settings deleted successfully',
          type: NotificationType.Success,
          allowClose: true,
          autoHide: false,
          hideOnHover: false,
        });
      });
  }
}
