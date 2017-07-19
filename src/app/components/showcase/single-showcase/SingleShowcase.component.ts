import { Component, OnInit, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewService, FlagService, StatisticsService, NodeService } from '../../../d7services';
import { SortingSet, SortBySortingSet } from '../../../models/ViewsHelper/viewsHelper';
import { LoaderService } from '../../shared/loader/loader.service';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';
import { Meta, Title } from '@angular/platform-browser';


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
  // Content type values
  // 1 = projects
  // 2 = makers


  // Cotnent Types Arrays
  ShowcaseItems = [];
  // Makers = [];
  // Projects = [];

  // Sorting & Pagination Variables
  pageNumber = 0;

  sort: SortingSet = {
    sort_by: "random_seed",
    sort_order: "DESC"
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
    private title: Title

  ) {
    this.config.placement = 'bottom';
    this.config.triggers = 'hover';
  }
  ngOnInit() {
    this.loaderService.display(true);
    let path = this.route.snapshot.params['path'];
    if (path) {
      this.nodeService.getIdFromUrl(path, 'showcase').subscribe(data => {
        this.showcaseNid = data[0];
        // load the showcase details (without projects or makers)
        if (this.showcaseNid) {
          this.getShowcase();
          //this.sortShowcase('_none')
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
        console.log(data[0])
        if(this.showcase['showcase_type'] == 'Project'){
          this.contentType = 1
        }
        this.title.setTitle(this.showcase['showcase_name'] + ' | Maker Share');
        this.meta.addTags([
          {
            name: 'og:description', content: this.showcase['description']
          },
          {
            name: 'og:image', content: this.showcase['cover_photo']
          }
        ])
        //this.customDescription = this.showcase['description']
        //this.meta.setTitle(`${this.showcase['showcase_name']} | Maker Share`);
        //this.meta.setTag('og:image', this.showcase['cover_photo']);
        //this.meta.setTag('og:description', this.showcase['description']);

        // get showcase related content according to contentType value

        if (this.contentType == 1) {
          // this case for projects
          this.getCount();
          this.getProjects();
        } else if (this.contentType == 2) {
          // this case for makers
          this.getCount();
          this.getMakers();
        }


        // statistics, record page view hit for visitors
        if (this.LoggedInUserID != this.showcase['uid']) {
          this.statisticsService.view_record(this.showcaseNid, 'node').subscribe();
        }

      });
  }

  getCount() {
    if (this.contentType == 1) {
      // this case for projects
      this.viewService.getView('showcase_projects_sort', [['nid', this.showcaseNid]]).subscribe(data => {
        this.contentCount = data.length;
      });

    } else if (this.contentType == 2) {
      // this case for makers
      this.viewService.getView('showcase_makers_sort', [['nid', this.showcaseNid]]).subscribe(data => {
        this.contentCount = data.length;
      });

    }
  }
  getProjects() {
    this.DataRetriver.Sort('showcase_projects', this.pageNumber, this.showcaseNid).subscribe(data => {
      this.ShowcaseItems = this.ShowcaseItems.concat(data);
      this.loadMoreVisibilty(this.ShowcaseItems.length);
      this.loaderService.display(false);
    }, err => {
      this.loaderService.display(false);
    });

  }


  getMakers() {
    this.DataRetriver.Sort('showcase_makers', this.pageNumber, this.showcaseNid).subscribe(data => {
      this.ShowcaseItems = this.ShowcaseItems.concat(data);
      this.loadMoreVisibilty(this.ShowcaseItems.length);
      this.loaderService.display(false);
    }, err => {
      this.loaderService.display(false);
    });
  }


  // get more click
  loadmore() {
    this.pageNumber++;
    if (this.contentType == 1) {
      // this case for projects
      this.getProjects();
    } else if (this.contentType == 2) {
      // this case for makers
      this.getMakers();
    }
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
    if (this.contentType == 1) {
      this.getProjects();
    } else if (this.contentType == 2) {
      this.getMakers();
    }
  }
  countLikes() {
    this.flagService.flagCount(this.showcaseNid, 'like').subscribe(res => {
      if (res['count'] > 0) {
        this.numLikes = res;
      } else {
        this.numLikes = 0;
      }
    })
  }
  likesCounter(count) {
    this.numLikes = count;
  }
}
