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
  @Output() countNumber = new EventEmitter<number>();
  userId;
  currentuser;
  isFollowed;
  ButtonFollow;
  countFollowers = 0;
  ngOnInit() {
    this.flagService.flagCount(this.nodeNid, 'follow').subscribe(response => {

      this.countFollowers = response['count'];
      this.countNumber.emit(this.countFollowers);
      // console.log(this.countFollowers);

      //  console.log(this.countFollowers)
    }, err => {
     // this.notificationBarService.create({ message: 'Sorry Error msg, somthing went wrong, try again later.', type: NotificationType.Error });
    });
    this.userId = localStorage.getItem('user_id');

    this.flagService.isFlagged(this.nodeNid, this.userId, 'follow').subscribe(data => {
      this.isFollowed = data[0];

      /* initialize Button Follow*/
      if (this.isFollowed == false) {/* start if  */
        this.ButtonFollow = 'Follow';
      } else {
        this.ButtonFollow = 'UnFollow';
      }/* end else if  */
    }, err => {
      //this.notificationBarService.create({ message: 'Sorry, somthing went wrong, try again later.', type: NotificationType.Error});
    })

  }

  /* function follow */
  followThis(e: Event) {
    e.preventDefault();
    if (this.isFollowed) {
      this.flagService.unflag(this.nodeNid, this.userId, 'follow').subscribe(response => {
        this.isFollowed = false;
        this.ButtonFollow = 'Follow';
        this.countFollowers--;
        this.countNumber.emit(this.countFollowers);

        // console.log(this.countFollowers);
      }, err => {
        //this.notificationBarService.create({ message: 'Sorry, somthing went wrong, try again later.', type: NotificationType.Error});
      });
    } else {
      this.flagService.flag(this.nodeNid, this.userId, 'follow').subscribe(response => {
        this.isFollowed = true;
        this.ButtonFollow = 'UnFollow';
        this.countFollowers++;
        this.countNumber.emit(this.countFollowers);

        // console.log(this.countFollowers['count']);
      }, err => {
        //this.notificationBarService.create({ message: 'Sorry, somthing went wrong, try again later.', type: NotificationType.Error});
      });

    }

  }
  /* end function follow */



}
