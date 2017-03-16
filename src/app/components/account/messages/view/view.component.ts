import { Component, OnInit } from '@angular/core';
import { RouterModule, Router, ActivatedRoute, Params } from '@angular/router';
import { PmService } from '../../../../d7services/pm/pm.service';
import { UserService } from '../../../../d7services/user/user.service';
import { Observable } from 'rxjs/Observable'
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Reply } from './reply';
import {Location} from '@angular/common';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html'
})
export class ViewComponent implements OnInit {
  msg;
  user = [];
  messages = [];
  currentuser;
  messageForm: FormGroup;
  reply: Reply = {
    thread_id:0,
    body: ''
  };
  constructor(
    private route: ActivatedRoute,
    private pm: PmService,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
    private _location: Location,
    
  ) { }

  ngOnInit() {
    this.buildForm();
    this.getThreads();
    var thread_id;
    this. getCurrentUser();
  }
  getThreads(){
    this.route.params
      .switchMap((thread_id) => this.pm.getMessage(thread_id['thread_id']))
      .subscribe(data => {
        this.msg = data;
        this.messages = this.msg.messages
        for (let message of this.messages) {
          let i = 0
          this.userService.getUser(message.author).subscribe(res => {
            Object.assign(message, res);
            //console.log(message.user_photo)
          })
          i++
        }
      });
  }
   getCurrentUser() {
    this.userService.getStatus().subscribe(data => {
      this.currentuser = data;
      //console.log(this.currentuser.user.uid);
      this.userService.getUser(this.currentuser.user.uid).subscribe(res => {
        Object.assign(this.user, res);
          })
    });
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
           body: this.reply.body
        }
        console.log(newComment)
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
}

 