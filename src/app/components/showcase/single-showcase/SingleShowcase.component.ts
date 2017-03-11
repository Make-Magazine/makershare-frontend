import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';
import { ViewService } from '../../../d7services/view/view.service';
import { ISorting } from '../../../models/challenge/sorting';

@Component({
  selector: 'app-single-showcases',
  templateUrl: './singleShowcase.component.html',
})
export class SinglShowcaseComponent implements OnInit {

  showcase = {uid:""};
  profile = {};
  projects = [];
  hideloadmore=false;
  loadFlag=false;
  projectsCount=0;
  sortData:ISorting;
  sort_order:string;
  sort_by:string;
  limit=3;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private viewService: ViewService,
  ) { }

  ngOnInit() {

    this.sort_order = "DESC";
    this.sort_by = "changed";
    this.getShowcase();
    //load showcase projects count
    this.getProjectsCount();
    //load showcaseprojects data
   this.getshowCaseProjects();

  }
  getshowCaseProjects(){
    if(this.loadFlag){
    this.limit+=3;
  }

    this.route.params
    //next line and limit in component is to be added after back-end update
   // .switchMap((nid) => this.viewService.getView('showcase_projects',[['nid',nid['nid']],['sort_by',this.sort_by],['sort_order',this.sort_order]]))
    .switchMap((nid) => this.viewService.getView('views/showcase_projects',[['nid',nid['nid']],['display_id','services_1'],['limit',this.limit],['sort_by',this.sort_by],['sort_order',this.sort_order]]))
    .subscribe(data =>{
      this.projects=data;
      this.loadMoreVisibilty();
    });
    this.loadFlag=false;
  }
  // get more click
loadmore(){
 this.loadFlag = true;
 this.getshowCaseProjects();
}

// control load more button
loadMoreVisibilty(){
 // get the challenges array count
 if(this.projects.length >= this.projectsCount){

    this.hideloadmore= true;

 }else{
    this.hideloadmore= false;
 }

}

   goHome(){
     this.router.navigate(['']);
   }
   public goToProject(nid, projectIndex){
     debugger
     let navigationExtras: NavigationExtras = {
            queryParams: {
                "projectId": nid,
                "showcase": JSON.stringify(this.showcase),
                "projectIndex": projectIndex,
                "projects":JSON.stringify(this.projects)
            }
     }
     this.router.navigate(['project/view/', nid], navigationExtras);
   }

   goToProfile(nid){
     this.router.navigate(['user']);
   }
   getProfile(uid){
     //load profile data

    this.viewService.getView('maker_profile_search_data',[['uid',uid],])
    .subscribe(data =>{
      this.profile = data[0];
    });
   }

   getShowcase(){
     // load the showcase data
     this.route.params
    .switchMap((nid) => this.viewService.getView('showcase',[['nid',nid['nid']]]))
    .subscribe(data =>{
       this.showcase = data[0];
    this.getProfile(this.showcase.uid);
    });
   }

    getSortType(event:any){
    this.sortData = event;
    this.sort_by=this.sortData.sort_by;
    this.sort_order = this.sortData.sort_order;
    this.getshowCaseProjects();
}

getProjectsCount(){
  this.route.params
 .switchMap((nid) => this.viewService.getView('showcase_projects_count',[['nid',nid['nid']]]))
 .subscribe(data =>{
    this.projectsCount = data[0].count;
 });

}


  }
