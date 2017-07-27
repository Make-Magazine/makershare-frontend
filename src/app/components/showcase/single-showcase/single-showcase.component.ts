import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ViewService,
  FlagService,
  StatisticsService,
  NodeService,
} from '../../../d7services';
import {
  SortingSet,
  SortBySortingSet,
} from '../../../models/ViewsHelper/viewsHelper';
import { LoaderService } from '../../shared/loader/loader.service';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-single-showcases',
  templateUrl: './single-showcase.component.html',
  providers: [NgbTooltipConfig],
})
export class SingleShowcaseComponent implements OnInit {
  LoggedInUserID: number = +localStorage.getItem('user_id');
  showcaseNid: number;
  showcase = {};
  contentType: number = 2; // 1 = projects, 2 = makers
  contentTypeStr: string = 'makers';
  contentCount: number;

  // Cotnent Types Arrays
  ShowcaseItems = [];

  // Sorting & Pagination Variables
  pageNumber = 0;

  sort: SortingSet = {
    sort_by: 'random_seed',
    sort_order: 'DESC',
  };
  DataRetriver = new SortBySortingSet(this.sort, this.viewService);
  numLikes;
  hideloadmore: boolean = true;
  constructor(
    private viewService: ViewService,
    private loaderService: LoaderService,
    private flagService: FlagService,
    private statisticsService: StatisticsService,
    private config: NgbTooltipConfig,
    private nodeService: NodeService,
    private route: ActivatedRoute,
    private router: Router,
    private meta: Meta,
    private title: Title,
  ) {
    this.config.placement = 'bottom';
    this.config.triggers = 'hover';
  }
  ngOnInit() {
    this.loaderService.display(true);
    const path = this.route.snapshot.params['path'];
    if (path) {
      this.nodeService.getIdFromUrl(path, 'showcase').subscribe(data => {
        this.showcaseNid = data[0];
        // load the showcase details (without projects or makers)
        if (this.showcaseNid) {
          this.getShowcase();
        } else {
          this.router.navigateByUrl('404');
        }
      });
    }
  }

  getShowcase() {
    // load the showcase data
    this.viewService
      .getView('showcase', [['nid', this.showcaseNid]])
      .subscribe(data => {

        console.log('getShowcase', data);

        this.showcase = data[0];
        if (this.showcase['showcase_type'] == 'Project') {
          this.contentType = 1;
          this.contentTypeStr = 'projects';
        }
        this.title.setTitle(this.showcase['showcase_name'] + ' | Maker Share');
        this.meta.addTags([
          {
            name: 'og:description',
            content: this.showcase['description'],
          },
          {
            name: 'og:image',
            content: this.showcase['cover_photo'],
          },
        ]);
        // this.customDescription = this.showcase['description']
        // this.meta.setTitle(`${this.showcase['showcase_name']} | Maker Share`);
        // this.meta.setTag('og:image', this.showcase['cover_photo']);
        // this.meta.setTag('og:description', this.showcase['description']);

        // Get count & items
        this.getCount();
        this.getItems();

        // statistics, record page view hit for visitors
        if (this.LoggedInUserID != this.showcase['uid']) {
          this.statisticsService
            .view_record(this.showcaseNid, 'node')
            .subscribe();
        }
      });
  }

  getCount() {
    this.viewService
      .getView(`showcase_${this.contentTypeStr}_sort`, [['nid', this.showcaseNid]])
      .subscribe(data => {
        this.contentCount = data.length;
      });
  }

  getItems() {
    this.DataRetriver
      .Sort(`showcase_${this.contentTypeStr}`, this.pageNumber, this.showcaseNid)
      .subscribe(
        data => {
          this.ShowcaseItems = this.ShowcaseItems.concat(data);
          this.loadMoreVisibilty(this.ShowcaseItems.length);
          this.loaderService.display(false);
        },
        err => {
          this.loaderService.display(false);
        },
      );
  }

  // get more click
  loadmore() {
    this.pageNumber++;
    this.getItems();
  }

  // control load more button
  loadMoreVisibilty(count) {
    this.hideloadmore = count >= this.contentCount;
  }

  sortShowcase(sort) {
    this.loaderService.display(true);
    this.ShowcaseItems = [];
    if (sort == '_none') {
      return;
    }
    this.pageNumber = 0;
    this.sort.sort_order = 'DESC';
    if (
      sort == 'field_first_name_value_1' ||
      sort == 'random' ||
      sort == 'title' ||
      sort == 'created_1'
    ) {
      this.sort.sort_order = 'ASC';
    }
    this.sort.sort_by = sort;
    this.getItems();
  }

  countLikes() {
    this.flagService.flagCount(this.showcaseNid, 'like').subscribe(res => {
      this.numLikes = res['count'] > 0 ? res : 0;
    });
  }

  likesCounter(count) {
    this.numLikes = count;
  }
}
