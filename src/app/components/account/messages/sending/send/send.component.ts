import { Component, OnInit,  } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, } from '@angular/forms';
import { Message }  from '../message';

@Component({
  moduleId:  module.id,
  selector: 'app-send',
  templateUrl: './send.component.html'
})
export class SendComponent implements OnInit {

    message = new Message('Youssef', 'test message', 'body', 5);
    submitted = false;
    // onSubmit(e) {
    //   console.log(e.value)
    //   e.preventDefault();
    //   this.submitted = true;
    //  // this.message = this.messageForm.value;
    //    this.message = new Message('', '', '',6);
    //    //console.log(this.message);
    //    this.buildForm();
    // }
   
    onSubmit() {
    this.submitted = true;
    this.message = this.messageForm.value;
   console.log(this.message);
  }
   active = true;
    // addMessage() {
    //   this.message = new Message('', '', '',6);
    //   this.buildForm();
    //   this.active = false;
    //   setTimeout(() => this.active = true, 0);
    // }
    messageForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.buildForm();
  }
  buildForm(): void {
    this.messageForm = this.fb.group({
      'to': [this.message.to, [Validators.required,]],
      'subject': [this.message.subject],
      'messageContent':    [this.message.messageContent, Validators.required],
      'thread' : [this.message.thread]
    });
    this.messageForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
       this.onValueChanged(); // (re)set validation messages now
  }
  onValueChanged(data?: any) {
    if (!this.messageForm) { return; }
    const message = this.messageForm;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = message.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }
  formErrors = {
    'to': '',
    'subject': '',
    'messageContent': '',
    'thread': ''
  };
  validationMessages = {
    'to': {
      'required':      'Name is required.'
    },
    'subject': {
      'required': 'subject is required.'
    }
  };

}

