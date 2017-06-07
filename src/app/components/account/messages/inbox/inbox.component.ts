import { Component, OnInit, Input, forwardRef, Injector, Injectable, state, ViewChild } from '@angular/core';
import { PmService, ViewService, UserService } from '../../../../d7services'
import { RouterModule, Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NotificationBarService, NotificationType } from 'angular2-notification-bar/release';
import { LoaderService } from '../../../shared/loader/loader.service';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  moduleId: module.id,
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  providers: [NgbTooltipConfig],
})
export class InboxComponent implements OnInit {

  messages = [];
  message;
  msg = [];
  dateObj;
  currentDate;
  countMsg;
  currentStatusId = 0;
  currentCount = 0;
  statusesCount = {};
  pageNumber = 0;
  hideloadmore = true;
  userId;
  hideTurnOn: boolean = false;
  status;
  blocked;


  noMessage = false;
  deleteMsgTip = "Delete this message";
  sender_msg = false;
  reciver_msg = false;
  another_user_reply = false;
  i_am_replyed = false;
  recipentCount;
  reply_author;

  notificationIds;
  msgDeleted=false;  

  //hideUser= true;
  constructor(private route: ActivatedRoute,
    private fb: FormBuilder,
    private pm: PmService,
    private router: Router,
    private http: Http,
    private user: UserService,
    private viewService: ViewService,
    private _location: Location,
    private modalService: NgbModal,
    private notificationBarService: NotificationBarService,
    private loaderService: LoaderService,
    private config: NgbTooltipConfig,

  ) {
    config.placement = 'bottom';
    config.triggers = 'hover';
  }
  ngOnInit(): void {
    this.getStatus();
    this.CountMessages();
    this.getMessages();
    this.getBlockedUsers();
    this.userId = localStorage.getItem('user_id');

  }

  hidepopup() {
    this._location.path();
  }

