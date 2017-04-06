import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Message } from '../../../d7services/pm/message';
import { NotificationBarService, NotificationType } from 'angular2-notification-bar';
import { PmService } from '../../../d7services/pm/pm.service';
import { UserService } from '../../../d7services/user/user.service';

@Component({
  selector: 'app-message-modal',
  templateUrl: './message-modal.component.html'
})
export class MessageModalComponent implements OnInit {
  @Input() uid;
  messageForm: FormGroup;
  messageObj: Message = {
    recipients: '',
    subject: '',
    body: '',
  };
  active = true;
  user;
  constructor(
    private notificationBarService: NotificationBarService,
    private fb: FormBuilder,
    private pm: PmService,
    private userService : UserService,
  ) { }

  ngOnInit() {
    this.buildForm();
    this.getUserData();
  }
  getUserData(){
    this.userService.getUser(this.uid).subscribe(data=>{
      console.log(data)
    })
  }
    onSubmit(e) {
    e.preventDefault();
    if (this.messageForm.valid) {
      // this.messageObj.recipients = this.name;
      this.messageObj.body = this.messageForm.value.body;
      this.messageObj.subject = this.messageForm.value.subject;
      this.pm.sendMessage(this.messageObj).subscribe(res => {
        this.notificationBarService.create({ message: 'Message sent successfully', type: NotificationType.Success });
      });
    }
  }
  resetForm(e) {
    e.preventDefault();
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

}
