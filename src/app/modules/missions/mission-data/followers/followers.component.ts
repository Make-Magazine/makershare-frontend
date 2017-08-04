import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ISorting } from 'app/CORE/models/mission/sorting';

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
  pagesFollower: number = 0;
  sort: ISorting = {
    sort_by: '',
    sort_order: '',
    pageNo: 0,
  };

  constructor() {}

  ngOnInit() {}
  /* function load more followers */
  loadMoreFollower() {
    this.pagesFollower++;
    this.pageNumber.emit(this.pagesFollower);
  }
  /* end function load more followers */
}
