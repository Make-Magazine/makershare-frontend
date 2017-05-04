import { Component, OnInit, Input, forwardRef, Injector, Injectable, state, ViewChild } from '@angular/core';
import { PmService } from '../../../../d7services/pm/pm.service'
import { RouterModule, Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Message } from '../../../../d7services/pm/message';
import { ViewService } from '../../../../d7services/view/view.service';
import { UserService } from '../../../../d7services/user/user.service';
import { Location } from '@angular/common'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NotificationBarService, NotificationType } from 'angular2-notification-bar/release';
import { LoaderService } from '../../../shared/loader/loader.service';


@Component({
  moduleId: module.id,
  selector: 'app-inbox',
  templateUrl: './inbox.component.html'
})
export class InboxComponent implements OnInit {

  formatter = (x) => {
    return '';
  };

  @ViewChild('myInput')
  count; 
  searchValue: string = '';
  closeResult: string;
  currentuser;
  active = true;
  searchFailed = false;
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
  hideTurnOn: boolean = false;
  status;
  blocked;
  usr_recv;
  participints
  senderData
  noMessage= false;
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

  ) { }
  ngOnInit(): void {
    this.getStatus();
    // this.loaderService.display(true);

    this.getCurrentUser();
    this.getMessages();
    this.buildForm();
    this.CountMessages();
    this.getBlockedUsers();
    this.userId = localStorage.getItem('user_id');

  }

  search = (text$: Observable<string>) => {
    return text$
      .debounceTime(300)
      .distinctUntilChanged()
      .do(() => this.searchFailed = false)
      .switchMap((term) => {
        if (term.length > 1) {
          return this.viewService.getView('maker_profile_search_data', [['email', term]])
            .map(result => {
              if (result.length == 0) {
                this.searchFailed = true;
              }
              return result;
            })
        }
        return [];
      }
      )
  };

  /**
  * selct users to send message
  */
  SetMember(uid, i) {
    // this.hideUser = false;
    this.viewService.getView('maker_profile_card_data', [['uid', uid]]).subscribe(data => {
       this.SelectedUser.push(data);
       this.messageForm.reset();
    });
  }
  unSetMember(i) {
    this.SelectedUser.splice(i, 1);
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
      var full_name :string = '';
      for (let selectedUsers of this.SelectedUser) {
        str += selectedUsers[0].username + ', ';
        full_name += selectedUsers[0].first_name + ' ' + selectedUsers[0].last_name + ', ';
      }
      this.messageObj.recipients = str;
      this.messageObj.subject = this.messageForm.value.subject;
      this.messageObj.body = this.messageForm.value.body;
      this.pm.sendMessage(this.messageObj).subscribe(res => {
        this.loaderService.display(true);
        // var newMessage = {
        //   user_photo: this.user['user_photo'],
        //   sender: 'message has ben sent to ' + ' ' + this.msg[0].first_name + ' ' + this.msg[0].last_name,
        //   subject: this.messageObj.subject,
        //   last_updated: 'Now',
        // }
        // this.msg.unshift(newMessage);
        this.msg = [];
        if(this.msg.length == 0){
        this.noMessage = false;
      }
        this.messageForm.reset();
        this.SelectedUser = [];
        this.getMessages();
        this.notificationBarService.create({ message: 'Your message has been sent', type: NotificationType.Success });
      }, err => {
        this.loaderService.display(false);
        this.notificationBarService.create({ message: 'Your message cannot be delivered ' + full_name + 'is not accepting messages from your account' , type: NotificationType.Error,allowClose:true,autoHide:false,hideOnHover:false });
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
              //i am who sent the message
              this.pm.getParticipents(this.messages[key].thread_id).subscribe(res => {
                for (let i = 0; i<res.length; i++) {
                  if (res[i] != this.userId) {
                    this.user.getUser(res[i]).subscribe(res => {
                      this.messages[key].sender = true;
                      this.messages[key].user_photo = res.user_photo;
                      this.messages[key].first_name = res.first_name;
                      this.messages[key].last_name = res.last_name;
                    })
                  }
                }
              })
            } else {
              //another person send message to me
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
        //  if(Object.keys(msg_arr[i].participants).length > 2){
            msg_arr[i].count = Object.keys(msg_arr[i].participants).length;
          //}
          i++
        }
      }
      
      this.msg = this.msg.concat(msg_arr);    
      //show if user have 0 msg 
      if(this.msg.length == 0){
        this.noMessage = true;
      }
      this.loaderService.display(false);
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
    this.loaderService.display(true);
    for (var _i = 0; _i < this.msg.length; _i++) {
      this.pm.deleteMessage(this.deletedArr[_i]).subscribe();
    }
    this.msg = [];
    this.getMessages();
  }

  viewMessage(thread_id) {
    this.router.navigate(['/account/inbox/view', thread_id]);
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
    this.loaderService.display(true);
    this.userId = localStorage.getItem('user_id');
    this.pm.updateSettings(this.userId, { 'pm_disabled': true }).subscribe(data => {
      this.hideTurnOn = true;
      this.notificationBarService.create({ message: 'You have turned off messaging; only community managers can message you. You can always turn it back on here.', type: NotificationType.Success });
      this.loaderService.display(false);
    })
  }
  /**
   * enable messages
   */
  turnOnMessages() {
    this.loaderService.display(true);
    this.userId = localStorage.getItem('user_id');
    this.pm.updateSettings(this.userId, { 'pm_disabled': false }).subscribe(data => {
      this.hideTurnOn = false;
      this.notificationBarService.create({ message: 'You have enabled Privatemsg', type: NotificationType.Success });
      this.loaderService.display(false);
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