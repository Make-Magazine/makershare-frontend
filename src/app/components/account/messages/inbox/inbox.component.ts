import { Component, OnInit, Input } from '@angular/core';
import { PmService } from '../../../../d7services/pm/pm.service'
import { RouterModule, Router ,ActivatedRoute, Params} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Http,Headers, RequestOptions, Response} from '@angular/http';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html'
})
export class InboxComponent implements OnInit {

  form=FormGroup
  messages=[]
  message
  msg=[]
  num:any
  num2:any
  num3:any
  

  constructor( private route: ActivatedRoute,
    private pm: PmService,
    private router: Router,
    private http: Http,
  ) { }

  ngOnInit() {
    this.getMessages();
  }
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
