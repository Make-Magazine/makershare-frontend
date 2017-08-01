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
  hideloadmore = true;
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
          this.getProjects();
          this.orgsProjectsCount();
        }
      })
    }
  }

  getProjects() {
     if (this.pages == 0) {
      this.projects = [];
    }
    this.viewServcie.getView('orgs-projects', [['page',this.pages],['nid', this.nid]]).subscribe(data => {
      this.projects =this.projects.concat(data);
      this.loadMoreVisibilty();
    })
  }

  orgsProjectsCount() {
    let body = {
      nid: this.nid
    }
    this.mainService.post('company_profile_api/count_projects_in_orgs', body).map(res => res.json()).subscribe(data => {
      this.projectsCount = data;
    })
  }

  loadMoreProjects() {
    this.pages++;
    this.getProjects();
  }

  loadMoreVisibilty() {
    if (this.projectsCount <= this.projects.length) {
      this.hideloadmore = true;
    } else if (this.projectsCount > this.projects.length) {
      this.hideloadmore = false;
    }
  }
}
