import { Component, OnInit } from '@angular/core';
import { ViewService } from '../../../../d7services/view/view.service'
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html'
})
export class InboxComponent implements OnInit {
  messages=[]
  msg=[]

  constructor(
    private viewService: ViewService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getMessage();
  }
getMessage() {
      this.viewService.getView('privatemsg',[]).subscribe(data => {
      this.messages=data;
      let msg_arr = [];
      for(let key in this.messages){
        if(typeof(this.messages[key])=='object' && this.messages.hasOwnProperty(key)){
          msg_arr.push(this.messages[key]);
        }
        this.msg= msg_arr
      }
      
      console.log(this.msg)
    })
  }
}
