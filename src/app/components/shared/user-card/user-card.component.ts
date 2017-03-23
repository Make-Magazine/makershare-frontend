import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, RouterModule, ActivatedRoute, Params } from '@angular/router';
import { ViewService } from '../../../d7services/view/view.service';
import { FlagService } from '../../../d7services/flag/flag.service';
import { UserService } from '../../../d7services/user/user.service';
import { NotificationBarService, NotificationType } from 'angular2-notification-bar';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Message } from '../../account/messages/sending/message';
import { PmService } from '../../../d7services/pm/pm.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',

})
export class UserCardComponent implements OnInit {
  card = {};
  active = true;
  userId;
  hideMessage=false;
  messageForm: FormGroup;
  messageObj: Message = {
    recipients: '',
    subject: '',
    body: '',
  };
  @Input() uid;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private viewService: ViewService,
    private userService: UserService,
    private flagService: FlagService,
    private notificationBarService: NotificationBarService,
    private pm: PmService,
    private fb: FormBuilder,

  ) { }
  ngOnInit() {
    this.getcard();
    this.buildForm();
  }

  getcard() {

    // get card profile
    // service to get profile card 
    this.viewService.getView('maker_profile_card_data2', [['uid', this.uid]]).subscribe(data => {
      this.card = data;
      this.isCurrentUser();
      //console.log(this.card[0].uid)
    }, err => {
      // notification error  in service 
      this.notificationBarService.create({ message: 'Sorry, somthing went wrong, try again later.', type: NotificationType.Error });
    });
  }
  onSubmit(e, index) {
    e.preventDefault();
    if (this.messageForm.valid) {
      this.messageObj.recipients = this.card[0].name;
      this.messageObj.body = this.messageForm.value.body;
      this.messageObj.subject = this.messageForm.value.subject;
      this.pm.sendMessage(this.messageObj).subscribe(res => {
       
      });
    }
  }
  resetForm() {
    this.messageForm.reset();
  }

  buildForm(): void {
    this.messageForm = this.fb.group({
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

  isCurrentUser(){
    this.userId = localStorage.getItem('user_id');
    if(this.card[0].uid === this.userId){
      this.hideMessage=false;
    }else{
      this.hideMessage = true;
    }
  }


}
