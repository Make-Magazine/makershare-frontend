import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';
import { ViewService, FlagService, StatisticsService, NodeService } from '../../../d7services';
import { ISorting } from '../../../models/challenge/sorting';
import { LoaderService } from '../../shared/loader/loader.service';
import { MetaService } from '@nglibs/meta';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-single-showcases',
  templateUrl: './singleShowcase.component.html',
  providers: [NgbTooltipConfig],
})
export class SinglShowcaseComponent implements OnInit {
  customDescription: string
  showcase;
  view = 'grid';
  idFromUrl: number;
  path: string;
  profile = {};
  makers = [];
  hideloadmore = false;
  // loadFlag = false;
  makersCount = 0;
  sortData: ISorting;
  sort_order: string;
  sort_by: string;
  limit = 9;
  showcasenumber;
  showcaseNid;
  userId;
  numLikes;
  toolTips = {
    'like': 'Like these ideas',
    'bookmark': 'Bookmark this maker',
    'share': 'Share this maker',
  };
  pages: number = 0;
  page_arg;

  ActionName = "Mix 'Em Up";
  sort: ISorting = {
    sort_by: "random",
    sort_order: "ASC",
    pageNo: 0
  };

  // @Output() showcaseNid = new EventEmitter();
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private viewService: ViewService,
    private loaderService: LoaderService,
    private meta: MetaService,
    private flagService: FlagService,
    private statisticsService: StatisticsService,
    private config: NgbTooltipConfig,
    private nodeService: NodeService,


  ) {
    config.placement = 'bottom';
    config.triggers = 'hover';
  }

  ngOnInit() {
    // show spinner
    this.loaderService.display(true);
    this.route.params

    this.path = this.route.snapshot.params['path'];
    if (this.path) {
      this.nodeService.getIdFromUrl(this.path, 'showcase').subscribe(data => {
        this.idFromUrl = data[0];
        this.getShowcase();

        //load showcase projects count
        this.getMakersCount();
        //load showcaseprojects data
        this.getshowCaseMakers();
        //  this.showcaseNid = this.route.params['value'].nid
        this.userId = localStorage.getItem('user_id');
      });
    }
  }
  getshowCaseMakers() {
    // if (this.loadFlag) {
    //   this.limit += 9;
    // }

    if (this.pages >= 0) {
      this.page_arg = ['page', this.pages];
    }

    this.route.params
    this.viewService.getView('showcase_makers', [['page', this.pages],['nid', this.idFromUrl], ['sort_by', this.sort.sort_by], ['sort_order', this.sort.sort_order]])
      .subscribe(data => {
        this.makers = this.makers.concat(data);
        this.loadMoreVisibilty();
        // hide spinner
        this.loaderService.display(false);
      });
    // this.loadFlag = false;
  }
  // get more click
  loadmore() {
    this.pages++;
    this.getshowCaseMakers();
  }

  // control load more button
  loadMoreVisibilty() {
    // get the challenges array count
    if (this.makers.length >= this.makersCount) {

      this.hideloadmore = true;

    } else {
      this.hideloadmore = false;
    }

  }

  randomized() {
    this.makers = [];
    this.pages = 0
    this.sort.sort_order = "ASC";
    this.sort.sort_by = "random"
    this.ActionName = "Mix 'Em Up"
    this.getshowCaseMakers();

  }

  mostProjects() {
    this.makers = [];
    this.pages = 0
    this.sort.sort_order = "DESC";
    this.sort.sort_by = "php_1"
    this.ActionName = "Most projects"
    this.getshowCaseMakers();

  }

  mostRecent() {
    this.makers = [];
    this.pages = 0;
    this.sort.sort_order = "DESC";
    this.sort.sort_by = "created";
    this.ActionName = "Newest";
    // this.getCountProject();
    this.getshowCaseMakers();

  }

  sortAsc() {
    this.makers = [];
    this.pages = 0;
    this.sort.sort_order = "ASC";
    this.sort.sort_by = "field_first_name_value_1";
    this.ActionName = "Title A-Z";
    this.getshowCaseMakers();
  }
  sortDesc() {
    this.makers = [];
    this.pages = 0;
    this.sort.sort_order = "DESC";
    this.sort.sort_by = "field_first_name_value";
    this.ActionName = "Title Z-A";
    this.getshowCaseMakers();

  }
  mostLiked() {
    this.makers = [];
    this.pages = 0;
    this.sort.sort_order = "DESC";
    this.sort.sort_by = "php_2";
    this.ActionName = "Most likes";
    this.getshowCaseMakers();

  }
  mostViewed() {
    this.makers = [];
    this.pages = 0;
    this.sort.sort_order = "DESC";
    this.sort.sort_by = "php";
    this.ActionName = "Most views";
    this.getshowCaseMakers();

  }

  goHome() {
    this.router.navigate(['']);
  }


  goToProfile(nid) {
    this.router.navigate(['user']);
  }

  getShowcase() {
    // load the showcase data
    this.route.params
    this.viewService.getView('showcase', [['nid', this.idFromUrl]])
      .subscribe(data => {
        this.showcase = data[0];
        if (data.length == 0) {
          this.router.navigate(['**']);
        }
        this.customDescription = this.showcase['description']
        this.meta.setTitle(`Maker Share | ${this.showcase['showcase_name']}`);
        this.meta.setTag('og:image', this.showcase['cover_photo']);
        this.meta.setTag('og:description', this.showcase['description']);

        // statistics
        if (this.userId != this.showcase.uid) {
          let showcaseNid = data[0].nid;
          this.statisticsService.view_record(showcaseNid, 'node').subscribe();
        }

      });
  }

  // getSortType(event: any) {
  //   this.sortData = event;
  //   this.sort_by = this.sortData.sort_by;
  //   this.sort_order = this.sortData.sort_order;
  //   this.getshowCaseMakers();
  // }

  getMakersCount() {
    this.route.params
    this.viewService.getView('maker_count_showcases/' + this.idFromUrl)
      .subscribe(data => {
        this.makersCount = data;
      });

  }
  // ShowcasePojectNav(nid, snid) {
  //   this.router.navigate(['/makers/project2/', snid, this.sort_by, this.sort_order, nid]);
  //   // this.showcaseNid.emit(this.route.params['value'].nid)
  // }

  // countLikes(){
  //   this.flagService.flagCount(this.showcaseNid,'like').subscribe(res=>{
  //     if(res['count']>0){
  //     this.numLikes = res;
  //     }else{
  //        this.numLikes=0;
  //     }

  //   })
  // }
  likesCounter(count) {
    this.numLikes = count;
  }

}
