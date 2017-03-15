import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, RouterModule, ActivatedRoute, Params } from '@angular/router';
import { ViewService } from '../../../d7services/view/view.service';
import { FlagService } from '../../../d7services/flag/flag.service';
import { UserService } from '../../../d7services/user/user.service';
import { NotificationBarService, NotificationType } from 'angular2-notification-bar';

@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
})
export class FollowComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router,
    private viewService: ViewService,
    private userService: UserService,
    private flagService: FlagService,
    private notificationBarService: NotificationBarService,

  ) { }
  @Input() nodeNid;
  @Input() user;
  currentuser;
  isFollowed;
  ButtonFollow;
  ngOnInit() {
    this.flagService.isFlagged(this.nodeNid, this.user.uid, 'follow').subscribe(data => {
      this.isFollowed = data[0];

      /* initialize Button Follow*/
      if (this.isFollowed == false) {/* start if  */
        this.ButtonFollow = 'Follow';
      } else {
        this.ButtonFollow = 'UnFollow';
      }/* end else if  */
    }, err => {
        this.notificationBarService.create({ message: 'Sorry, somthing went wrong, try again later.', type: NotificationType.Error});
      })


  }

  /* function follow */
  followThis(e: Event) {
    e.preventDefault();
    if (this.isFollowed) {
      this.flagService.unflag(this.nodeNid, this.user.uid, 'follow').subscribe(response => {
        this.isFollowed = false;
        this.ButtonFollow = 'Follow';
      }, err => {
        this.notificationBarService.create({ message: 'Sorry, somthing went wrong, try again later.', type: NotificationType.Error});
      });
    } else {
      this.flagService.flag(this.nodeNid, this.user.uid, 'follow').subscribe(response => {
        this.isFollowed = true;
        this.ButtonFollow = 'UnFollow';
      }, err => {
        this.notificationBarService.create({ message: 'Sorry, somthing went wrong, try again later.', type: NotificationType.Error});
      });

    }

  }
  /* end function follow */



}
