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
  sortData:ISorting;
  sort_order:string;
  sort_by:string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private viewService: ViewService,
  ) { }

  ngOnInit() {

    this.sort_order = "DESC";
    this.sort_by = "changed";
    this.getShowcase();
    console.log('nid');
    console.log(this.route.snapshot.data[0]);
    //load showcaseprojects data
   this.getshowCaseProjects();
      
  }
  getshowCaseProjects(){
    this.route.params
    //next line and limit in component is to be added after back-end update
   // .switchMap((nid) => this.viewService.getView('showcase_projects',[['nid',nid['nid']],['sort_by',this.sort_by],['sort_order',this.sort_order]]))
    .switchMap((nid) => this.viewService.getView('showcase_projects',[['nid',nid['nid']]]))
    .subscribe(data =>{
      this.projects=data;
    });
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
      console.log("profile");
      console.log(this.profile);
    });
   }

   getShowcase(){
     // load the showcase data
     this.route.params
    .switchMap((nid) => this.viewService.getView('showcase',[['nid',nid['nid']]]))
    .subscribe(data =>{
       this.showcase = data[0];
       console.log("showcase");
       console.log(this.showcase);
    this.getProfile(this.showcase.uid);
    });
   }

    getSortType(event:any){
    this.sortData = event;
    this.sort_by=this.sortData.sort_by;
    this.sort_order = this.sortData.sort_order;
    this.getshowCaseProjects();
    //console.log(this.getProjects);
}
   

  }


