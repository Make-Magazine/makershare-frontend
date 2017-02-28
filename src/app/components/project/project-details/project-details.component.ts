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
      console.log(this.projectDetails.nid)
      //console.log(this.project.field_cover_photo.url)
    });
    this.userService.getStatus().subscribe(data => {
      this.currentuser = data;
    })
   // this.flagService.isFlagged(this.projectDetails.nid,this.currentuser.user.uid,like).subscribe(data =>{});
//    this.flagService.isFlagged().subscribe(data =>{});
  }// End ngOnInit
  forkThis(e: Event){
    e.preventDefault();
  }
  likeThis(e: Event){
    e.preventDefault();
  }
  bookmarkThis(e: Event){
    e.preventDefault();
  }
  shareThis(e: Event){
    e.preventDefault();
  }
}
