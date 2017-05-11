import { Component, OnInit } from '@angular/core';
import { ViewService,PmService,UserService } from '../../../../d7services';
import { NotificationBarService, NotificationType } from 'angular2-notification-bar/release';

@Component({
  selector: 'app-community-manager-settings',
  templateUrl: './community-manager-settings.component.html'
})
export class CommunityManagerSettingsComponent implements OnInit {
notifications;
email_notifications:Array<string> = [];
web_notifications:Array<string> = [];
uid;


  constructor(
    private viewservice: ViewService,
    private notificationBarService: NotificationBarService,
    private pm: PmService,
    private userService:UserService

  ) { }

  ngOnInit() {
    this.getNotificationSettings();
  }
  getNotificationSettings() {
       this.userService.isLogedIn().subscribe(data => {
      if (data ){
          this.uid = localStorage.getItem('user_id');
          this.pm.postAction('maker_notification_settings_api/get_settings/',13).subscribe(out => {
          this.notifications = out;
          this.email_notifications = this.notifications.email_notifications;
          this.web_notifications = this.notifications.web_notifications;                
    })
        }

      });
   
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
  }
   updateNotificationSettings(e) {
    e.preventDefault();
    let data=[{
        uid:this.uid,
        field_email_notifications:this.notifications.email_notifications,
        field_web_notifications:this.notifications.web_notifications
      }];
      this.pm.postAction('maker_notification_settings_api/update_settings/',data).subscribe(data => {
        this.notificationBarService.create({ message: 'Settings updated successfully', type: NotificationType.Success, allowClose: true, autoHide: false, hideOnHover: false });
    })
  }
}
