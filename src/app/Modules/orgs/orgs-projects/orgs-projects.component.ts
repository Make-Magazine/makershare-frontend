import { Component, OnInit } from '@angular/core';
import { ViewService } from '../../../CORE/d7services/view/view.service';
import { ActivatedRoute } from '@angular/router';
import { NodeService, MainService } from '../../../CORE/d7services';


@Component({
  selector: 'app-orgs-projects',
  templateUrl: './orgs-projects.component.html'
})
export class OrgsProjectsComponent implements OnInit {

  path;
  nid;
  projects = [];
  projectsCount;
  showloadmoreProject = false;
  pages: number = 0;

  constructor(
    private viewServcie: ViewService,
    private route: ActivatedRoute,
    private nodeService: NodeService,
    private mainService: MainService,
  ) { }

  ngOnInit() {

    this.path = this.route.snapshot.params['path'];
    if (this.path) {
      this.nodeService.getIdFromUrl(this.path, 'company_profile').subscribe(id => {
        this.nid = id[0]
        if (this.nid) {
          this.getProjects(false);
          this.orgsProjectsCount();
        }
      })
    }
  }

  getProjects(more?: boolean) {
    if (this.pages == 0) {
      this.projects = [];
    }
    if (more) this.pages++;
    this.viewServcie.getView('orgs-projects', [['page', this.pages], ['nid', this.nid]]).subscribe(data => {
      this.projects = this.projects.concat(data);
      this.showloadmoreProject = (this.projectsCount <= this.projects.length) ? false : true;

    })
  }
  orgsProjectsCount() {
    let body = {
      nid: this.nid
    }
    this.mainService.custompost('company_profile_api/count_projects_in_orgs', body).subscribe(data => {
      this.projectsCount = data[0];
    })
  }

}
