import { Component, OnInit } from '@angular/core';
import { RouterModule, Router, ActivatedRoute, Params } from '@angular/router';
import { PmService } from '../../../../d7services/pm/pm.service';
import { UserService } from '../../../../d7services/user/user.service';
import { Observable } from 'rxjs/Observable'
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Reply } from './reply';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html'
})
export class ViewComponent implements OnInit {
  msg;
  user = [];
  messages = [];
  messageForm: FormGroup;
  reply: Reply = {
    thread_id:0,
    body: '',
  };
  constructor(
    private route: ActivatedRoute,
    private pm: PmService,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
    
  ) { }

  ngOnInit() {
    this.buildForm();
    this.getThreads();
    var thread_id;
  }
  getThreads(){
    this.route.params
      .switchMap((thread_id) => this.pm.getMessage(thread_id['thread_id']))
      .subscribe(data => {
        this.msg = data;
        //console.log(this.msg.participants)
        this.messages = this.msg.messages
        for (let message of this.messages) {
          let i = 0
          this.userService.getUser(message.author).subscribe(res => {
            Object.assign(message, res);
          })
          i++
        }
      });
  }
  
  onSubmit(e) {
    e.preventDefault();
    this.getThreads();
    if (this.messageForm.valid) {
       this.reply.thread_id = this.msg.pmtid;
       this.reply.body = this.messageForm.value.body;
      this.pm.sendMessage(this.reply).subscribe(res => {
        var newComment = {
           thread_id: this.reply.thread_id,
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
}

 