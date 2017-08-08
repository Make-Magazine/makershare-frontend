import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
// import { PmService, UserService } from 'app/CORE/d7services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// import { LoaderService } from 'app/modules/shared/loader/loader.service';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';
import { PmService } from '../../../../core/d7services/pm/pm.service';
import { UserService } from '../../../../core/d7services/user/user.service';
import { Reply } from '../../../account/messages/view/reply';
import { LoaderService } from '../../../shared/loader/loader.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  providers: [NgbTooltipConfig],
})
export class ViewComponent implements OnInit {
  msg;
  uid;
  status;
  hideTurnOn;
  user = [];
  messages = [];
  message;
  currentuser;
  userId: number;
  deleted;
  blockedUser;
  unBlockedUser;
  dateObj;
  currentDate;
  messageForm: FormGroup;
  block;
  date;
  commentDate;
  reply: Reply = {
    thread_id: 0,
    body: '',
  };
  id;
  hover;
  deleteReplyTip = 'Delete this reply';
  participants = [];
  hideDeleteReply;
  formErrors = {
    body: '',
  };

  validationMessages = {
    body: {
      required: 'Message Body is required.',
    },
  };

  constructor(
    private route: ActivatedRoute,
    private pm: PmService,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
    private _location: Location,
    private loaderService: LoaderService,
    private config: NgbTooltipConfig,
  ) {
    this.config.placement = 'bottom';
    this.config.triggers = 'hover';
  }

  ngOnInit() {
    // this.getBlockedUser();
    this.getStatus();
    this.buildForm();
    this.getThreads();
    this.getCurrentUser();
    this.loaderService.display(true);
    this.userId = parseInt(localStorage.getItem('user_id'), 10);
  }
  getThreads() {
    this.route.params
      .switchMap(thread_id => this.pm.getMessage(thread_id['thread_id']))
      .subscribe(data => {
        let check = false;
        /*check if this user participent of this message or not*/
        for (let iP = 0; iP < data.participants.length; iP++) {
          if (data.participants[iP] == this.userId) {
            check = true;
          }
        }
        if (check) {
          this.msg = data;
          if (window.location.href) {
            this.participants = [];
            /*hide delete replay if only one replay*/
            if (this.msg.messages.length > 1) {
              this.hideDeleteReply = true;
            }
            /*end of hide delete replay if only one replay*/
            for (let i = 0; i < this.msg.participants.length; i++) {
              if (this.msg.participants[i] != this.userId) {
                this.userService
                  .getUser(this.msg.participants[i])
                  .subscribe(res => {
                    this.participants = this.participants.concat(res);
                  });
              }
              if (this.msg.participants[i] != this.userId) {
                this.pm.getBlocked(this.msg.participants[i]).subscribe(d => {
                  this.block = !!d.author;
                });
              }
            }
            this.messages = this.msg.messages;
            for (const message of this.messages) {
              let i = 0;
              this.userService.getUser(message.author).subscribe(res => {
                Object.assign(message, res);
                this.dateObj = new Date(message.timestamp * 1000);
                this.currentDate = new Date();
                message.timestamp = Math.floor(
                  Math.abs(this.dateObj - this.currentDate) / (60 * 1000),
                );
                if (message.timestamp < 1) {
                  message.timestamp = 'Now';
                } else if (message.timestamp === 1) {
                  message.timestamp = 'minute ago';
                } else if (message.timestamp > 1 && message.timestamp < 60) {
                  message.timestamp = message.timestamp + ' ' + 'minutes ago';
                } else if (message.timestamp >= 60 && message.timestamp < 120) {
                  message.timestamp =
                    Math.floor(message.timestamp / 60) + ' ' + 'hour ago';
                } else if (
                  message.timestamp >= 120 &&
                  message.timestamp < 1440
                ) {
                  message.timestamp =
                    Math.floor(message.timestamp / 60) + ' ' + 'hours ago';
                } else if (
                  message.timestamp >= 1440 &&
                  message.timestamp < 2880
                ) {
                  message.timestamp =
                    Math.floor(message.timestamp / (24 * 60)) + ' ' + 'day ago';
                } else if (
                  message.timestamp > 2880 &&
                  message.timestamp < 10080
                ) {
                  message.timestamp =
                    Math.floor(message.timestamp / (24 * 60)) +
                    ' ' +
                    'days ago';
                } else if (message.timestamp > 10080) {
                  // message.timestamp = this.dateObj.toLocaleDateString();
                  message.timestamp = message.date_format;
                }
              });
              i++;
            }
            this.loaderService.display(false);
          }
        } else {
          this.router.navigate(['/inbox-notifications']);
          this.loaderService.display(false);
        }
      });
  }

