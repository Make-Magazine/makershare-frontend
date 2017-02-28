import { Component, OnInit,Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ViewService } from '../../../d7services/view/view.service';
import { FlagService } from '../../../d7services/flag/flag.service';
import { UserService } from '../../../d7services/user/user.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
})
export class ProjectDetailsComponent implements OnInit {

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
    this.route.params
    // (+) converts string 'id' to a number
    .switchMap((nid) => this.viewService.getView('maker_project_api/'+nid['nid']))
    .subscribe(data =>{
      //console.log(data)
      this.project = data;
      this.projectDetails = data;
      this.projectDetails.nid = this.route.params['value'].nid;
      console.log(this.route.params['value'].nid)
      //console.log(this.project.field_cover_photo.url)
    });
    var i =0;
      for(let flag of this.Flags){
        this.flagService.isFlagged(this.projectDetails.nid,this.currentuser.user.uid,flag).subscribe(data =>{
        this.FlagStates[i] = data[0];
        i++
      });
       console.log(this.FlagStates[0])
       if(this.FlagStates){
        this.isLiked = this.FlagStates[0];
        this.isBookmarked = this.FlagStates[2];
       }
      }
    this.userService.getStatus().subscribe(data => {
      this.currentuser = data;
      console.log(this.currentuser.user.uid)
    });
   
//    this.flagService.isFlagged().subscribe(data =>{});
  }// End ngOnInit
  forkThis(e: Event){
    e.preventDefault();
    console.log('forked')
  }
  likeThis(e: Event){
    e.preventDefault();
    this.isLiked = !this.isLiked;
    // this.flagService.flag(this.projectDetails.nid,this.currentuser.user.uid,'like');
  }
  bookmarkThis(e: Event){
    e.preventDefault();
    this.isBookmarked = !this.isBookmarked;
    console.log('bookmark')
  }
  shareThis(e: Event){
    e.preventDefault();
    console.log('shared')
  }
}
