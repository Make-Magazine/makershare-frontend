import { Component, OnInit } from '@angular/core';
import { ViewService } from '../../../d7services/view/view.service';
import { ActivatedRoute } from '@angular/router';
import { NodeService } from '../../../d7services';


@Component({
  selector: 'app-orgs-projects',
  templateUrl: './orgs-projects.component.html'
})
export class OrgsProjectsComponent implements OnInit {

  path;
  nid;
  projects

  constructor(
    private viewServcie: ViewService,
    private route: ActivatedRoute,
    private nodeService: NodeService,
  ) { }

  ngOnInit() {
    this.path = this.route.snapshot.params['path'];
    if (this.path) {
      this.nodeService.getIdFromUrl(this.path, 'company_profile').subscribe(id => {
        this.nid = id[0];
        if (this.nid) {
          this.viewServcie.getView('orgs-projects', [['nid', this.nid]]).subscribe(data => {
            this.projects = data[0].orgs_projects;
            // console.log(this.projects[0].target_id)
          })
        }
      })
    }
  }


}
