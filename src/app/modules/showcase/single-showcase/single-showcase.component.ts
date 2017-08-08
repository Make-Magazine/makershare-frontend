import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';
import { NodeService } from '../../../core/d7services/node/node.service';
import { StatisticsService } from '../../../core/d7services/statistics/statistics.service';
import { ViewService } from '../../../core/d7services/view/view.service';
import { SortBySortingSet, SortingSet } from '../../../core/models/makers';
import { FilterOption } from '../../../core/models/molecules';
import { LoaderService } from '../../shared/loader/loader.service';

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
  path: string;

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
  // Prevent multiple clicks during request;
  disableLoadMore: boolean = true;

  // Filter dropdown options
  private filterOptions: FilterOption[] = [
    { label: "Mix 'Em Up", value: 'random_seed' },
    { label: 'Newest', value: 'created' },
    { label: 'Most viewed', value: 'php' },
  ];

  constructor(
    private viewService: ViewService,
    private loaderService: LoaderService,
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
    this.path = this.route.snapshot.params['path'];
    if (this.path) {
      this.nodeService.getIdFromUrl(this.path, 'showcase').subscribe(data => {
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
        this.showcase = data[0];
        this.contentCount = data[0].projects_makers_count;

        if (this.showcase['showcase_type'] == 'Project') {
          this.contentType = 1;
          this.contentTypeStr = 'projects';
        }
        this.getShowcaseItems();
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
        if (this.LoggedInUserID != this.showcase['uid']) {
          this.statisticsService
            .view_record(this.showcaseNid, 'node')
            .subscribe();
        }

        // Build filters
        this.buildFilterDropdown();
      });
  }

  /**
   * buildFilterDropdown
   */
  private buildFilterDropdown() {
    this.filterOptions = this.filterOptions.concat(
      this.contentType === 1
        ? [
            { label: 'Most projects', value: 'php_1' },
            { label: 'Name A-Z', value: 'field_first_name_value_1' },
            { label: 'Name Z-A', value: 'field_first_name_value' },
            { label: 'Most likes', value: "php_2'" },
          ]
        : [
            { label: 'Name A-Z', value: 'title' },
            { label: 'Name Z-A', value: 'title_1' },
            { label: 'Most likes', value: 'count' },
            { label: 'Oldest', value: 'created_1' },
            { label: 'Last updated', value: 'changed' },
          ],
    );
  }

  getCount() {
    this.viewService
      .getView(`showcase_${this.contentTypeStr}_sort`, [
        ['nid', this.showcaseNid],
      ])
      .subscribe(data => {
        this.contentCount = data.length;
      });
  }

  getShowcaseItems() {
    this.getCount();

    this.DataRetriver
      .Sort(
        `showcase_${this.contentTypeStr}`,
        this.pageNumber,
        this.showcaseNid,
      )
      .subscribe(
        data => {
          this.ShowcaseItems = this.ShowcaseItems.concat(data);
          this.loadMoreVisibilty(this.ShowcaseItems.length);
          this.disableLoadMore = false;
          this.loaderService.display(false);
        },
        err => {
          this.loaderService.display(false);
        },
      );
  }

  // get more click
  loadmore() {
    if (this.disableLoadMore) {
      return;
    }
    this.disableLoadMore = true;
    this.pageNumber++;
    this.getShowcaseItems();
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
    this.getShowcaseItems();
  }

  navigateShowcaseItem(id: string) {
    this.router.navigate([
      'projects/',
      this.path,
      id,
      this.sort.sort_by,
      this.sort.sort_order,
    ]);
  }
}
