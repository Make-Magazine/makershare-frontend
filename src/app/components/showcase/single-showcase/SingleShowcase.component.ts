import { Component, OnInit, } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { ViewService, FlagService, StatisticsService, NodeService } from '../../../d7services';
import { SortingSet, SortBySortingSet, ViewProperty } from '../../../models/ViewsHelper/viewsHelper';
import { LoaderService } from '../../shared/loader/loader.service';
import { MetaService } from '@nglibs/meta';
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
  // Content type values
  // 1 = projects
  // 2 = makers
  

  // Cotnent Types Arrays
  Makers = [];
  Projects = [];

  // Sorting & Pagination Variables
  pageNumber = 0;
  
  sort: SortingSet = {
    sort_by: "random",
    sort_order: "ASC"
  };
  DataRetriver = new SortBySortingSet(this.sort, this.viewService);
  numLikes;
  hideloadmore:boolean = true;
  constructor(
    private viewService: ViewService,
    private loaderService: LoaderService,
    private meta: MetaService,
    private flagService: FlagService,
    private statisticsService: StatisticsService,
    private config: NgbTooltipConfig,
    private nodeService: NodeService,
    private route: ActivatedRoute,
    private router: Router,

  ) {
    config.placement = 'bottom';
    config.triggers = 'hover';
    
  }



  ngOnInit() {
    // show spinner
    this.loaderService.display(true);
    let path = this.route.snapshot.params['path'];
    if (path) {
      this.nodeService.getIdFromUrl(path, 'showcase').subscribe(data => {
        this.showcaseNid = data[0];
        // console.log(this.showcaseNid);
        // load the showcase details (without projects or makers)
        if(this.showcaseNid){
          this.getShowcase();
          this.getCount();    
        }else {
          // there is no id return from the API, so go to 404
          this.router.navigateByUrl('404');
        }
        
        //load showcase projects count
        //this.getMakersCount();
        //load showcaseprojects data
        //this.getshowCaseMakers();
        
      });
    }
  }



  getShowcase() {
    // load the showcase data
    this.viewService.getView('showcase', [['nid', this.showcaseNid]])
      .subscribe(data => {
        this.showcase = data[0];
        this.contentType = this.showcase['showcase_type'];
        //this.customDescription = this.showcase['description']
        //this.meta.setTitle(`${this.showcase['showcase_name']} | Maker Share`);
        //this.meta.setTag('og:image', this.showcase['cover_photo']);
        //this.meta.setTag('og:description', this.showcase['description']);

        // get showcase related content according to contentType value
        
        if(this.contentType == 1){
          // this case for projects
          this.getProjects();
        }else if(this.contentType == 2) {
          // this case for makers
          this.getMakers();
        }


        // statistics, record page view hit for visitors
        if (this.LoggedInUserID != this.showcase['uid']) {
            this.statisticsService.view_record(this.showcaseNid, 'node').subscribe();
        }

      });
  }

  getCount(){
    if(this.contentType == 1){
      // this case for projects
    this.viewService.getView('showcase_projects_sort',[['nid',this.showcaseNid]]).subscribe(data => {
      this.contentCount = data.length;
    });
     
    }else if(this.contentType == 2) {
      // this case for makers
    this.viewService.getView('showcase_makers_sort',[['nid',this.showcaseNid]]).subscribe(data => {
      this.contentCount = data.length;
    });
      
    }
  }
  getProjects() {
    this.DataRetriver.Sort('showcase_projects', this.pageNumber,this.showcaseNid).subscribe(data => {
      // console.log("PROJECTS");
      // console.log(data);
      this.Projects = this.Projects.concat(data);
      this.loadMoreVisibilty(this.Projects.length);
      // hide spinner
      this.loaderService.display(false);
    }, err => {
      // hide spinner
      this.loaderService.display(false);
    });

  }


  getMakers() {
    this.DataRetriver.Sort('showcase_makers', this.pageNumber,this.showcaseNid).subscribe(data => {
      // console.log("MAKERS");
      // console.log(data);
      this.Makers = this.Makers.concat(data);
      this.loadMoreVisibilty(this.Makers.length);      
      // hide spinner
      this.loaderService.display(false);
    }, err => {
      // hide spinner
      this.loaderService.display(false);
    });
  }


  // get more click
  // loadmore() {
  //   this.pages++;
  //   this.getshowCaseMakers();
  // }

  // control load more button
  loadMoreVisibilty(count) {
    if (count >= this.contentCount) {

      this.hideloadmore = true;

    } else {
      this.hideloadmore = false;
    }

  }

  // goHome() {
  //   this.router.navigate(['']);
  // }


  // goToProfile(nid) {
  //   this.router.navigate(['user']);
  // }

  // getMakersCount() {
  //   this.route.params
  //   this.viewService.getView('maker_count_showcases/' + this.idFromUrl)
  //     .subscribe(data => {
  //       this.makersCount = data;
  //       console.log (this.makersCount);
  //     });

  // }
  // ShowcasePojectNav(nid, snid) {
  //   this.router.navigate(['/makers/project2/', snid, this.sort_by, this.sort_order, nid]);
  //   // this.showcaseNid.emit(this.route.params['value'].nid)
  // }

  countLikes(){
    this.flagService.flagCount(this.showcaseNid,'like').subscribe(res=>{
      if(res['count']>0){
      this.numLikes = res;
      }else{
         this.numLikes=0;
      }

    })
  }
  likesCounter(count) {
    this.numLikes = count;
  }

}
