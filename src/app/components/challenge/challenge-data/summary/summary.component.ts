import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ISorting } from '../../../../models/challenge/sorting';
import { RouterModule, Router } from '@angular/router';
@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html'
})
export class SummaryComponent implements OnInit {
  @Input() projectsChallenge;
  @Input() challenge;
  @Input() awards;
  @Input() projectsCount;
  @Input() hideLoadMore;
  @Input() no;
  @Output() sortType = new EventEmitter<ISorting>();
  @Output() pageNumber = new EventEmitter<number>();
  ActionName: string;
  pages: number = 0;
  sort: ISorting = {
    sort_by: "",
    sort_order: "",
    pageNo: 0
  };
  constructor(private router: Router, ) { }

  ngOnInit() {
    this.ActionName = "Most Recent"

    console.log(this.projectsChallenge);
  }
  /* function to sort challenge Title A-z */
  sortAsc(sort: ISorting) {
    
    this.pages = 0
    this.sort.sort_order = "ASC";
    this.sort.sort_by = "title"
    this.sortType.emit(this.sort);
    this.ActionName = "Title A-z"
  }
  /* end function to sort challenge Title A-z */

  /* function to sort challenge Title Z-A */
  sortDesc(sort: string) {

    this.pages = 0
    this.sort.sort_order = "DESC";
    this.sort.sort_by = "title"
    this.sortType.emit(this.sort);
    this.ActionName = "Title Z-A"
  }
  /* end function to sort challenge Title Z-A */

  /* function to sort challenge Recently */
  mostRecent(sort: string) {

    this.pages = 0
    this.sort.sort_order = "DESC"
    // this.sort.sort_by = "createpageNumberd"
    this.sort.sort_by = "created"

    this.sortType.emit(this.sort);
    this.ActionName = "Most Recent"
  }
  /* end function to sort challenge Recently */

  /* function to sort challenge Oldest */
  oldest(sort: string) {
    this.pages = 0
    this.sort.sort_order = "ASC";
    this.sort.sort_by = "created"
    this.sortType.emit(this.sort);
    this.ActionName = "Oldest"
  }
  /* end function to sort challenge Oldest */

  /* function to sort challenge MostLiked */
  mostLiked(sort: string) {
    this.pages = 0
    this.sort.sort_order = "DESC";
    this.sort.sort_by = "count"
    this.sortType.emit(this.sort);
    this.ActionName = "Most Liked"

  }
  /* end function to sort challenge MostLiked */

  /* function to sort challenge MostForked */
  mostForked(sort: string) {
    this.pages = 0
    this.sort.sort_order = "DESC";
    this.sort.sort_by = "field_total_forks_value";
    this.sortType.emit(this.sort);
    this.ActionName = "Most Forked"
  }
  /* end function to sort challenge MostLiked */

  /* function load more  */
  loadMoreProject() {
    this.pages++;
    this.pageNumber.emit(this.pages);
    console.log(this.pages);
  }
  /* end function load more  */

  /* function to navigate to project details */
  ShowProjectDetails(nid) {
    this.router.navigate(['/project/view', nid]);
  }
  /* end function to navigate to project details */

}
