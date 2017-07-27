import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FlagService, UserService } from '../../../d7services';
// import { NotificationBarService, NotificationType } from 'ngx-notification-bar/release';

@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
})
export class FollowComponent implements OnInit {
  constructor(
    private router: Router,
    private userService: UserService,
    private flagService: FlagService,
  ) { }
  @Input() nodeNid;
  @Input() user;
  @Output() countNumber = new EventEmitter<number>();
  userId;
  UserLogedIn: boolean = false;
  isFollowed: boolean = false;
  toggleFlag: string;
  ButtonFollow: string = 'Follow';
  countFollowers: number = 0;
  ngOnInit() {
    this.countAllFollowers();
    this.userId = localStorage.getItem('user_id');
    this.userService.isLogedIn().subscribe(data => {
      this.UserLogedIn = data;
      if (this.UserLogedIn) {
        this.flagService.isFlagged(this.nodeNid, this.userId, 'follow').subscribe(data => {
          this.isFollowed = data[0];
          this.ButtonFollow = this.isFollowed ? 'Following' : 'Follow';
        })
      }
    });
  }
  countAllFollowers() {
    this.flagService.flagCount(this.nodeNid, 'follow').subscribe(response => {
      this.countFollowers = response['count'] ? response['count'] : 0;
      this.countNumber.emit(this.countFollowers);
    });
  }
  followThis() {
    if (!this.UserLogedIn) this.router.navigate(['/access-denied']);
    this.toggleFlag = this.isFollowed ? 'unflag' : 'flag';
    this.flagService[this.toggleFlag](this.nodeNid, this.userId, 'follow').subscribe(response => {
      this.countFollowers = this.isFollowed ? --this.countFollowers : ++this.countFollowers;
      this.isFollowed = !this.isFollowed;
      this.ButtonFollow = this.isFollowed ? 'Following' : 'Follow';
      this.countNumber.emit(this.countFollowers);
    });
  }
}