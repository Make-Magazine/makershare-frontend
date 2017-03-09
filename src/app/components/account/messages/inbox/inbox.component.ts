import { Component, OnInit, Input, } from '@angular/core';
import { PmService } from '../../../../d7services/pm/pm.service'
import { RouterModule, Router ,ActivatedRoute, Params} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Http,Headers, RequestOptions, Response} from '@angular/http';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { Message }  from '../sending/message';
import { ViewService } from '../../../../d7services/view/view.service';


@Component({
  moduleId:  module.id,
  selector: 'app-inbox',
  templateUrl: './inbox.component.html'
})
export class InboxComponent implements OnInit {
    reciverUser = [];
    SelectedUser=[];
   //messageObj = new Message([],  '', '');
    submitted = false;
    messageObj: Message = {
      recipients: [],
      subject: '',
      body: '',
    };
    
  onSubmit(e) {
    e.preventDefault();
    if(this.messageForm.valid){
       console.log(this.messageForm.value);
       this.messageObj.recipients = this.messageForm.value.recipients;
       this.messageObj.body = this.messageForm.value.body;
       this.messageObj.subject = this.messageForm.value.subject;
      this.pm.sendMessage(this.messageObj).subscribe(res => {
      //this.submitted=true;
        //this.messageObj=messageObj
        console.log(res)
      },
      err =>{
        console.log("error");
        console.log(err);
      });
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
     private viewService: ViewService ,
  ) { }

  ngOnInit(): void  {
     this.getMessages();
     this.buildForm();
  }
   buildForm(): void {
      this.messageForm = this.fb.group({
      'recipients' :  ['', Validators.required],
      'subject'    :  ['', Validators.required],
      'body'       :  ['', Validators.required]
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
    'required':'Name is required.',
    },
    'subject': {
    'required':'Subject is required.',
    },
    'body': {
    'required':'Message Body is required.',
    },

    
  };
  SetMember(uid,index){
    this.reciverUser[index] = [];
    this.viewService.getView('maker_profile_card_data',[['uid',uid],]).subscribe(data => {
      this.SelectedUser[index] = data[0];
    });
    this.messageForm.controls['Team']['controls'][index]['controls'].uid.setValue(uid);
  }
  RefreshUsers(index,value){
  this.reciverUser[index] = [];
  if(value.length > 1){
    this.viewService.getView('maker_profile_search_data',[['search', value]]).subscribe(data => {
      this.reciverUser[index] = data;
      var TempUsers = [];
      for(let index in data){
        var found = false;
        let element = data[index]; 
        this.SelectedUser.forEach(addeduser => {
          if(addeduser.uid === element.uid){
            found = true;
            return;
          }
        });
          if (!found){
            TempUsers.push(element);
          }
      }
      this.reciverUser[index] = TempUsers;
      //console.log(this.reciverUser[index])
    });
  }
}

  //get all messages
getMessages() {
      this.pm.getMessages().subscribe(data => {
      this.messages=data;
      //console.log(this.messages);
      //convert message to array
      let msg_arr = [];
      for(let key in this.messages){
        if(typeof(this.messages[key])=='object' && this.messages.hasOwnProperty(key)){
          msg_arr.push(this.messages[key]);
        }
        this.msg= msg_arr
       // console.log(this.msg)
      }
      for (var _i = 0; _i < this.msg.length; _i++) {
        this.num = this.msg[_i];
           
var dateObjectName = new Date(this.num.last_updated);
console.log(dateObjectName)



        let num_arr = [];
          for(let key in this.num){
            if(typeof(this.num[key])=='object' && this.num.hasOwnProperty(key)){
              num_arr.push(this.num[key]);
            }
            this.num2= num_arr
            for(var i = 0; i < this.num2.length; i++) {
            this.num3 = this.num2[i];
            //console.log(this.num3)
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
}

  // 24 hours ago , 12 day ago 
  //   function JSClock() {
  //   var time = new Date();
  //   var hour = time.getHours();
  //   var minute = time.getMinutes();
  //   var second = time.getSeconds();
  //   var temp = '' + ((hour > 12) ? hour - 12 : hour);
  //   if (hour == 0)
  //     temp = '12';
  //   temp += ((minute < 10) ? ':0' : ':') + minute;
  //   temp += ((second < 10) ? ':0' : ':') + second;
  //   temp += (hour >= 12) ? ' P.M.' : ' A.M.';
  //   return temp;
  // }