import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MainService, UserService, PmService, NodeService } from '../../../CORE/d7services';
import * as globals from '../../../CORE/d7services/globals';

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
  userId;
  reply_text;
  reply_author;
  groupMsg;
  privateMsg;
  firstMessage = false;

  constructor(
    private router: Router,
    private mainService: MainService,
    private userService: UserService,
    private pm: PmService,
    private nodeService: NodeService
  ) { }

  ngOnInit() {
    if (this.notification) {
      this.notification.fullname = this.notification.first_name + ' ' + this.notification.last_name;
      this.notification.date = this.timeago(this.notification.date);
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
            this.router.navigate(["/account/inbox/view", this.messageDetails.thread_id]);
          } else {
            this.nodeService.getUrlFromId(this.notification.nid, 'project').subscribe(data => {
              this.router.navigate(['/projects/' + data]);

            })
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
    this.userId = localStorage.getItem('user_id');
    if (this.notification.type == 'new_message_sent') {
      let body = { "mid": this.notification.pm_mid };
      this.mainService.post(globals.endpoint + '/maker_get_pm_author/retrieve_message_details', body).map(res => res.json()).subscribe(res => {

        this.messageDetails = res;
        // console.log(res)
        //this notification equal thread notification (i mean it should be user sent you a new message)
        if (this.notification.pm_mid == this.messageDetails.thread_id) {
          // this is a group message between more than 2 users
          if (this.messageDetails.group) {
            this.groupMsg = this.messageDetails.group;
          }
          // this is aprivate message between to users
          if (this.messageDetails.private) {
            this.privateMsg = this.messageDetails.private;
          }
        } else {
          // this message has reply
          if (this.messageDetails.reply) {
            this.reply_text = this.messageDetails.reply;
            this.reply_author = this.messageDetails.reply_author[0].author;
          }
        }
      });
    }
  }

}
