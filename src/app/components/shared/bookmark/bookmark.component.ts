import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, RouterModule, ActivatedRoute, Params } from '@angular/router';
import { ViewService } from '../../../d7services/view/view.service';
import { FlagService } from '../../../d7services/flag/flag.service';
import { UserService } from '../../../d7services/user/user.service';
import { NotificationBarService, NotificationType } from 'angular2-notification-bar';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',

})
export class BookmarkComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router,
    private viewService: ViewService,
    private userService: UserService,
    private flagService: FlagService,
    private notificationBarService: NotificationBarService,

  ) { }
  @Input() nodeNid;
  @Input() user;
  userId;
  currentuser;
  isBookmarked

  ngOnInit() {
    this.userId = localStorage.getItem('user_id');

      /*bookmark start */
      this.flagService.isFlagged(this.nodeNid, this.userId, 'node_bookmark').subscribe(data => {
        this.isBookmarked = data[0];
      }, err => {
        this.notificationBarService.create({ message: 'Sorry, somthing went wrong, try again later.', type: NotificationType.Error});
      })
      /*bookmark end*/
  }

  /* function bookmark */
  bookmarkThis(e: Event) {
    e.preventDefault();
    if (this.isBookmarked) {
      this.flagService.unflag(this.nodeNid, this.userId, 'node_bookmark').subscribe(response => {
        this.isBookmarked = false;
      }, err => {
        this.notificationBarService.create({ message: 'Sorry, somthing went wrong, try again later.', type: NotificationType.Error});
      });
    } else {
      this.flagService.flag(this.nodeNid, this.userId, 'node_bookmark').subscribe(response => {
        this.isBookmarked = true;
      }, err => {
        this.notificationBarService.create({ message: 'Sorry, somthing went wrong, try again later.', type: NotificationType.Error});
      });
    }
  }
  /* end function bookmark */

}
