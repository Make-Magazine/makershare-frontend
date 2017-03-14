import { Component, OnInit } from '@angular/core';
import { RouterModule, Router, ActivatedRoute, Params } from '@angular/router';
import { PmService } from '../../../../d7services/pm/pm.service';
import { UserService } from '../../../../d7services/user/user.service';
import { Observable } from 'rxjs/Observable'


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
}

