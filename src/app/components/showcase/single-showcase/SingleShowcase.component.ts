import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ViewService } from '../../../d7services/view/view.service';

@Component({
  selector: 'app-single-showcases',
  templateUrl: './singleShowcase.component.html',
})
export class SinglShowcaseComponent implements OnInit {

  showcase = {uid:""};
  profile = {};
  projects = [];
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private viewService: ViewService,
  ) { }

  ngOnInit() {
    
    this.getShowcase();
    
    //load showcaseprojects data
   this.route.params
    .switchMap((nid) => this.viewService.getView('showcase_projects',[['nid',nid['nid']]]))
    .subscribe(data =>{
      this.projects=data;
    });
      
  }

   goHome(){
     this.router.navigate(['']);
   }
   goToProject(nid){
     this.router.navigate(['project/view/', nid]);
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

   

  }


