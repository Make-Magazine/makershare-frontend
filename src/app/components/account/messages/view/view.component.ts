import { Component, OnInit } from '@angular/core';
import { RouterModule, Router, ActivatedRoute, Params } from '@angular/router';
import { PmService, UserService, ViewService } from '../../../../d7services';
import { Observable } from 'rxjs/Observable'
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Reply } from './reply';
import { Location } from '@angular/common';
import { LoaderService } from '../../../shared/loader/loader.service';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  providers: [NgbTooltipConfig],

})
export class ViewComponent implements OnInit {
  msg;
  uid;
  status;
  hideTurnOn
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
    body: ''
  };
  id;
  hover;
  deleteReplyTip = "Delete this reply";
  participants = [];
  hideDeleteReply;
  constructor(
    private route: ActivatedRoute,
    private pm: PmService,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
    private _location: Location,
    private viewService: ViewService,
    private loaderService: LoaderService,
    private config: NgbTooltipConfig,

  ) {
    config.placement = 'bottom';
    config.triggers = 'hover'; 
  }

  ngOnInit() {
    //this.getBlockedUser();
    this.getStatus();
    this.buildForm();
    this.getThreads();
    var thread_id;
    this.getCurrentUser();
    this.loaderService.display(true);
    this.userId = parseInt(localStorage.getItem('user_id'));
  }
  getThreads() {
    this.route.params
      .switchMap((thread_id) => this.pm.getMessage(thread_id['thread_id']))
      .subscribe(data => {
        this.msg = data;
        /*hide delete replay if only one replay*/
        if (this.msg.messages.length > 1) {
          this.hideDeleteReply = true
        }
        /*end of hide delete replay if only one replay*/
        for (var i = 0; i < this.msg.participants.length; i++) {
          if (this.msg.participants[i] != this.userId) {
            this.userService.getUser(this.msg.participants[i]).subscribe(res => {
              this.participants = this.participants.concat(res);
            })
          }
          if (this.msg.participants[i] != this.userId) {
            this.pm.getBlocked(this.msg.participants[i]).subscribe(data => {
              if (data.author) {
                this.block = true;
              } else {
                this.block = false;
              }
            })
          }
        }
        this.messages = this.msg.messages
        for (let message of this.messages) {
          var date = new Date(message.timestamp * 1000);
          var hour = date.getHours() - (date.getHours() >= 12 ? 12 : 0);
          var period = date.getHours() >= 12 ? 'PM' : 'AM';
          let i = 0
          this.userService.getUser(message.author).subscribe(res => {
            Object.assign(message, res);
            this.dateObj = new Date(message.timestamp * 1000);
            this.currentDate = new Date();
            message.timestamp = Math.floor(Math.abs(this.dateObj - this.currentDate) / (60 * 1000));
            if (message.timestamp < 1) {
              message.timestamp = 'Now';
            } else if (message.timestamp === 1) {
              message.timestamp = 'minute ago';
            } else if (message.timestamp > 1 && message.timestamp < 60) {
              message.timestamp = message.timestamp + ' ' + 'minutes ago';
            } else if (message.timestamp >= 60 && message.timestamp < 120) {
              message.timestamp = Math.floor(message.timestamp / 60) + ' ' + 'hour ago';
            } else if (message.timestamp >= 120 && message.timestamp < 1440) {
              message.timestamp = Math.floor(message.timestamp / 60) + ' ' + 'hours ago';
            } else if (message.timestamp >= 1440 && message.timestamp < 2880) {
              message.timestamp = Math.floor(message.timestamp / (24 * 60)) + ' ' + 'day ago';
            } else if (message.timestamp > 2880 && message.timestamp < 10080) {
              message.timestamp = Math.floor(message.timestamp / (24 * 60)) + ' ' + 'days ago';
            } else if (message.timestamp > 10080) {
              //message.timestamp = this.dateObj.toLocaleDateString();
              message.timestamp = message.date_format;
            }
          })
          i++
        }
        this.loaderService.display(false);
      });
  }

  getCurrentUser() {
    this.userId = parseInt(localStorage.getItem('user_id'));
    this.userService.getUser(this.userId).subscribe(res => {
      Object.assign(this.user, res);
    })
  }
  onSubmit(e) {
    this.loaderService.display(true);
    e.preventDefault();
    // this.getThreads();
    // this.getCurrentUser();

    if (this.messageForm.valid) {
      this.reply.thread_id = this.msg.pmtid;
      this.reply.body = this.messageForm.value.body;
      this.pm.sendMessage(this.reply).subscribe(res => {
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
      }, err => { });
    }
    this.messageForm.reset();
  }

  buildForm(): void {
    this.messageForm = this.fb.group({
      'body': ['', Validators.required]
    });
    this.messageForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.messageForm) { return; }
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

  formErrors = {
    'body': ''
  };

  validationMessages = {
    'body': {
      'required': 'Message Body is required.',
    },
  };
  previousUrl() {
    this._location.back();
  }
  cancel() {
    this.messageForm.reset();
  }
  deleteThread() {
    for (let mesg of this.msg.messages) {
      let i = 0
      this.pm.deleteMessage(mesg.mid).subscribe(data => {
        this.deleted = data;
        i++
      });
    }
  }
  blockUser() {
    for (var i = 0; i < this.msg.participants.length; i++) {
      if (this.msg.participants[i] != this.userId) {
        this.pm.blockUser(this.userId, this.msg.participants[i]).subscribe(data => {
          this.blockedUser = data;
          this.block = true;
        })
      }
    }
  }
  unBlockUser() {
    for (var i = 0; i < this.msg.participants.length; i++) {
      if (this.msg.participants[i] != this.userId) {
        this.pm.unBlockUser(this.msg.participants[i]).subscribe(data => {
          this.unBlockedUser = data;
          this.block = false;
        })
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
    this.userId = parseInt(localStorage.getItem('user_id'));
    this.pm.getStatus(this.userId).subscribe(data => {
      this.status = data;
      if (this.status == false) {
        this.hideTurnOn = false;
      } else if (this.status.setting === "disabled") {
        this.hideTurnOn = true;
      }
    })
  }
  deleteReplay(i) {
    this.loaderService.display(true);
    this.pm.deleteReplay(this.msg.messages[i].mid).subscribe(data => {
      this.participants = [];
      this.msg.messages.length = this.msg.messages.length - 1;
      if(this.msg.messages.length <= 1){
        this.hideDeleteReply = false;
      }
      this.getThreads();
      this.loaderService.display(false);
    });

  }

  userProfile(fName, lName) {
    var name = fName + '-' + lName;
    this.router.navigate(['/portfolio/', name]);
  }
  //capitalize First Letter
  toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
  }
}

