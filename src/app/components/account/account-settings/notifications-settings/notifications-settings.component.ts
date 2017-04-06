import { Component, OnInit } from '@angular/core';
import { RouterModule, Router, ActivatedRoute, Params } from '@angular/router';
import { ViewService } from '../../../../d7services/view/view.service';
import { MainService } from '../../../../d7services/main/main.service';
import * as globals from '../../../../d7services/globals';
import { NotificationBarService, NotificationType } from 'angular2-notification-bar';

@Component({
  selector: 'app-notifications-settings',
  templateUrl: './notifications-settings.component.html',
})
export class NotificationsSettingsComponent implements OnInit {
  notifications;
  email_notifications: Array<string> = [];
  web_notifications: Array<string> = [];
  emailSetting;
  selected;
  userId;
  checked = [];
  constructor(
    private viewservice: ViewService,
    private mainService: MainService,
    private router: Router,
    private notificationBarService: NotificationBarService,

  ) { }

  ngOnInit() {
    this.getNotificationSettings();
  }
  getNotificationSettings() {
    this.viewservice.getView('maker_notification_settings_api').subscribe(data => {
      this.notifications = data;
      this.email_notifications = this.notifications.email_notifications;
      this.web_notifications = this.notifications.web_notifications;
    })
  }
  checkedEmail(num, event) {
    // add to checkedArr
    if (event.target.checked === true) {
      if (this.email_notifications.length === 0) {
        this.email_notifications = [];
        this.email_notifications.push(num);
      } else {
        this.email_notifications.push(num);
      }
    } else {
      // remove from checkedArr
      var index = this.email_notifications.indexOf(num, 0);
      if (index > -1) {
        this.email_notifications.splice(index, 1);
      }
    }
    console.log(this.email_notifications);
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
      var index = this.web_notifications.indexOf(num, 0);
      if (index > -1) {
        this.web_notifications.splice(index, 1);
      }
    }
    console.log(this.web_notifications);
  }

  updateNotificationSettings(e) {
    e.preventDefault();
    this.userId = localStorage.getItem('user_id');
    this.mainService.put(globals.endpoint + '/maker_notification_settings_api/' + this.userId, { 'field_email_notifications': this.email_notifications, 'field_web_notifications': this.web_notifications }).subscribe()
    this.notificationBarService.create({ message: 'Settings updated successfully', type: NotificationType.Success });
  }
}
