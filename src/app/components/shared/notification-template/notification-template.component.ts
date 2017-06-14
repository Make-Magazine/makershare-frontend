import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MainService, UserService, PmService } from '../../../d7services';
import * as globals from '../../../d7services/globals';

@Component({
  selector: 'notification-tpl',
  templateUrl: './notification-template.component.html',
})


export class NotificationTemplateComponent implements OnInit {

  delete = false;
  @Input() notification;
  // @Input() notificationId;
  // @Input() msgDeleted;
  messageDetails;


  constructor(
    private router: Router,
    private mainService: MainService,
    private userService: UserService,
    private pm: PmService,
  ) { }

  ngOnInit() {
    if (this.notification) {
      this.notification.fullname = this.notification.first_name + ' ' + this.notification.last_name;
      this.notification.date = this.timeago(this.notification.date);
      //   if(this.notification.nid == this.notificationId && this.msgDeleted){
      //   delete this.notification;
      // }
    }
    this.messageNotifications();

  }

  MarkAsSeen(seen) {

    this.ChangeNotificationStatus(seen).subscribe(data => {
      this.notification.seen = seen;
    });
  }

  ChangeNotificationStatus(seen) {
    let notification = {
      mid: this.notification.mid,
      field_seen: { und: [{ value: seen }] },
      type: this.notification.type,
    }
    return this.mainService.put('/api/entity_message/' + this.notification.mid, notification);
  }

  OpenNotification(ShowcaseUserID?: number) {
    if (!this.delete) {
      this.ChangeNotificationStatus(1).subscribe(data => { }, err => console.log(err), () => {
        // open user profile
        if (ShowcaseUserID) {
          if (this.notification.type == 'project_added_to_showcase') {
            this.router.navigate(["/makers", this.notification.showcase_nid]);
          } else {
            this.userService.getUrlFromId(ShowcaseUserID).subscribe(data => {
              let url = data.url;
              this.router.navigateByUrl("/portfolio/" + url);
            });
          }
          // open entity page
        } else {
          if (this.notification.type == 'challenge_follow_deadline' || this.notification.type == 'new_entry_challenge') {
            this.router.navigate(["/missions", this.notification.nid]);
          } else if (this.notification.type == "new_message_sent") {
            this.router.navigate(["/account/inbox/view", this.notification.pm_mid]);
          } else {
            this.router.navigate(["/projects", this.notification.nid]);
          }
        }
      });
    }
  }


  GoToProfile(path: string) {
    // should redirect to profile
    this.router.navigate(['portfolio', 'abdulrahman-alhomsi']);
  }

  GoToNode(nid: number, type: string) {
    // should redirect to node page according to the type string
    // you need to create an array, keys as message type, values routing paths.
    // when you have the type, you can get the correct path, then route.
  }

  deleteNotifications() {
    this.delete = true;

    this.pm.deleteNotification(this.notification.mid).subscribe(data => {
      delete this.notification;
      this.delete = false;
    })
  }
  timeago(date) {
    var n = date.includes("min") || date.includes('sec');
    var current;
    if (n) {
      date = date.substring(0, date.indexOf("hours"));
      if (!date) {
        date = date + '0';
      }
      date = date + ' hours';

    }
    return date + ' ago';
  }
  messageNotifications() {
    if (this.notification.type == 'new_message_sent') {
      // console.log(this.notification)
      // let mid = { "data": this.notification.pm_mid };
      // this.mainService.post(globals.endpoint + '/maker_get_pm_author/retrieve_message_details',mid['data']).subscribe(res => {
      //   this.messageDetails = res['_body'].replace(']', '').replace('[', '')  
      //    console.log(this.messageDetails)
      // }, err => { 
      //   // console.log(err)
      // });
    }
  }

}
