import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ISorting } from '../../../../models/challenge/sorting';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',

})
export class FollowersComponent implements OnInit {
  @Input() followers;
  @Input() currentUser;
  @Input() Ids;
  @Input() challenge;
  @Input() hideloadmorefollower;
  @Output() pageNumber = new EventEmitter<number>();
  uids = [];
  challengeNid;
  pagesFollower: number = 0;
  sort: ISorting = {
    sort_by: "",
    sort_order: "",
    pageNo: 0
  };
  constructor() { }

  ngOnInit() {
    console.log(this.followers);
    
  }
  loadMoreFollower() {
    this.pagesFollower++;
    this.pageNumber.emit(this.pagesFollower);
  }

}
