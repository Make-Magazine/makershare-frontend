import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';
import { ViewService,FlagService,StatisticsService,NodeService } from '../../../d7services';
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
  idFromUrl:number;
  path: string;
  profile = {};
  projects = [];
  hideloadmore = false;
  loadFlag = false;
  projectsCount = 0;
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
    'bookmark': 'Bookmark this project',
    'share': 'Share this project',
  }

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
      this.nodeService.getIdFromUrl(this.path,'showcase').subscribe(data => {
        this.idFromUrl = data[0];
          this.getShowcase();
      

    
     this.sort_order = "DESC";
     this.sort_by = "changed";
   
     //load showcase projects count
     this.getProjectsCount();
     //load showcaseprojects data
    this.getshowCaseProjects();
   //  this.showcaseNid = this.route.params['value'].nid
    this.userId = localStorage.getItem('user_id');
  });  
  }
  }
  getshowCaseProjects() {
    if (this.loadFlag) {
      this.limit += 9;
    }

    this.route.params
      this.viewService.getView('views/showcase_projects', [['nid', this.idFromUrl], ['display_id', 'services_1'], ['limit', this.limit], ['sort_by', this.sort_by], ['sort_order', this.sort_order]])
      .subscribe(data => {
        this.projects = data;
        this.loadMoreVisibilty();
        // hide spinner
        this.loaderService.display(false);
      });
    this.loadFlag = false;
  }
  // get more click
  loadmore() {
    this.loadFlag = true;
    this.getshowCaseProjects();
  }

  // control load more button
  loadMoreVisibilty() {
    // get the challenges array count
    if (this.projects.length >= this.projectsCount) {

      this.hideloadmore = true;

    } else {
      this.hideloadmore = false;
    }

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
      this.viewService.getView('showcase', [['nid',this.idFromUrl]])
      .subscribe(data => {
        this.showcase = data[0];
        if(data.length == 0) {
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

  getSortType(event: any) {
    this.sortData = event;
    this.sort_by = this.sortData.sort_by;
    this.sort_order = this.sortData.sort_order;
    this.getshowCaseProjects();
  }

  getProjectsCount() {
    this.route.params
      this.viewService.getView('showcase_projects_nid', [['nid', this.idFromUrl]])
      .subscribe(data => {
        this.projectsCount = data.length;
      //  console.log(data.length);
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
    //console.log(this.numLikes)

  }

}
