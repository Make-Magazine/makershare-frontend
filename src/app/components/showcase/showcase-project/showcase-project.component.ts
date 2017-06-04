import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';
import { ViewService,FlagService,UserService } from '../../../d7services';
import 'rxjs/Rx';
import { FormGroup, FormControl, FormBuilder, ReactiveFormsModule, FormArray } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoaderService } from '../../shared/loader/loader.service';
import { MetaService } from '@nglibs/meta';

@Component({
  selector: 'app-showcase-project',
  templateUrl: './showcase-project.component.html',
})
export class ShowcaseProjectComponent implements OnInit {

  customTitle: string;
  customDescription: string;
  customImage: string;

  current_active_tab;
  project;
  projectDetails;
  currentuser;
  projectId;
  showcase = {};
  projectIndex;
  projects = [];
  projectdata;
  id: number;
  projectNid;
  showcaseNid;
  allProjects;
  navigateShowcase = {
    name: String,
    totalNumber: Number,
    index: Number,
    length: Number
  };
  private sub: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private viewService: ViewService,
    private userService: UserService,
    private flagService: FlagService,
    private loaderService: LoaderService,
    private meta: MetaService,
  ) { }

  ngOnInit() {

    this.projectNid = this.route.params['value'].pnid;
    this.showcaseNid = this.route.params['value'].nid;
    this.current_active_tab = 'project-story';

    this.getProjectData();
    this.getProjectDetails();
    this.getProjectsIds();
    this.getShowcaseData();
    // this.navigateSetting();
    this.currentuser = Number(localStorage.getItem('user_id'));

    var i = 0;
    if (this.project && this.project.field_resources) {
      for (let resource of this.project.field_resources) {
        var resourceExt = resource.resource_file.split('.').pop();
        this.project.field_resources[i]['extension'] = resourceExt;
        i++
      }
    }

  } // End of ngOnInit

  changeProjectTab(NewTab) {
    this.current_active_tab = NewTab;
  }

  challengePage(nid) {
    this.router.navigate(['challenges/', nid]);
  }


  getProjectData() {
    this.viewService.getView('project_data', [['nid', this.projectNid]]).subscribe(data => {
      this.projectdata = data[0];
    });
  }

  getProjectDetails() {
    this.viewService.getView('maker_project_api/' + this.projectNid).subscribe(data => {
      this.project = data;
      this.projectDetails = this.project;
      console.log(this.project);
      this.projectDetails.nid = this.projectNid;
      //hide spinner
      this.loaderService.display(false);
      
      this.meta.setTitle(`Maker Share | ${this.project.title.value}`);
      this.meta.setTag('og:image', this.project.field_cover_photo.url);
      this.meta.setTag('og:description', this.project.field_teaser.value);

    }, err => {
      //hide spinner
      this.loaderService.display(false);
    });
    
  }

  getProjectsIds() {
    this.viewService.getView('showcase_projects_nid', [['nid', this.showcaseNid]])
      .subscribe(data => {
        this.allProjects = [];
        for (let project of data) {
          this.allProjects.push(project.project_nid);
          this.navigateShowcase['totalNumber'] = this.allProjects;
          this.navigateShowcase['length'] = this.allProjects.length;

        }

        if (!this.projectIndex)
          this.projectIndex = this.allProjects.indexOf(this.projectNid)
        this.navigateShowcase['index'] = this.projectIndex

      });
  }

  getShowcaseData() {
    this.viewService.getView('showcase', [['nid', this.showcaseNid]])
      .subscribe(data => {
        this.showcase = data[0];
        this.navigateShowcase["name"] = this.showcase['showcase_name']
      });
  }
  switchProject(NewIndex) {
    this.projectIndex = NewIndex;
    this.projectNid = this.allProjects[this.projectIndex];
    this.getProjectData();
    this.getProjectDetails();
    this.getProjectsIds();
    this.getShowcaseData();
    this.current_active_tab = 'project-story';
  }
  // navigateSetting(){
  //   setTimeout(500)
  //   if(this.showcase['showcase_name'] && this.projectIndex && this.allProjects)
  //   this.navigateShowcase = {
  //     "name":this.showcase['showcase_name'],
  //     "index":this.projectIndex,
  //     "totalNumber":this.allProjects.length
  //   }
  //   console.log(this.navigateShowcase)
  // }
}
