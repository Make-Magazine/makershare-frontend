import { Component, OnInit, } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { ViewService, NodeService, StatisticsService, MainService } from '../../../d7services';
import 'rxjs/Rx';
import { LoaderService } from '../../shared/loader/loader.service';
import { Auth } from '../../../auth0/auth.service';
import * as globals from '../../../d7services/globals';
import { Meta, Title } from '@angular/platform-browser';


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
  showcaseName: string = null;
  showcase = {};
  projectIndex: number = 0;
  previousProject: string = null;
  nextProject: string = null;
  projects = [];
  projectdata;
  id: number;
  Manager: boolean = false;

  private sub: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private viewService: ViewService,
    private nodeService: NodeService,
    private loaderService: LoaderService,
    private statisticsService: StatisticsService,
    public auth: Auth,
    private mainService: MainService,
    private meta: Meta,
    private meta_title: Title

  ) {}


  ngOnInit() {
    this.auth.IsCommuintyManager();
    this.Manager = this.auth.IsCommuintyManager();

    this.loaderService.display(true);
    this.route.params.subscribe(params => {
      this.sub = params;
      if (params['showcaseName']) {
        this.showcaseName = params["showcaseName"];
        this.nodeService.getIdFromUrl(this.showcaseName, 'showcase').subscribe(nid => {
          this.viewService.getView('showcase_projects_full', [['nid', nid], ['sort_by', this.sub.sortBy], ['sort_order', this.sub.sortOrder]]).subscribe(res => {
            let i = 0;
            for (let element of res) {
              if (element.path == params['ProjectName']) {
                this.previousProject = res[i - 1].path
                this.nextProject = res[i + 1].path;
              }
              i++
            }
          });
        })

      }
      let path = params['ProjectName'];
      this.nodeService.getIdFromUrl(path, 'project').subscribe(ids => {
        this.id = ids[0];
<<<<<<< HEAD
=======

>>>>>>> aaed6fadd17a1f92f27ab7c17add5f2543189763
        let body = {
          "nid": this.id,
        };
        this.currentuser = Number(localStorage.getItem('user_id'));
        if (this.currentuser != 0) {
          this.mainService.post(globals.endpoint + '/feed/make_seen/', body).map(res => res.json());
        }
        if (!this.id) {
          this.router.navigateByUrl('**');
          this.loaderService.display(false);
        }
        this.viewService.getView('views/project_visibility', [['nid', this.id]]).subscribe(data => {
          if (data[0].status == 0) {

            // check if the current user is one of the team
            this.viewService.getView('views/project_team_members', [['nid', this.id]]).subscribe(list => {
              let members = list[0].members.split(", ");
              if (members.length == 1 && this.currentuser == data[0].uid) {
                // there is only one team mebmer, and the current user is the author
                this.loadProject();
              } else {
                // check if the user is one of a team
                if (members.indexOf(this.currentuser.toString()) > -1) {
                  this.loadProject();
                } else {
                  this.router.navigateByUrl('access-restricted');
                  this.loaderService.display(false);
                }
              }
            });
            // this.router.navigateByUrl('access-restricted');
            this.loaderService.display(false);
          } else {
            this.loadProject();
          }
        }, err => { });
      });
      /* service to get challenge name if project enter in it */
      // get challenge name and nid for challenge if found from a view      
    });
  }// End ngOnInit
  NavigateShowcase(path: string) {
    this.router.navigate(['projects/', this.sub.showcaseName, path, this.sub.sortBy, this.sub.sortOrder])
  }

  loadProject() {
    this.viewService.getView('maker_project_api/' + this.id)
      .subscribe(data => {
        this.project = data;
        if (this.project) {
          this.meta_title.setTitle(this.project.title.value + ' | Maker Share');
          this.meta.addTags([
            {
              name: 'og:description', content: this.project.field_teaser.value
            },
            {
              name: 'og:image', content: this.project.field_cover_photo.url
            }
          ])
        }

        var i = 0;
        if (this.project.field_resources) {
          for (let resource of this.project.field_resources) {
            var resourceExt = resource.resource_file.split('.').pop();
            this.project.field_resources[i]['extension'] = resourceExt;
            i++
          }
        }
<<<<<<< HEAD
=======

        // this.meta.setTitle(`${this.project.title.value} | Maker Share`);
        // this.meta.setTag('og:image', this.project.field_cover_photo.url);
        // this.meta.setTag('og:description', this.project.field_teaser.value);
>>>>>>> aaed6fadd17a1f92f27ab7c17add5f2543189763
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
