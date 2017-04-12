import { Component, OnInit } from '@angular/core';
import { RouterModule, Router, ActivatedRoute, Params } from '@angular/router';
import { PmService } from '../../../../d7services/pm/pm.service';
import { UserService } from '../../../../d7services/user/user.service';
import { Observable } from 'rxjs/Observable'
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Reply } from './reply';
import { Location } from '@angular/common';
import { ViewService } from '../../../../d7services/view/view.service';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html'
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
  id
  constructor(
    private route: ActivatedRoute,
    private pm: PmService,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
    private _location: Location,
    private viewService: ViewService,

  ) { }

  ngOnInit() {
    this.getStatus();
    this.buildForm();
    this.getThreads();
    var thread_id;
    this.getCurrentUser();
    this.getBlockedUser();
  }
  getThreads() {
    this.route.params
      .switchMap((thread_id) => this.pm.getMessage(thread_id['thread_id']))
      .subscribe(data => {
        this.msg = data;
        this.pm.getBlocked(this.msg.messages[0].author).subscribe(data => {
          if (data.author == this.msg.messages[0].author) {
            this.block = true;
          } else {
            this.block = false;
          }
        })
        this.messages = this.msg.messages
        for (let message of this.messages) {
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
              message.timestamp = this.dateObj.toLocaleDateString();
            }
          })
          i++
        }
      });
  }

  getCurrentUser() {
    this.userId = parseInt(localStorage.getItem('user_id'));
    this.userService.getUser(this.userId).subscribe(res => {
      Object.assign(this.user, res);
    })
  }
  onSubmit(e) {
    e.preventDefault();
    this.getThreads();
    this.getCurrentUser();

    if (this.messageForm.valid) {
      this.reply.thread_id = this.msg.pmtid;
      this.reply.body = this.messageForm.value.body;
      this.pm.sendMessage(this.reply).subscribe(res => {
        var newComment = {
          thread_id: this.reply.thread_id,
          user_photo: this.user['user_photo'],
          first_name: this.user['first_name'],
          last_name: this.user['last_name'],
          body: this.reply.body,
          timestamp: 'Now'

        }
        this.messages.push(newComment);
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
        //console.log(this.deleted);
        i++
      });
    }
  }
  blockUser() {
      this.pm.blockUser(this.userId, this.msg.messages[0].author).subscribe(data => {
        this.blockedUser = data;
        this.block = true;
      })
  }
  unBlockUser() {
    this.pm.unBlockUser(this.msg.messages[0].author).subscribe(data => {
      this.unBlockedUser = data;
      this.block = false;
    })
  }
  getBlockedUser() {
    // this.pm.getBlocked(this.msg.messages[0].author).subscribe(data=>{
    //   console.log(data);
    // })
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
    this.pm.deleteReplay(this.msg.messages[i].mid).subscribe(data=>{
    });
    delete this.messages[i];
  }

}

