import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViewService,MainService,PmService } from '../../../../d7services';
import * as globals from '../../../../d7services/globals';
import { NotificationBarService, NotificationType } from 'ngx-notification-bar/release';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-default-settings',
  templateUrl: './default-settings.component.html',
})
export class defaultSettingsComponent implements OnInit {
  notifications;
  email_notifications: Array<string> = [];
  web_notifications: Array<string> = [];
  emailSetting;
  selected;
  userId;
  checked = [];
  closeResult: string;
  constructor(
    private viewservice: ViewService,
    private mainService: MainService,
    private router: Router,
    private notificationBarService: NotificationBarService,
    private modalService: NgbModal,
    private pm: PmService,

  ) { }

  ngOnInit() {
    this.getNotificationSettings();
  }

 open(content) {
    this.modalService.open(content);
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
    this.userId = localStorage.getItem('user_id');
    this.mainService.put(globals.endpoint + '/maker_notification_settings_api/' + this.userId, { 'field_email_notifications': this.email_notifications, 'field_web_notifications': this.web_notifications }).subscribe()
    this.notificationBarService.create({ message: 'Settings updated successfully', type: NotificationType.Success, allowClose: true, autoHide: false, hideOnHover: false });
  }

  deleteMyAcount(){
    this.userId = localStorage.getItem('user_id');
   this.pm.deleteAcount(this.userId).subscribe(data=>{
     this.mainService.removeCookies();
     localStorage.removeItem('id_token');
     localStorage.removeItem('user_id');
     localStorage.removeItem('user_name');
     localStorage.removeItem('user_photo');
     this.router.navigate(['/']);
   })
  }
}
