import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, RouterModule, ActivatedRoute, Params } from '@angular/router';
import { ViewService } from '../../../d7services/view/view.service';
import { FlagService } from '../../../d7services/flag/flag.service';
import { UserService } from '../../../d7services/user/user.service';
import { NotificationBarService, NotificationType } from 'angular2-notification-bar';

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',

})
export class LikeComponent implements OnInit {
  @Input() nodeNid;
  @Input() user;
  currentuser;
  isLiked = false;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private viewService: ViewService,
    private userService: UserService,
    private flagService: FlagService,
    private notificationBarService: NotificationBarService,

  ) { }
  ngOnInit() {
    
      /*like start */
      this.flagService.isFlagged(this.nodeNid, this.user.uid, 'like').subscribe(data => {
        this.isLiked = data[0];
      }, err => {
        this.notificationBarService.create({ message: 'Sorry, somthing went wrong, try again later.', type: NotificationType.Error});
        console.log(err);
      })
      /*like end*/

  }

  /* function like */
  likeThis(e: Event) {
    e.preventDefault();
    if (this.isLiked) {
      this.flagService.unflag(this.nodeNid, this.user.uid, 'like').subscribe(response => {
        this.isLiked = false;
      }, err => {
        this.notificationBarService.create({ message: 'Sorry, somthing went wrong, try again later.', type: NotificationType.Error});
        console.log(err);
      });
    } else {
      this.flagService.flag(this.nodeNid, this.user.uid, 'like').subscribe(response => {
        this.isLiked = true;
      }, err => {
        this.notificationBarService.create({ message: 'Sorry, somthing went wrong, try again later.', type: NotificationType.Error});
        console.log(err);
      });
    }
  }
  /* end function like */

}