  //get all messages
  getMessages() {
    // this.loaderService.display(true);
    var status_arg = [];
    var page_arg = [];
    if (this.currentStatusId != 0) {
      status_arg = ['status', this.currentStatusId];
      this.currentCount = this.statusesCount[this.currentStatusId];
    } else {
      this.currentCount = this.statusesCount['0'];
    }
    if (this.pageNumber >= 0) {
      page_arg = ['page', this.pageNumber];
    }
    this.pm.getInboxOrSent('maker_get_pm_author/retrieve_all_msgs', [status_arg, page_arg]).subscribe(data => {
      this.messages = data;   
      var msg_arr = [];
      var i = 0
      for (let key in this.messages) {
        if (typeof (this.messages[key]) == 'object' && this.messages.hasOwnProperty(key)) {
          this.userId = localStorage.getItem('user_id');
          this.messages[key].recipentCount = this.messages[key].recipient.length;   
          //message dont have any reply
          if (this.messages[key].reply_author.length == 0) {
            // i am the sender
            if (this.messages[key].sender == this.userId) {
              for (let i = 0; i < this.messages[key].recipient.length; i++) {
                if (this.messages[key].recipient[i].recipient != this.userId) {
                  this.user.getUser(this.messages[key].recipient[i].recipient).subscribe(res => {
                    this.messages[key].sender_msg = true;
                    this.messages[key].user_photo = res.user_photo;
                    this.messages[key].first_name = res.first_name;
                    this.messages[key].last_name = res.last_name;
                    this.messages[key].status = res.status;
                  })
                }
              }
            } else {
              // i am the reciver            
              this.user.getUser(this.messages[key].sender).subscribe(res => {
                this.messages[key].reciver_msg = true;
                this.messages[key].user_photo = res.user_photo;
                this.messages[key].first_name = res.first_name;
                this.messages[key].last_name = res.last_name;
                this.messages[key].status = res.status;

              })
            }
            // this is reply for message
          } else if (this.messages[key].reply_author.length > 0) {
            this.reply_author = this.messages[key].reply_author;
            // i am who replyed
            if (this.reply_author[0].author == this.userId) {
              if (this.messages[key].sender == this.userId) {
                for (let i = 0; i < this.messages[key].recipient.length; i++) {
                  if (this.messages[key].recipient[i].recipient != this.userId) {
                    this.user.getUser(this.messages[key].recipient[i].recipient).subscribe(res => {
                      this.messages[key].i_am_replyed = true;
                      this.messages[key].user_photo = res.user_photo;
                      this.messages[key].first_name = res.first_name;
                      this.messages[key].last_name = res.last_name;
                      this.messages[key].status = res.status;
                    })
                  }
                }
              } else {
                this.user.getUser(this.messages[key].sender).subscribe(res => {
                  this.messages[key].i_am_replyed = true;
                  this.messages[key].user_photo = res.user_photo;
                  this.messages[key].first_name = res.first_name;
                  this.messages[key].last_name = res.last_name;
                  this.messages[key].status = res.status;
                })
              }
              // another person replyed
            } else {
              this.user.getUser(this.reply_author[0].author).subscribe(res => {
                this.messages[key].another_user_reply = true;
                this.messages[key].user_photo = res.user_photo;
                this.messages[key].first_name = res.first_name;
                this.messages[key].last_name = res.last_name;
                this.messages[key].status = res.status;
              })
            }
          }
          msg_arr.push(this.messages[key]);
          this.dateObj = new Date(msg_arr[i].last_updated * 1000);
          this.currentDate = new Date();
          msg_arr[i].last_updated = Math.floor(Math.abs(this.dateObj - this.currentDate) / (60 * 1000));
          if (msg_arr[i].last_updated < 1) {
            msg_arr[i].last_updated = 'Now';
          } else if (msg_arr[i].last_updated === 1) {
            msg_arr[i].last_updated = 'minute ago';
          } else if (msg_arr[i].last_updated > 1 && msg_arr[i].last_updated < 60) {
            msg_arr[i].last_updated = msg_arr[i].last_updated + ' ' + 'minutes ago';
          } else if (msg_arr[i].last_updated >= 60 && msg_arr[i].last_updated < 120) {
            msg_arr[i].last_updated = Math.floor(msg_arr[i].last_updated / 60) + ' ' + 'hour ago';
          } else if (msg_arr[i].last_updated >= 120 && msg_arr[i].last_updated < 1440) {
            msg_arr[i].last_updated = Math.floor(msg_arr[i].last_updated / 60) + ' ' + 'hours ago';
          } else if (msg_arr[i].last_updated >= 1440 && msg_arr[i].last_updated < 2880) {
            msg_arr[i].last_updated = Math.floor(msg_arr[i].last_updated / (24 * 60)) + ' ' + 'day ago';
          } else if (msg_arr[i].last_updated > 2880 && msg_arr[i].last_updated < 10080) {
            msg_arr[i].last_updated = Math.floor(msg_arr[i].last_updated / (24 * 60)) + ' ' + 'days ago';
          } else if (msg_arr[i].last_updated > 10080) {
            // msg_arr[i].last_updated = this.dateObj.toLocaleDateString();
            msg_arr[i].last_updated = msg_arr[i].date_format;
          }
          // if (Object.keys(msg_arr[i].participants).length > 2) {
          //   msg_arr[i].count = Object.keys(msg_arr[i].participants).length;
          // }
          i++
        }
      }

      this.msg = this.msg.concat(msg_arr);
      //two participent or more
      for (let i = 0; i < this.msg.length; i++) {
        // this.recipentCount = (this.msg[i].recipient.length) -1;
      }
      //  this.loaderService.display(false);
      //show if user have 0 msg 
      if (this.msg.length == 0) {
        this.noMessage = true;
      }

      this.loadMoreVisibilty();
    })
  }

  CountMessages() {
    this.userId = localStorage.getItem('user_id');
    this.viewService.getView('maker_get_pm_author/' + [[this.userId]]).subscribe(data => {
      this.countMsg = data;
    })
  }

