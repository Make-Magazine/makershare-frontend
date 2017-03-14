import { Component, OnInit } from '@angular/core';
import { RouterModule, Router, ActivatedRoute, Params } from '@angular/router';
import { PmService } from '../../../../d7services/pm/pm.service';
import { UserService } from '../../../../d7services/user/user.service';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html'
})
export class ViewComponent implements OnInit {
  msg;
  user = [];
  messages = [];
  constructor(private route: ActivatedRoute,
    private pm: PmService,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    var thread_id;
    this.route.params
      .switchMap((thread_id) => this.pm.getMessage(thread_id['thread_id']))
      .subscribe(data => {
        this.msg = data;
        for (var i = 0; i < this.msg.messages.length; i++) {
          this.messages[i] = this.msg.messages[i]
          //console.log(this.messages[i].body)
          this.userService.getUser(this.messages[i].author).subscribe(res => {
            this.messages[i] = res;
            console.log(this.messages[i])
          })
        }

      });

  }
}