  getCurrentUser() {
    this.userId = parseInt(localStorage.getItem('user_id'), 10);
    this.userService.getUser(this.userId).subscribe(res => {
      Object.assign(this.user, res);
    });
  }

  onSubmit(e) {
    this.loaderService.display(true);
    e.preventDefault();
    // this.getThreads();
    // this.getCurrentUser();

    if (this.messageForm.valid) {
      this.reply.thread_id = this.msg.pmtid;
      this.reply.body = this.messageForm.value.body;
      this.pm.sendMessage(this.reply).subscribe(
        res => {
          // var newComment = {
          //   thread_id: this.reply.thread_id,
          //   user_photo: this.user['user_photo'],
          //   first_name: this.user['first_name'],
          //   last_name: this.user['last_name'],
          //   body: this.reply.body,
          //   timestamp: 'Now'

          // }
          // this.messages.push(newComment);
          this.participants = [];
          // this.messages = [];
          this.getThreads();
        },
        err => {},
      );
    }
    this.messageForm.reset();
  }

  buildForm(): void {
    this.messageForm = this.fb.group({
      body: ['', Validators.required],
    });
    this.messageForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.messageForm) {
      return;
    }
    const form = this.messageForm;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  previousUrl() {
    this._location.back();
  }

  cancel() {
    this.messageForm.reset();
  }

  deleteThread() {
    for (const mesg of this.msg.messages) {
      let i = 0;
      this.pm.deleteMessage(mesg.mid).subscribe(data => {
        this.deleted = data;
        i++;
      });
    }
  }

  blockUser() {
    for (let i = 0; i < this.msg.participants.length; i++) {
      if (this.msg.participants[i] != this.userId) {
        this.pm
          .blockUser(this.userId, this.msg.participants[i])
          .subscribe(data => {
            this.blockedUser = data;
            this.block = true;
          });
      }
    }
  }

  unBlockUser() {
    for (let i = 0; i < this.msg.participants.length; i++) {
      if (this.msg.participants[i] != this.userId) {
        this.pm.unBlockUser(this.msg.participants[i]).subscribe(data => {
          this.unBlockedUser = data;
          this.block = false;
        });
      }
    }
  }

  getBlockedUser() {
    // for (var i = 0; i < this.msg.participants.length; i++) {
    //   if (this.msg.participants[i] != this.userId) {
    //     this.pm.getBlocked(this.msg.participants[i]).subscribe(data => {
    //     })
    //   }
    // }
  }

  /*
*if message turned off the data[0]=disabled
*/
  getStatus() {
    this.userId = parseInt(localStorage.getItem('user_id'), 10);
    this.pm.getStatus(this.userId).subscribe(data => {
      this.status = data;
      if (this.status == false) {
        this.hideTurnOn = false;
      } else if (this.status.setting === 'disabled') {
        this.hideTurnOn = true;
      }
    });
  }
  deleteReplay(i) {
    this.loaderService.display(true);
    this.pm.deleteReplay(this.msg.messages[i].mid).subscribe(data => {
      this.participants = [];
      this.msg.messages.length = this.msg.messages.length - 1;
      if (this.msg.messages.length <= 1) {
        this.hideDeleteReply = false;
      }
      this.getThreads();
      this.loaderService.display(false);
    });
  }

  userProfile(fName, lName) {
    this.router.navigate(['/portfolio/', `${fName}-${lName}`]);
  }

  // capitalize First Letter
  toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }
}