  loadMore() {
    this.pageNumber++;
    this.getMessages();
  }
  loadMoreVisibilty() {
    var arr_count = this.msg.length;
    if (this.countMsg[0] > arr_count) {
      this.hideloadmore = true;
    } else {
      this.hideloadmore = false;
    }
  }
  deleteMessage(i) {
    this.pm.deleteMessage(this.msg[i].thread_id).subscribe(data=>{
    this.notificationIds = data;
    // this.msgDeleted=true;
    // console.log(this.notificationIds)
    
    //console.log(this.notificationIds[0]);
    delete this.msg[i]})
  }

  // valueChanged(mid, event) {
  //   // add to deletedArr
  //   if (event.target.checked === true) {
  //     this.deletedArr.push(mid);
  //   } else {
  //     // remove from deletedArr
  //     var index = this.deletedArr.indexOf(mid, 0);
  //     if (index > -1) {
  //       this.deletedArr.splice(index, 1);
  //     }
  //   }
  // }

  // checkAll(ev) {
  //   this.msg.forEach(x => x.state = ev.target.checked)
  //   for (var _i = 0; _i < this.msg.length; _i++) {
  //     if (ev.target.checked === true) {
  //       this.deletedArr.push(this.msg[_i].thread_id);
  //     } else {
  //       var index = this.deletedArr.indexOf(this.msg[_i].thread_id, 0);
  //       if (index > -1) {
  //         this.deletedArr.splice(index, 1);
  //       }
  //     }
  //   }
  // }

  //   isAllChecked(mid) {
  //     return this.msg.every(_ => _.state);
  //   }
  //   /**
  //  * delete selected messages
  //  */
  //   deleteMessages() {
  //     this.loaderService.display(true);
  //     for (var _i = 0; _i < this.msg.length; _i++) {
  //       this.pm.deleteMessage(this.deletedArr[_i]).subscribe();
  //     }
  //     this.msg = [];
  //     this.getMessages();
  //   }

  viewMessage(thread_id) {
    this.router.navigate(['/account/inbox/view', thread_id]);
  }

  /*
  * disable messages
   */
  // turnOffMessages() {
  //   this.loaderService.display(true);
  //   this.userId = localStorage.getItem('user_id');
  //   this.pm.updateSettings(this.userId, { 'pm_disabled': true }).subscribe(data => {
  //     this.hideTurnOn = true;
  //     this.notificationBarService.create({ message: 'You have turned off messaging; only community managers can message you. You can always turn it back on here.', type: NotificationType.Success });
  //     this.loaderService.display(false);
  //   })
  // }
  /**
   * enable messages
   */
  // turnOnMessages() {
  //   this.loaderService.display(true);
  //   this.userId = localStorage.getItem('user_id');
  //   this.pm.updateSettings(this.userId, { 'pm_disabled': false }).subscribe(data => {
  //     this.hideTurnOn = false;
  //     this.notificationBarService.create({ message: 'You have enabled Privatemsg', type: NotificationType.Success });
  //     this.loaderService.display(false);
  //   })
  // }
  /*
  *if message turned off the data[0]=disabled
  */
  getStatus() {
    this.userId = localStorage.getItem('user_id');
    this.pm.getStatus(this.userId).subscribe(data => {

      this.status = data;
      if (this.status == false) {
        this.hideTurnOn = false;
      } else if (this.status.setting === "disabled") {
        this.hideTurnOn = true;
      }
    })

  }

  reset() {

  }

  getBlockedUsers() {
    this.pm.getAllBlocked().subscribe(data => {
      this.blocked = data;
    })
  }

  unBlockUsers(uid, i) {
    this.pm.unBlockUser(uid).subscribe();
    var index = this.blocked.indexOf(uid, 0);
    this.blocked.splice(index, 1);
  }

  userProfile(fName, lName) {
    var name = fName + '-' + lName;
    this.router.navigate(['/portfolio/', name]);
  }


}