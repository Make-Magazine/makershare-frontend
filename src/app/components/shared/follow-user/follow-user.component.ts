import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ViewService, FlagService, UserService } from '../../../d7services';
// import { NotificationBarService, NotificationType } from 'ngx-notification-bar/release';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-follow-user',
  templateUrl: './follow-user.component.html',
})
export class FollowUserComponent implements OnInit {

  constructor(
    // private route: ActivatedRoute,
    private router: Router,
    private viewService: ViewService,
    private userService: UserService,
    private flagService: FlagService,
    // private notificationBarService: NotificationBarService,
    private modalService: NgbModal,
  ) { }
  @Input() targetUid;
  @Output() countNumber = new EventEmitter<number>();
  @Output() countNumberFollowing = new EventEmitter<number>();
  @Output() HideLoadMore = new EventEmitter();
  userId;
  flagToggler: string;
  currentuser;
  CurrentLoggedUserId: number;
  closeResult: string;
  myFollowers = [];
  meFollowing = [];
  hideloadmorefollow = true;
  hideloadmorefollowing = true;
  pages: number = 0;
  isFollowed;
  ButtonFollow: string = 'Follow';
  countFollowers = 0;
  countFollowing = 0;
  ifLoggedIn: boolean

  ngOnInit() {
    this.CurrentLoggedUserId = Number(localStorage.getItem('user_id'));
    this.userId = this.CurrentLoggedUserId;
    this.getFollowingCount();
    this.getFollowersCount();
    this.userService.isLogedIn().subscribe(data => {
      this.ifLoggedIn = data;
      if (this.ifLoggedIn) {
        this.flagService.isFlagged(this.targetUid, this.CurrentLoggedUserId, 'follow_user').subscribe(data => {
          this.isFollowed = data[0];
          this.ButtonFollow = this.isFollowed ? 'Following' : 'Follow';
        });
      }
    });
    this.getWhoFollow();
    this.getWhoFollowing();
  }
  getFollowingCount() {
    this.flagService.flagCount(this.targetUid, 'follow_user').subscribe(response => {
      this.countFollowers = response['count'] ? response['count'] : 0;
      this.countNumber.emit(this.countFollowers);
    });
  }
  getFollowersCount() {
    this.flagService.getCountFollowing(this.targetUid).subscribe(response => {
      this.countFollowing = response[0];
      this.countNumberFollowing.emit(this.countFollowing);
    });
  }

  followThis(e: Event) {
    if (!this.ifLoggedIn) {
      this.router.navigate(['/access-denied']);
    }
    this.flagToggler = this.isFollowed ? 'unflag' : 'flag';
    this.flagService[this.flagToggler](this.targetUid, this.userId, 'follow_user').subscribe(response => {
      this.countFollowers = this.isFollowed ? --this.countFollowers : ++this.countFollowers;
      this.isFollowed = !this.isFollowed;
      this.ButtonFollow = this.isFollowed ? 'Following' : 'Follow';
      this.countNumber.emit(this.countFollowers);
      this.HideLoadMore.emit();
      this.getWhoFollow();
      this.getWhoFollowing();
    });
  }

  openModal(contentfollower) {
    this.modalService.open(contentfollower, { size: 'sm' }).result.then((result) => {
      this.closeResult = 'Closed with: ${result}';
    }, (reason) => {
      this.closeResult = 'Dismissed ${this.getDismissReason(reason)}';
    });
  }

  getWhoFollow() {
    this.viewService.getView('who-follow', [['uid', this.targetUid], ['page', this.pages]]).subscribe(data => {
      this.myFollowers = this.myFollowers.concat(data);
      this.loadMoreVisibilty();
    });
  }
  getWhoFollowing() {
    this.viewService.getView('who-following', [['uid', this.targetUid]]).subscribe(data => {
      this.meFollowing = data;
      //this.loadMoreVisibilty();
    });
  }
  loadMoreFollow() {
    this.pages++;
    this.getWhoFollow();
  }
  loadMoreVisibilty() {
    this.hideloadmorefollow = (this.countFollowers <= this.myFollowers.length) ? true : false;
  }
  loadMoreFollowing() {
    this.pages++;
    this.getWhoFollow();
  }
  loadMoreVisibiltyFollowing() {
    this.hideloadmorefollowing = (this.countFollowing <= this.meFollowing.length) ? true : false;
  }

}
