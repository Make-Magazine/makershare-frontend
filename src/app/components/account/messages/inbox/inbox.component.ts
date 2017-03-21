import { Component, OnInit, Input, forwardRef, Injector, Injectable, state } from '@angular/core';
import { PmService } from '../../../../d7services/pm/pm.service'
import { RouterModule, Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Message } from '../sending/message';
import { ViewService } from '../../../../d7services/view/view.service';
import { SelectModule } from 'ng2-select';
import { UserService } from '../../../../d7services/user/user.service';


@Component({
  moduleId: module.id,
  selector: 'app-inbox',
  templateUrl: './inbox.component.html'
})
export class InboxComponent implements OnInit {
  currentuser;
  active = true;
  messageForm: FormGroup;
  messages = [];
  message;
  msg = [];
  num: any;
  num2: any;
  num3: any;
  anothUser: any;
  author;
  dateObj;
  currentDate;
  curr;
  countMsg;
  currentStatusId = 0;
  currentCount = 0;
  statusesCount = {};
  pageNumber = 0;
  hideloadmore = true;
  sender = null;
  reciver = null;
  reciverUser = [];
  SelectedUser = [];
  submitted = false;
  deletedArr = [];
  deleted = []
  messageObj: Message = {
    recipients: [],
    subject: '',
    body: '',
  };
  constructor(private route: ActivatedRoute,
    private fb: FormBuilder,
    private pm: PmService,
    private router: Router,
    private http: Http,
    private user: UserService,
    private viewService: ViewService,

  ) { }
  ngOnInit(): void {
    this.getCurrentUser();
    this.getMessages();
    this.buildForm();
    this.CountMessages();
  }

  SetMember(uid, index) {
    this.viewService.getView('maker_profile_card_data', [['uid', uid],]).subscribe(data => {
      this.SelectedUser[index] = data[0];
    });
  }

  RefreshUsers(index, value) {
    this.reciverUser[index] = [];
    if (value.length > 1) {
      this.viewService.getView('maker_profile_search_data', [['search', value]]).subscribe(data => {
        this.reciverUser[index] = data;
        var TempUsers = [];
        for (let index in data) {
          var found = false;
          let element = data[index];
          this.SelectedUser.forEach(addeduser => {
            if (addeduser.uid === element.uid) {
              found = true;
              return;
            }
          });
          if (!found) {
            TempUsers.push(element);
          }
        }
        this.reciverUser[index] = TempUsers;
        //console.log(this.reciverUser[index])
      });
    }
  }

  onSubmit(e, index) {
    e.preventDefault();
    if (this.messageForm.valid) {
      this.messageObj.recipients = this.SelectedUser[index].username;
      this.messageObj.body = this.messageForm.value.body;
      this.messageObj.subject = this.messageForm.value.subject;
      this.pm.sendMessage(this.messageObj).subscribe(res => {
        //this.submitted=true;
        //this.messageObj=messageObj
        //console.log(res)
      });
    }
  }

  buildForm(): void {
    this.messageForm = this.fb.group({
      'recipients': ['', Validators.required],
      'subject': ['', Validators.required],
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
    'recipients': '',
    'subject': '',
    'body': ''
  };

  validationMessages = {
    'recipients': {
      'required': 'Name is required.',
    },
    'subject': {
      'required': 'Subject is required.',
    },
    'body': {
      'required': 'Message Body is required.',
    },
  };

  //get all messages
  getMessages() {
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
    this.pm.getMessages('privatemsg', [status_arg, page_arg]).subscribe(data => {
      this.messages = data;
      let msg_arr = [];
      for (let key in this.messages) {
        if (typeof (this.messages[key]) == 'object' && this.messages.hasOwnProperty(key)) {
          msg_arr.push(this.messages[key]);
        }
      }
      this.msg = this.msg.concat(msg_arr);
      this.loadMoreVisibilty();
      for (let message of this.msg) {
        this.pm.getMessage(message.thread_id).subscribe(data => {
          Object.assign(message, data);
          //the 0 author is the author for this message
          if (this.currentuser.user.uid === message.messages[0].author) {
            this.user.getUser(this.currentuser.user.uid).subscribe(res => {
              this.sender = res;
              console.log(this.sender.first_name)
            })
          } else {
            this.user.getUser(message.messages[0].author).subscribe(res => {
              this.reciver = res;
              console.log(this.reciver.first_name)
            })
          }
        })
        this.dateObj = new Date(message.last_updated * 1000);
        this.currentDate = new Date();
        message.last_updated = Math.floor(Math.abs(this.dateObj - this.currentDate) /(60*1000));
      }
    })
  }

  CountMessages() {
    this.route.params
      .switchMap(() => this.viewService.getView('maker_count_pm_api/'))
      .subscribe(data => {
        this.countMsg = data;
       });
  }

  loadMore() {
    this.pageNumber++;
    this.getMessages();
  }
  loadMoreVisibilty() {
    // get the challenges array count
    var arr_count = this.msg.length;
    if (this.countMsg > arr_count) {
      this.hideloadmore = true;
    } else {
      this.hideloadmore = false;
    }
  }

  getCurrentUser() {
    this.user.getStatus().subscribe(data => {
      this.currentuser = data;
      //console.log(this.currentuser.user.uid);
    });
  }

  deleteMessage(mid: number) {
    this.pm.deleteMessage(mid).subscribe(data => {
      this.msg = data;
      //console.log(this.msg);
    }, err => {

    });
  }

  valueChanged(mid, event) {
    // add to deletedArr
    if (event.target.checked === true) {
      this.deletedArr.push(mid);
    } else {
      // remove from deletedArr
      var index = this.deletedArr.indexOf(mid, 0);
      if (index > -1) {
        this.deletedArr.splice(index, 1);
      }
    }
    //console.log(this.deletedArr);
  }
  deleteMessages() {
    for (var _i = 0; _i < this.deletedArr.length; _i++) {
      this.pm.deleteMessage(this.deletedArr[_i]).subscribe(data => {
        this.deleted = data;
        console.log(this.deleted);
      });
    }
  }

  checkAll(ev) {
    this.msg.forEach(x => x.state = ev.target.checked)
    if (ev.target.checked === true) {
      for (var _i = 0; _i < this.msg.length; _i++) {
        this.pm.deleteMessage(this.msg[_i].thread_id).subscribe(data => {
          this.deleted = data;
        })
        //console.log(this.msg[_i].thread_id)
      }
    }
  }

  isAllChecked(mid) {
    return this.msg.every(_ => _.state);
  }

  viewMessage(thread_id) {
    this.router.navigate(['/view', thread_id]);
    //console.log(this.message)
  }
  // turnOffMessages(){
  //   this.pm.updateSettings().subscribe(data=>{

  //   })
  // }
}