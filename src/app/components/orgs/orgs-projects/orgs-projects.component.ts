import { Component, OnInit } from '@angular/core';
import { ViewService } from '../../../d7services/view/view.service';
import { ActivatedRoute } from '@angular/router';
import { NodeService, MainService } from '../../../d7services';


@Component({
  selector: 'app-orgs-projects',
  templateUrl: './orgs-projects.component.html'
})
export class OrgsProjectsComponent implements OnInit {

  path;
  nid;
  projects
  projectsCount;

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
          this.viewServcie.getView('orgs-projects', [['nid', this.nid]]).subscribe(data => {
            this.projects = data;
          })
          this.orgsProjectsCount();
        }
      })
    }
  }

  orgsProjectsCount() {
      let body = {
        nid: this.nid
      }
    this.mainService.post('/api/company_profile_api/count_projects_in_orgs', body).map(res => res.json()).subscribe(data => {
      this.projectsCount = data;
      console.log(this.projectsCount);
    })
  }
}
