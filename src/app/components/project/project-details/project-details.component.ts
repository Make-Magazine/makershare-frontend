import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';
import { ViewService } from '../../../d7services/view/view.service';
import { FlagService } from '../../../d7services/flag/flag.service';
import { UserService } from '../../../d7services/user/user.service';
import 'rxjs/Rx';
import { FormGroup, FormControl, FormBuilder, ReactiveFormsModule, FormArray } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
})
export class ProjectDetailsComponent implements OnInit {
  customTitle: string;
  customDescription: string;
  customImage: string; 

  current_active_tab;
  project;
  projectDetails;
  currentuser;
  userLogin;
  isLiked = true;
  isForked;
  isBookmarked;
  Flags = ['like', 'fork', 'node_bookmark'];
  FlagStates = [];
  //showcase-projects-declarations
  projectId;
  showcase = {};
  projectIndex: number = 0;

  projects = [];
  projectdata;
  id: number;

  private sub: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private viewService: ViewService,
    private userService: UserService,
    private flagService: FlagService
  ) {

    this.route.queryParams.subscribe(params => {
      if (params && params["showcase"]) {
        this.projectId = params["projectId"];
        this.showcase = JSON.parse(params["showcase"]);
        this.projectIndex = params["projectIndex"];
        this.projects = JSON.parse(params["projects"]);
      }

    });
  }


  ngOnInit() {
    this.getcurrentuser();
    let userId = localStorage.getItem('user_id');
    this.sub = this.route.params.subscribe(params => {
    this.id = +params['nid']; // (+) converts string 'id' to a number
     /* service to get challenge name if project enter in it */
       // get challenge name and nid for challenge if found from a view
    this.viewService.getView('project_data', [['nid',this.id]]).subscribe(data => {
      this.projectdata = data[0];
      //console.log(this.projectdata);
    }, err => {

    });
        /* end service */

      // dispatch action to load the details here-solve no load issue.

      this.current_active_tab = 'project-story';
      this.route.params
        // (+) converts string 'id' to a number
        .switchMap((nid) => this.viewService.getView('maker_project_api/' + nid['nid']))
        .subscribe(data => {
          this.project = data;
          this.customTitle = this.project.title.value;
          this.customDescription = this.project.field_teaser.value;
          this.customImage = this.project.field_cover_photo.url;
          var i=0;
          for(let resource of this.project.field_resources) {
              var resourceExt = resource.resource_file.split('.').pop();
              this.project.field_resources[i]['extension']=resourceExt;
              var size = parseInt(resource.filesize);
              if (size > 1 && size < 1024){
                this.project.field_resources[i]['filesize']= size + 'KB';
              };
            // else if (size == 1024 && size > 1024) {
            //   var size2 = Math.floor( size / 1000);
            //   this.project.field_resources[i]['filesize']= size2 + 'MB';
            // }
            // console.log(parseInt(resource.filesize));
            // console.log(size2);
            i++

          }
          this.projectDetails = this.project;
          this.projectDetails.nid = this.id;
          //console.log(this.projectDetails);
          
        });
       
      this.currentuser = Number(localStorage.getItem('user_id'));
    });
  }// End ngOnInit

  getProject(event: Event, action: any) {
    event.preventDefault();
    if (action == "back") {
      this.projectIndex--;
    } else if (action == "next") {
      this.projectIndex++;
    }
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "projectId": this.projects[this.projectIndex].nid,
        "showcase": JSON.stringify(this.showcase),
        "projectIndex": this.projectIndex,
        "projects": JSON.stringify(this.projects)
      }
    }
    this.router.navigate(['project/view/', this.projects[this.projectIndex].nid], navigationExtras);
    this.ngOnInit();

  }
  changeProjectTab(NewTab) {
    this.current_active_tab = NewTab;
  }

  forkThis(e: Event) {
    e.preventDefault();
  }

  shareThis(e: Event) {
    e.preventDefault();
  }
  getcurrentuser(){
    this.userService.getStatus().subscribe(data => {
      this.userLogin = data
    });
  }
  challengePage(nid){
        this.router.navigate(['challenges/', nid]);

  }

}
