import { Component, OnInit, Input } from '@angular/core';
import { PmService } from '../../../../d7services/pm/pm.service'
import { RouterModule, Router ,ActivatedRoute, Params} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Http,Headers, RequestOptions, Response} from '@angular/http';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { Message }  from '../sending/message';


@Component({
  moduleId:  module.id,
  selector: 'app-inbox',
  templateUrl: './inbox.component.html'
})
export class InboxComponent implements OnInit {

  //messageObj = new Message('',  '', '', 6);
    submitted = false;
    messageObj:Message ={
    subject: '',
    body : '',
    recipients: '',
    thread_id : 6
  };
  onSubmit() {
    if(this.messageForm.valid){
    // console.log(this.messageObj);
      this.pm.sendMessage(this.messageObj).subscribe((messageObj:Message) => {
      this.submitted=true;
    //this.messageObj=messageObj
      },
      err =>{
      console.log("error");
      console.log(err);
      })
    }
  }
  active = true;
  messageForm: FormGroup;
  messages=[]
  message
  msg=[]
  num:any
  num2:any
  num3:any
  

  constructor( private route: ActivatedRoute,
    private fb: FormBuilder,
    private pm: PmService,
    private router: Router,
    private http: Http,
  ) { }

  ngOnInit(): void  {
     this.getMessages();
     this.buildForm();
  }
   buildForm(): void {
      this.messageForm = this.fb.group({
      'subject'    :  [this.messageObj.subject, Validators.required],
      'body'       :  [this.messageObj.body, Validators.required],
      'recipients' :  [this.messageObj.recipients, Validators.required],
      'thread_id'  :  [this.messageObj.thread_id]
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
    'body' : ''
  };
  validationMessages = {
    'recipients': {
    'required':      'Name is required.',
    },
    'subject': {
    'required':      'Subject is required.',
    },
    'body': {
    'required':      'Message Body is required.',
    },

    
  };

  //get all messages
getMessages() {
      this.pm.getMessages().subscribe(data => {
      this.messages=data;
      console.log(this.messages);
      //convert message to array
      let msg_arr = [];
      for(let key in this.messages){
        if(typeof(this.messages[key])=='object' && this.messages.hasOwnProperty(key)){
          msg_arr.push(this.messages[key]);
        }
        this.msg= msg_arr
      }
      for (var _i = 0; _i < this.msg.length; _i++) {
        this.num = this.msg[_i];
        console.log(this.num.last_updated+ new Date())
        let num_arr = [];
          for(let key in this.num){
            if(typeof(this.num[key])=='object' && this.num.hasOwnProperty(key)){
              num_arr.push(this.num[key]);
            }
            this.num2= num_arr
            for(var i = 0; i < this.num2.length; i++) {
            this.num3 = this.num2[i];
            // for (let user in this.num3){
            //   console.log(this.num3[user].uid);
            //   // if(user['uid'] !== 'currentUser'){

            //   // }

            // } 
            //console.log(this.num3)
            }
        }
    }
    })
    // if(localStorage.getItem('currentUser')){}
    
}
 
 deleteMessage(){
    // console.log(this.msg[0].thread_id)
     this.route.params
    .switchMap((mid) => this.pm.deleteMessage(this.msg[0].thread_id))
    .subscribe(data =>{
     this.msg=data;
     //console.log(this.msg);
    });
   }
 messageData = {
        subject: '',
        body : '',
        recipients: '',
        thread_id : ''
};
//   {
//         "subject": "message3",
//         "body" : "tesst create",
//         "recipients": "16",
//         "thread_id" : "5"
//   }

   sendMess(){
      this.pm.sendMessage(this.messageData).subscribe(res => {
      res.subscribe(res => {
        this.messageData = res;
      console.log('message sent');
      }
      )
     })
      console.log(this.messageData);
   }
  
}