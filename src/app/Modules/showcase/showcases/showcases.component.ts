import { Component, OnInit } from '@angular/core';
import { ViewService } from './../../../CORE/d7services';
import { SortBySortingSet, SortingSet } from '../../../CORE/Models/makers/sorting';
import { LoaderService } from '../../shared/loader/loader.service';
import { Meta, Title } from '@angular/platform-browser';
import { Singleton } from '../../../CORE';

@Component({
  selector: 'app-showcases',
  templateUrl: './showcases.component.html',
})
export class ShowcasesComponent implements OnInit {
  showcases = [];
  showcaseCount: number = 0;
  hideloadmore: boolean = false;
  pageNo: number = 0;
  CurrentSort: SortingSet = {
    sort_by: 'changed',
    sort_order: 'DESC',
  };
  SortBy: SortBySortingSet = new SortBySortingSet(
    this.CurrentSort,
    this.viewService,
  );

  constructor(
    private viewService: ViewService,
    private loaderService: LoaderService,
    private meta: Meta,
    private title: Title,
  ) {}

  ngOnInit() {
    this.title.setTitle('Showcases | Maker Share');
    this.meta.addTags([
      {
        name: 'og:description',
        content:
          'Maker Showcases are collections of projects and makers curated by our Community Managers.',
      },
      {
        name: 'og:image',
        content:
          Singleton.Settings.AppURL +
            '/assets/images/logos/maker-share-logo-clr@2x-100.jpg.jpg',
      },
    ]);
    this.showcasesCount();
    this.getShowCases();
  }

  getShowCases() {
    // show spinner
    this.loaderService.display(true);
    if (this.pageNo == 0) {
      this.showcases = [];
    }
    // load the showcases
    this.SortBy.Sort('showcases', this.pageNo).subscribe(data => {
      this.showcases = this.showcases.concat(data);
      this.loadMoreVisibilty();
      // hide spinner
      this.loaderService.display(false);

    }, err => {
      // hide spinner
      this.loaderService.display(false);
    });
  }
  // get more click
  loadmore() {
    this.pageNo++;
    this.getShowCases();
  }
  // control load more button
  loadMoreVisibilty() {
    // get the challenges array count
    if (this.showcases.length >= this.showcaseCount) {
      this.hideloadmore = true;
    } else {
      this.hideloadmore = false;
    }
  }
  SortShowcases(sort) {
    if (sort == '_none') {
      return;
    }
    this.CurrentSort.sort_order = 'DESC';
    if (sort == 'changed_1' || sort == 'title') {
      this.CurrentSort.sort_order = 'ASC';
    }
    this.CurrentSort.sort_by = sort;
    this.pageNo = 0;
    this.getShowCases();
  }
  // get the count of showcases
  showcasesCount() {
    this.viewService.getView('maker_count_showcases', []).subscribe(data => {
      this.showcaseCount = data[0];
    });
  }
}