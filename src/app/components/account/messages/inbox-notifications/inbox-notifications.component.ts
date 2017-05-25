import { Component, OnInit, Input, forwardRef, Injector, Injectable, state, ViewChild, EventEmitter, Output } from '@angular/core';
import { PmService,ViewService,UserService } from '../../../../d7services'
import { RouterModule, Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NotificationBarService, NotificationType } from 'angular2-notification-bar/release';
import { LoaderService } from '../../../shared/loader/loader.service';

@Component({
  selector: 'app-inbox-notifications',
  templateUrl: './inbox-notifications.component.html'
})
export class InboxNotificationsComponent implements OnInit {
  //  @Output() myEvent = new EventEmitter();
  formatter = (x) => {
    return '';
  };

  current_active_tab;
  SelectedUser = [];
  messageForm: FormGroup;
  userId;
  messageObj = {
    recipients: '',
    subject: '',
    body: '',
  };
  msg = [];
  closeResult: string;
  noMessage= false;
  hideTurnOn: boolean = false;
  status;
  active = true;
  searchFailed = false;
  constructor(
    private route: ActivatedRoute,
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

  ngOnInit() {
      this.current_active_tab = 'messages';
      this.buildForm();
      this.getCurrentUser();
      this.getStatus();
      
  }
   search = (text$: Observable<string>) => {
    return text$
      .debounceTime(300)
      .distinctUntilChanged()
      .do(() => this.searchFailed = false)
      .switchMap((term) => {
        if (term.length > 1) {
          return this.viewService.getView('maker_profile_search_data', [['combine', term]])
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
    this.current_active_tab = 'message';  
    if (this.messageForm.valid) {
      this.loaderService.display(true);
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
              
        this.loaderService.display(false);
        this.msg = [];
        if(this.msg.length == 0){
        this.noMessage = false;
        this.current_active_tab = 'sent';  
      }
        this.messageForm.reset();
        this.SelectedUser = [];
        this.notificationBarService.create({ message: 'Your message has been sent', type: NotificationType.Success, allowClose: true, autoHide: false, hideOnHover: false });
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

  clickedError(){
    const form = this.messageForm;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && !control.valid) {
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

    /*
  * disable messages
   */
  turnOffMessages() {
    this.loaderService.display(true);
    this.userId = localStorage.getItem('user_id');
    this.pm.updateSettings(this.userId, { 'pm_disabled': true }).subscribe(data => {
      this.hideTurnOn = true;
      this.notificationBarService.create({ message: 'You have turned off messaging; only community managers can message you. You can always turn it back on here.', type: NotificationType.Success , allowClose: true, autoHide: false, hideOnHover: false});
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
      this.notificationBarService.create({ message: 'You have enabled Privatemsg', type: NotificationType.Success, allowClose: true, autoHide: false, hideOnHover: false });
      this.loaderService.display(false);
    })
  }

}
