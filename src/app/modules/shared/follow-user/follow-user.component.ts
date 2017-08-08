import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ViewService, FlagService, UserService } from '../../../core/d7services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-follow-user',
  templateUrl: './follow-user.component.html',
})
export class FollowUserComponent implements OnInit {

  constructor(
    private router: Router,
    private viewService: ViewService,
    private userService: UserService,
    private flagService: FlagService,
    private modalService: NgbModal,
  ) { }
  @Input() targetUid;
  @Output() countNumber = new EventEmitter<number>();
  @Output() countNumberFollowing = new EventEmitter<number>();
  @Output() HideLoadMore = new EventEmitter();
  flagToggler: string;
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
    this.getWhoFollow(false);
    this.getWhoFollowing(false);
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
    this.flagService[this.flagToggler](this.targetUid, this.CurrentLoggedUserId, 'follow_user').subscribe(response => {
      this.countFollowers = this.isFollowed ? --this.countFollowers : ++this.countFollowers;
      this.isFollowed = !this.isFollowed;
      this.ButtonFollow = this.isFollowed ? 'Following' : 'Follow';
      this.countNumber.emit(this.countFollowers);
      this.HideLoadMore.emit();
      this.getWhoFollow(false);
      this.getWhoFollowing(false);
    });
  }

  openModal(contentfollower) {
    this.modalService.open(contentfollower, { size: 'sm' }).result.then((result) => {
      this.closeResult = 'Closed with: ${result}';
    }, (reason) => {
      this.closeResult = 'Dismissed ${this.getDismissReason(reason)}';
    });
  }

  getWhoFollow(more?: boolean) {
    if (more) this.pages++;
    this.viewService.getView('who-follow', [['uid', this.targetUid], ['page', this.pages]]).subscribe(data => {
      this.myFollowers = this.myFollowers.concat(data);
      this.hideloadmorefollow = (this.countFollowers <= this.myFollowers.length) ? true : false;
    });
  }
  getWhoFollowing(more?: boolean) {
    if (more) this.pages++;
    this.viewService.getView('who-following', [['uid', this.targetUid], ['page', this.pages]]).subscribe(data => {
      this.meFollowing = this.meFollowing.concat(data);
      this.hideloadmorefollowing = (this.countFollowing <= this.meFollowing.length) ? true : false;
    });
  }
  goToProfile(path: string) {
    if (window.location.href.indexOf('portfolio') != -1) {
      window.location.href = '/portfolio/' + path;
    } else {
      this.router.navigate(['/portfolio/', path]);
    }
  }
}
