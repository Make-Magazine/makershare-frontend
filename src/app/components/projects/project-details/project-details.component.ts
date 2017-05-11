import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';
import { ViewService } from '../../../d7services/view/view.service';
import { FlagService } from '../../../d7services/flag/flag.service';
import { UserService } from '../../../d7services/user/user.service';
import { NodeService } from '../../../d7services/node/node.service';
import 'rxjs/Rx';
import { FormGroup, FormControl, FormBuilder, ReactiveFormsModule, FormArray } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoaderService } from '../../shared/loader/loader.service';
import { MetaService } from '@nglibs/meta';
import { StatisticsService } from '../../../d7services/statistics/statistics.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
})
export class ProjectDetailsComponent implements OnInit {
  
  current_active_tab = 'project-story';
  changeProjectTab(NewTab) {
    this.current_active_tab = NewTab;
  }
  project;
  projectDetails;
  currentuser;
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
    private nodeService: NodeService,
    private flagService: FlagService,
    private loaderService: LoaderService,
    private readonly meta: MetaService,
    private statisticsService: StatisticsService,
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
    this.loaderService.display(true);

    this.sub = this.route.params.subscribe(params => {
      let path = params['path'];
      this.nodeService.getIdFromUrl(path,'project').subscribe(ids=>{
        this.id = ids[0];
        if(!ids[0])
          this.id = path;
        this.viewService.getView('project_data', [['nid', this.id]]).subscribe(data => {
        this.projectdata = data[0];
      }, err => {});
      /* end service */
      // dispatch action to load the details here-solve no load issue.
      this.route.params
        // (+) converts string 'id' to a number
        this.viewService.getView('maker_project_api/' + this.id)
        .subscribe(data => {
          this.project = data;
          var i = 0;
          if (this.project.field_resources) {
            for (let resource of this.project.field_resources) {
              var resourceExt = resource.resource_file.split('.').pop();
              this.project.field_resources[i]['extension'] = resourceExt;
              i++
            }
          }
          this.meta.setTitle(`Maker Share | ${this.project.title.value}`);
          this.meta.setTag('og:image', this.project.field_cover_photo.url);
          this.meta.setTag('og:description', this.project.field_teaser.value);
          this.projectDetails = this.project;
          this.projectDetails.nid = this.id;
          this.loaderService.display(false);
          // statistics
          if(this.currentuser != this.project.uid){
            this.statisticsService.view_record(this.project.nid, 'node').subscribe();
          }
        }, err => {
          this.loaderService.display(false);
        });
        this.currentuser = Number(localStorage.getItem('user_id'));
      });
      /* service to get challenge name if project enter in it */
      // get challenge name and nid for challenge if found from a view      
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
    this.router.navigate(['projects', this.projects[this.projectIndex].nid], navigationExtras);
    this.ngOnInit();
  }
  

  forkThis(e: Event) {
    e.preventDefault();
  }

  shareThis(e: Event) {
    e.preventDefault();
  }
  challengePage(nid) {
    this.router.navigate(['challenges/', nid]);

  }

}
