import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainService, NodeService, StatisticsService, ViewService } from '../../../core/d7services';

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
  company_views: number = 0;
  LoggedInUserID: number = +localStorage.getItem('user_id');

  constructor(
    private viewServcie: ViewService,
    private route: ActivatedRoute,
    private nodeService: NodeService,
    private mainService: MainService,
    private statisticsService: StatisticsService,

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
      this.company_views = data[0].org_views;
      this.showloadmoreProject = (this.projectsCount <= this.projects.length) ? false : true;
         if (this.LoggedInUserID != data[0].uid) {
      this.statisticsService
        .view_record(data[0].company_nid, 'node')
        .subscribe();
    }
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
