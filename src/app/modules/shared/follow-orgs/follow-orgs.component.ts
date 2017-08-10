import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FlagService, UserService } from '../../../core/d7services';

@Component({
  selector: 'app-follow-orgs',
  templateUrl: './follow-orgs.component.html',
})
export class FollowOrgsComponent implements OnInit {

  @Input() nodeNid;
  @Input() user;
  @Output() countNumber = new EventEmitter<number>();
  userId;
  UserLogedIn: boolean = false;
  isFollowed: boolean = false;
  toggleFlag: string;
  ButtonFollow: string = 'Follow';
  countFollowers: number = 0;
  constructor(
    private router: Router,
    private userService: UserService,
    private flagService: FlagService,
  ) { }

  ngOnInit() {
    this.userId = localStorage.getItem('user_id');
    this.userService.isLogedIn().subscribe(data => {
      this.UserLogedIn = data;
      if (this.UserLogedIn) {
        this.flagService
          .isFlagged(this.nodeNid, this.userId, 'follow_comany')
          .subscribe(d => {
            this.isFollowed = d[0];
            this.ButtonFollow = this.isFollowed ? 'Following' : 'Follow';
          });
      }
    });
  }



  followThis() {
    if (!this.UserLogedIn) {
      this.router.navigate(['/access-denied']);
    }
    this.toggleFlag = this.isFollowed ? 'unflag' : 'flag';
    this.flagService
    [this.toggleFlag](this.nodeNid, this.userId, 'follow_comany')
      .subscribe(response => {

        this.isFollowed = !this.isFollowed;
        this.ButtonFollow = this.isFollowed ? 'Following' : 'Follow';
        this.countNumber.emit(this.countFollowers);

      });
  }

}
