import { Component, OnInit,Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ViewService } from '../../../d7services/view/view.service';
import { FlagService } from '../../../d7services/flag/flag.service';
import { UserService } from '../../../d7services/user/user.service';
import 'rxjs/Rx';


@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
})
export class ProjectDetailsComponent implements OnInit {
  current_active_tab;
  project;
  projectDetails;
  currentuser;
  isLiked=true;
  isForked;
  isBookmarked;
  Flags = ['like','fork','node_bookmark'];
  FlagStates = [] ;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private viewService: ViewService,
    private userService: UserService,
    private flagService: FlagService
  ) { }
  
  ngOnInit() {
    this.current_active_tab = 'project-story';
    this.route.params
    // (+) converts string 'id' to a number
    .switchMap((nid) => this.viewService.getView('maker_project_api/'+nid['nid']))
    .subscribe(data =>{
      //console.log(data)
      this.project = data;
      this.projectDetails = data;
      //console.log(this.project)
      //console.log(this.projectDetails)
      this.projectDetails.nid = this.route.params['value'].nid;
      //console.log(this.route.params['value'].nid)
        this.flagService.isFlagged(this.projectDetails.nid,this.currentuser.user.uid,'node_bookmark').subscribe(data =>{
        this.isBookmarked = data[0];
        //console.log(this.isBookmarked)
      });
      this.flagService.isFlagged(this.projectDetails.nid,this.currentuser.user.uid,'like').subscribe(data =>{
        this.isLiked = data[0];
      });
       
       //console.log(this.FlagStates[0])
      
      
      //console.log(this.project.field_cover_photo.url)
    });
    this.userService.getStatus().subscribe(data => {
      this.currentuser = data;
      //console.log(this.currentuser.user.uid)
    });
   
//this.flagService.isFlagged().subscribe(data =>{});
  }// End ngOnInit
  changeProjectTab(NewTab){
    this.current_active_tab = NewTab;
  }
  likeThis(e: Event){
    e.preventDefault();
    if(this.isLiked){
      this.flagService.unflag(this.projectDetails.nid,this.currentuser.user.uid,'like').subscribe(response => {
        this.isLiked = !response[0];
      });
      this.isLiked= !this.isLiked;
    }else {
      this.flagService.flag(this.projectDetails.nid,this.currentuser.user.uid,'like').subscribe(response => {
        this.isLiked = response[0];
      });

      this.isLiked= !this.isLiked;
    }
    
    // this.flagService.flag(this.projectDetails.nid,this.currentuser.user.uid,'like');
  }
  forkThis(e: Event){
    e.preventDefault();
    //console.log('forked')
  }
  
  bookmarkThis(e: Event){
    e.preventDefault();
     if(this.isBookmarked){
      this.flagService.unflag(this.projectDetails.nid,this.currentuser.user.uid,'node_bookmark').subscribe(response => {
        this.isBookmarked = !response[0];
      });
      this.isBookmarked= !this.isBookmarked;
    }else {
      this.flagService.flag(this.projectDetails.nid,this.currentuser.user.uid,'node_bookmark').subscribe(response => {
        this.isBookmarked = response[0];
      });
    }
  }
  shareThis(e: Event){
    e.preventDefault();
    //console.log('shared')
  }
}
