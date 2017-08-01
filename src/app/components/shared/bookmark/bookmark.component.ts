import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FlagService,UserService } from '../../../CORE/d7services';
// import { NotificationBarService, NotificationType } from 'ngx-notification-bar/release';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  providers: [NgbTooltipConfig],

})
export class BookmarkComponent implements OnInit {

  constructor(
    private router: Router,
    private userService: UserService,
    private flagService: FlagService,
    // private notificationBarService: NotificationBarService,
    private config: NgbTooltipConfig,
  ) {
    this.router = router;
    this.config.placement = 'bottom';
    this.config.triggers = 'hover';
  }
  @Input() nodeNid;
  @Input() nodeType: string = '';
  userId;
  checkUserLogin = false;

  isBookmarked;
  bookmark: string;
  toggleFlag:string;
  ngOnInit() {
    this.userId = localStorage.getItem('user_id');
    this.userService.isLogedIn().subscribe(data => {
      this.checkUserLogin = data;
      if (this.nodeNid) {
        this.flagService.isFlagged(this.nodeNid, this.userId, 'node_bookmark').subscribe(data => {
          this.isBookmarked = data[0];
          this.bookmark = (this.isBookmarked? 'Unbookmark this ':'Bookmark this ') + this.nodeType;
        })
      }
    });
  }

  bookmarkThis(e: Event) {
      if (!this.checkUserLogin) {
        this.router.navigate(['/access-denied']);
      } else {
        this.toggleFlag = this.isBookmarked? 'unflag':'flag';
        this.flagService[this.toggleFlag](this.nodeNid, this.userId, 'node_bookmark').subscribe(response => {
            this.isBookmarked = !this.isBookmarked;
            this.bookmark = (this.isBookmarked? 'Unbookmark this ':'Bookmark this ') + this.nodeType;
        });         
      }
  }

}
