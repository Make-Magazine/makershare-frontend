import { Component, OnInit, Input, forwardRef, Injector, Injectable, state } from '@angular/core';
import { PmService } from '../../../../d7services/pm/pm.service'
import { RouterModule, Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Message } from '../../../../d7services/pm/message';
import { ViewService } from '../../../../d7services/view/view.service';
import { SelectModule } from 'ng2-select';
import { UserService } from '../../../../d7services/user/user.service';
import { Location } from '@angular/common'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NotificationBarService, NotificationType } from 'angular2-notification-bar';


@Component({
  moduleId: module.id,
  selector: 'app-inbox',
  templateUrl: './inbox.component.html'
})
export class InboxComponent implements OnInit {
  closeResult: string;
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
  deleted;
  userId;
  messageObj: Message = {
    recipients: '',
    subject: '',
    body: '',
  };
  selected = [];
  profile;
  pm_disabed = true;
  disabled;
  onemMg = [];
  allChecked
  hideTurnOn;
  status;
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

  ) { }
  ngOnInit(): void {
    this.getCurrentUser();
    this.getMessages();
    this.buildForm();
    this.CountMessages();
    this.getStatus();
  }

  RefreshUsers(index, value) {
    this.reciverUser = [];
    if (value.length > 1) {
      this.viewService.getView('maker_profile_search_data', [['search', value]]).subscribe(data => {
        this.reciverUser = data;
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
        this.reciverUser = TempUsers;
      });
    }
  }

  /**
  * selct users to send message
  */
  SetMember(uid, i) {
    //this.hideUser = false;
    this.viewService.getView('maker_profile_card_data', [['uid', uid]]).subscribe(data => {
      this.SelectedUser.push(data);
      this.messageForm.reset();
    });
  }
  getCurrentUser() {
    this.userId = parseInt(localStorage.getItem('user_id'));
    this.user.getUser(this.userId).subscribe(res => {
      Object.assign(this.user, res);
    })
  }
  onSubmit(e) {
    e.preventDefault();
    if (this.messageForm.valid) {
      var str: string = '';
      for (let selectedUsers of this.SelectedUser) {
        str += selectedUsers[0].username + ', ';
      }
      this.messageObj.recipients = str;
      this.messageObj.subject = this.messageForm.value.subject;
      this.messageObj.body = this.messageForm.value.body;
      this.pm.sendMessage(this.messageObj).subscribe(res => {
        var newMessage = {
          user_photo: this.user['user_photo'],
          sender: 'you send a message',
          subject: this.messageObj.subject,
          last_updated : 'Now',
        }
        this.msg.unshift(newMessage);
        this.notificationBarService.create({ message: 'Message sent successfully', type: NotificationType.Success });
      });

    }
  }

  buildForm(): void {
    this.messageForm = this.fb.group({
      'recipients': [''],
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
    'subject': '',
    'body': ''
  };

  validationMessages = {
    'subject': {
      'required': 'Subject is required.',
    },
    'body': {
      'required': 'Message Body is required.',
    },
  };

  resetForm(e) {
    e.preventDefault();
    this.messageForm.reset();
  }

  hidepopup() {
    this._location.path();
  }

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
      var msg_arr = [];
      var i = 0
      for (let key in this.messages) {
        if (typeof (this.messages[key]) == 'object' && this.messages.hasOwnProperty(key)) {
          this.pm.postView('maker_get_pm_author/retrieve_author/', this.messages[key].thread_id).subscribe(author => {

            this.userId = localStorage.getItem('user_id');
            if (this.userId === author[0].author) {
              this.user.getUser(this.userId).subscribe(res => {
                this.messages[key].sender = true;
                this.messages[key].user_photo = res.user_photo;
                this.messages[key].first_name = res.first_name;
                this.messages[key].last_name = res.last_name;

              })
            } else {
              this.user.getUser(author[0].author).subscribe(res => {
                this.messages[key].reciver = true;
                this.messages[key].user_photo = res.user_photo;
                this.messages[key].first_name = res.first_name;
                this.messages[key].last_name = res.last_name;
              })
            }

          })
          msg_arr.push(this.messages[key]);

          this.dateObj = new Date(msg_arr[i].last_updated * 1000);
          this.currentDate = new Date();
          msg_arr[i].last_updated = Math.floor(Math.abs(this.dateObj - this.currentDate) / (60 * 1000));
          if(msg_arr[i].last_updated < 1){
            msg_arr[i].last_updated = 'Now';
          }else if(msg_arr[i].last_updated === 1){
            msg_arr[i].last_updated = 'minute ago';
          }else if(msg_arr[i].last_updated > 1 && msg_arr[i].last_updated < 60){
            msg_arr[i].last_updated = msg_arr[i].last_updated + ' '  +  'minutes ago';
          }else if(msg_arr[i].last_updated > 60 && msg_arr[i].last_updated < 120){
            msg_arr[i].last_updated = Math.floor(msg_arr[i].last_updated/60) + ' ' +  'hour ago';
          }else if(msg_arr[i].last_updated >= 120 && msg_arr[i].last_updated < 1440){
            msg_arr[i].last_updated = Math.floor(msg_arr[i].last_updated/60) + ' '  + 'hours ago';
          }else if(msg_arr[i].last_updated >= 1440 && msg_arr[i].last_updated < 2880){
            msg_arr[i].last_updated = Math.floor(msg_arr[i].last_updated/(24*60)) + ' ' + 'day ago';
          }else if(msg_arr[i].last_updated > 2880 && msg_arr[i].last_updated < 10080){
            msg_arr[i].last_updated = Math.floor(msg_arr[i].last_updated/(24*60)) + ' '  + 'days ago';
          }else if (msg_arr[i].last_updated > 10080){
            msg_arr[i].last_updated = this.dateObj.toLocaleDateString();
          }
          i++
        }
      }
      this.msg = this.msg.concat(msg_arr);
      this.loadMoreVisibilty();
    })
  }

  CountMessages() {
    this.userId = localStorage.getItem('user_id');
    this.route.params
      .switchMap(() => this.pm.postView('maker_get_pm_author/retrieve_count/', this.userId))
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
  deleteMessage(i) {
    this.pm.deleteMessage(this.msg[i].thread_id).subscribe();
    delete this.msg[i];
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
  }

  checkAll(ev) {
    this.msg.forEach(x => x.state = ev.target.checked)
    for (var _i = 0; _i < this.msg.length; _i++) {
      if (ev.target.checked === true) {
        this.deletedArr.push(this.msg[_i].thread_id);
      } else {
        var index = this.deletedArr.indexOf(this.msg[_i].thread_id, 0);
        if (index > -1) {
          this.deletedArr.splice(index, 1);
        }
      }
    }
  }

  isAllChecked(mid) {
    return this.msg.every(_ => _.state);
  }
  /**
 * delete selected messages
 */
  deleteMessages() {
    for (var _i = 0; _i < this.msg.length; _i++) {
     this.pm.deleteMessage(this.deletedArr[_i]).subscribe();
    }
    this.msg.splice(this.deletedArr.length,1)
  }

  viewMessage(thread_id) {
    this.router.navigate(['/view', thread_id]);
  }

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  /*
  * disable messages
   */
  turnOffMessages() {
    this.userId = localStorage.getItem('user_id');
    this.pm.updateSettings(this.userId, { 'pm_disabled': true }).subscribe(data => {
      this.hideTurnOn = true;
      this.notificationBarService.create({ message: 'You have disabled Privatemsg and are not allowed to write messages', type: NotificationType.Success });
    })
  }
  /**
   * enable messages
   */
  turnOnMessages() {
    this.userId = localStorage.getItem('user_id');
    this.pm.updateSettings(this.userId, { 'pm_disabled': false }).subscribe(data => {
      this.hideTurnOn = false;
      this.notificationBarService.create({ message: 'You have enabled Privatemsg', type: NotificationType.Success });
    })
  }
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
}