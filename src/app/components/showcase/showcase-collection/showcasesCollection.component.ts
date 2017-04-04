import { Component, OnInit, Input } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { ViewService } from './../../../d7services/view/view.service';
import { ISorting } from '../../../models/challenge/sorting';
import { LoaderService } from '../../shared/loader/loader.service';

@Component({
  selector: 'app-showcases',
  templateUrl: './showcasesCollection.component.html',
})
export class ShowcasesCollectionComponent implements OnInit {
  showcases = [];
  showcaseCount = 0;
  hideloadmore = false;
  loadFlag = false;
  sortData: ISorting;
  sort_order: string;
  sort_by: string;
  limit = 4;

  @Input() sortType: ISorting;

  constructor(
    private viewService: ViewService,
    private router: Router,
    private loaderService: LoaderService,
  ) { }

  ngOnInit() {
    this.sort_order = "DESC";
    this.sort_by = "changed";
    this.showcasesCount();
    this.getShowCases();

  }

  ShowSingleShowcase(nid) {
    this.router.navigate(['/showcases', nid]);
  }

  getShowCases() {
    // show spinner
    this.loaderService.display(true);

    // load the showcases
    if (this.loadFlag) {
      this.limit += 3;
    }
    this.viewService.getView('views/showcases', [['display_id', 'services_1'], ['limit', this.limit], ['sort_by', this.sort_by], ['sort_order', this.sort_order]]).subscribe(data => {
      this.showcases = data;
      this.loadMoreVisibilty();
      // hide spinner
      this.loaderService.display(false);

    }, err => {
      // hide spinner
      this.loaderService.display(false);      
    });
    this.loadFlag = false;
  }

  // get more click
  loadmore() {
    this.loadFlag = true;
    this.getShowCases();
  }
  // control load more button
  loadMoreVisibilty() {
    // get the challenges array count
    if (this.showcases.length >= this.showcaseCount) {
      //  console.log("flage");
      this.hideloadmore = true;
      // console.log(this.hideloadmore);
    } else {
      this.hideloadmore = false;
    }

  }


  getSortType(event: any) {
    this.sortData = event;
    this.sort_by = this.sortData.sort_by;
    this.sort_order = this.sortData.sort_order;
    this.getShowCases();
    //console.log(this.getProjects);
  }


  // get the count of showcases
  showcasesCount() {
    this.viewService.getView('maker_count_showcases', []).subscribe(data => {
      this.showcaseCount = data[0];
      // console.log(this.showcaseCount);
    });
  }


}
