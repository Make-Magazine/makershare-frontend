import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, RouterModule, ActivatedRoute, Params } from '@angular/router';
import { ViewService } from '../../../d7services/view/view.service';
import { FlagService } from '../../../d7services/flag/flag.service';
import { UserService } from '../../../d7services/user/user.service';
import { NotificationBarService, NotificationType } from 'angular2-notification-bar/release';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  providers: [NgbTooltipConfig],

})
export class BookmarkComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private viewService: ViewService,
    private userService: UserService,
    private flagService: FlagService,
    private notificationBarService: NotificationBarService,
    private config: NgbTooltipConfig,
  ) {
    this.router = router;
    config.placement = 'bottom';
    config.triggers = 'hover';
  }
  @Input() nodeNid;
  @Input() user;
  @Input() nodeType: string = '';
  userId;
  checkUserLogin = false;

  currentuser;
  isBookmarked = false;
  bookmark: string;

  ngOnInit() {
    this.userId = localStorage.getItem('user_id');
    this.userId = localStorage.getItem('user_id');
    this.userService.isLogedIn().subscribe(data => {
      this.checkUserLogin = data;
      if (data == false) { } else {
        /*bookmark start */
        this.flagService.isFlagged(this.nodeNid, this.userId, 'node_bookmark').subscribe(data => {
          this.isBookmarked = data[0];
          if (this.isBookmarked) {this.bookmark = "Unbookmark this " + this.nodeType;}
          else { this.bookmark = "Bookmark this " + this.nodeType;}
        }, err => {
          this.notificationBarService.create({ message: 'Sorry, somthing went wrong, try again later.', type: NotificationType.Error});
        })
      }//end else
    });//end userservice isLogedIn
    /*bookmark end*/
  }

  /* function bookmark */
  bookmarkThis(e: Event) {
    this.userService.isLogedIn().subscribe(data => {
      this.checkUserLogin = data;
      if (data == false) {
        //localStorage.setItem('redirectUrl', this.router.url);
        this.router.navigate(['/access-denied']);
      }
      e.preventDefault();
      if (this.isBookmarked) {
        this.flagService.unflag(this.nodeNid, this.userId, 'node_bookmark').subscribe(response => {
          this.isBookmarked = false;
          this.bookmark = "Bookmark this " + this.nodeType;
        }, err => {
          //this.notificationBarService.create({ message: 'Sorry, somthing went wrong, try again later.', type: NotificationType.Error});
        });
      } else {
        this.flagService.flag(this.nodeNid, this.userId, 'node_bookmark').subscribe(response => {
          this.isBookmarked = true;
          this.bookmark = "Unbookmark this " + this.nodeType;
        }, err => {
          //this.notificationBarService.create({ message: 'Sorry, somthing went wrong, try again later.', type: NotificationType.Error});
        });
      }
    });//end if check user login
  }
  /* end function bookmark */

}
