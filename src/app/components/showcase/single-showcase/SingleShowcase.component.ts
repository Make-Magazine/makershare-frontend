import { Component, OnInit, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewService, StatisticsService, NodeService } from '../../../d7services';
import { SortingSet, SortBySortingSet } from '../../../models/ViewsHelper/viewsHelper';
import { LoaderService } from '../../shared/loader/loader.service';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-single-showcases',
  templateUrl: './singleShowcase.component.html',
  providers: [NgbTooltipConfig],
})

export class SinglShowcaseComponent implements OnInit {

  LoggedInUserID: number = +localStorage.getItem('user_id');
  showcaseNid: number;
  showcase = {};
  contentType: number = 2;
  contentCount: number;
  path:string;
  // Content type values
  // 1 = projects
  // 2 = makers


  // Projects/Makers Array
  ShowcaseItems = [];

  // Sorting & Pagination Variables
  pageNumber = 0;

  sort: SortingSet = {
    sort_by: "random_seed",
    sort_order: "DESC"
  };
  DataRetriver = new SortBySortingSet(this.sort, this.viewService);
  hideloadmore: boolean = true;
  // Prevent multiple clicks during request;
  disableLoadMore: boolean = true;
  constructor(
    private viewService: ViewService,
    private loaderService: LoaderService,
    private statisticsService: StatisticsService,
    private config: NgbTooltipConfig,
    private nodeService: NodeService,
    private route: ActivatedRoute,
    private router: Router,

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
    this.viewService.getView('showcase', [['nid', this.showcaseNid]])
      .subscribe(data => {
        this.showcase = data[0];
        this.contentCount = data[0].projects_makers_count;
        if (this.showcase['showcase_type'] == 'Project') {
          this.contentType = 1;
        }
        this.getShowcaseItems();
        if (this.LoggedInUserID != this.showcase['uid']) {
          this.statisticsService.view_record(this.showcaseNid, 'node').subscribe();
        }
      });
  }

  getShowcaseItems() {
    let viewName = 'showcase_makers';
    if (this.showcase['showcase_type'] == 'Project') {
      viewName = 'showcase_projects'
    }
    this.DataRetriver.Sort(viewName, this.pageNumber, this.showcaseNid).subscribe(data => {
      this.ShowcaseItems = this.ShowcaseItems.concat(data);
      this.loadMoreVisibilty(this.ShowcaseItems.length);
      this.disableLoadMore = false;
      this.loaderService.display(false);
    });
  }

  // get more click
  loadmore() {
    if (this.disableLoadMore) return;
    this.disableLoadMore = true;
    this.pageNumber++;
    this.getShowcaseItems();
  }

  // control load more button
  loadMoreVisibilty(count) {
    if (count >= this.contentCount) {
      this.hideloadmore = true;
    } else {
      this.hideloadmore = false;
    }
  }

  sortShowcase(sort) {
    this.loaderService.display(true);
    this.ShowcaseItems = [];
    if (sort == "_none") return;
    this.pageNumber = 0;
    this.sort.sort_order = "DESC";
    if (sort == "field_first_name_value_1" || sort == "random" || sort == "title" || sort == "created_1") {
      this.sort.sort_order = "ASC";
    }
    this.sort.sort_by = sort;
    this.getShowcaseItems();
  }
  navigateShowcaseItem(id:string){
    this.router.navigate(['projects/', this.path, id, this.sort.sort_by, this.sort.sort_order])  
  }

}
