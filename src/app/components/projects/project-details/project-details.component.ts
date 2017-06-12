import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';
import { ViewService, FlagService, UserService, NodeService, StatisticsService } from '../../../d7services';
import 'rxjs/Rx';
import { FormGroup, FormControl, FormBuilder, ReactiveFormsModule, FormArray } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoaderService } from '../../shared/loader/loader.service';
import { MetaService } from '@nglibs/meta';

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
      this.nodeService.getIdFromUrl(path, 'project').subscribe(ids => {
        this.id = ids[0];
        this.currentuser = Number(localStorage.getItem('user_id'));
        console.log(this.id);
        if(!this.id){
          this.router.navigateByUrl('**');
          this.loaderService.display(false);
        }

        this.viewService.getView('views/project_visibility', [['nid', this.id]]).subscribe(data => {
          console.log(data[0]);
          if(data[0].status == 0 && this.currentuser != data[0].uid){
            this.router.navigateByUrl('access-restricted');
            this.loaderService.display(false);
          }else {
            this.viewService.getView('maker_project_api/' + this.id)
              .subscribe(data => {
                console.log(data);
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
                if (this.currentuser != this.project.uid) {
                  this.statisticsService.view_record(this.project.nid, 'node').subscribe();
                }
              }, err => {
                this.router.navigate(['/projects']);
                this.loaderService.display(false);
              });

          }

            


        }, err => {});
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
