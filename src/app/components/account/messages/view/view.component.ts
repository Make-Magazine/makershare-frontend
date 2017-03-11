import { Component, OnInit } from '@angular/core';
import { RouterModule, Router ,ActivatedRoute, Params} from '@angular/router';
import { PmService } from '../../../../d7services/pm/pm.service';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html'
})
export class ViewComponent implements OnInit {
  message
  msg

  constructor(private route: ActivatedRoute,
  private pm: PmService,
    private router: Router,) { }

  ngOnInit() {
    //this.getMessage();
  }
  // getMessage(){
  //    this.pm.getMessage(56).subscribe(data=>{
  //    this.message=data;
  //    console.log(this.message.messages[0].author)
  //   //  for(var i = 0; i < this.message.length; i++) {
  //   //         this.msg = this.message[i];
  //   //         console.log(this.msg)
  //   //  }
     
  //    })
  // }

}
