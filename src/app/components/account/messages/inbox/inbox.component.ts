import { Component, OnInit, Input } from '@angular/core';
import { PmService } from '../../../../d7services/pm/pm.service'
import { RouterModule, Router ,ActivatedRoute, Params} from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html'
})
export class InboxComponent implements OnInit {
  messages=[]
  message
  msg=[]

  constructor( private route: ActivatedRoute,
    private pm: PmService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getMessages();
  }
getMessages() {
      this.pm.getMessages().subscribe(data => {
      this.messages=data;
      let msg_arr = [];
      for(let key in this.messages){
        if(typeof(this.messages[key])=='object' && this.messages.hasOwnProperty(key)){
          msg_arr.push(this.messages[key]);
        }
        this.msg= msg_arr
      }
    console.log(this.msg[0].thread_id)
    })
    
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
}
