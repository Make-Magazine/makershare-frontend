import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ViewService } from '../../../d7services/view/view.service';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  providers: [NgbTooltipConfig],
})
export class ProjectCardComponent implements OnInit {
  @Input() nid;
  @Input() view = 'grid';
  badges = [];
  project = {};

  constructor(private router: Router,
    private route: ActivatedRoute,
    private viewService: ViewService,
    private config: NgbTooltipConfig,
  ) {
    config.placement = 'bottom';
    config.triggers = 'hover';
  }
  ngOnInit() {
    this.getProjectCard();
    this.getBadgesProject();
  }
  getProjectCard() {
    this.viewService.getView('api-project-card', [['nid', this.nid]]).subscribe(res => {
      this.project = res[0];
      this.viewService.getView('maker_count_all_projects/' + this.project['uid']).subscribe(data => {
        this.project['maker_project_count'] = data[0]
      })
    });
  }
  
  getBadgesProject() {
    this.viewService.getView('api-project-badges', [['nid', this.nid]]).subscribe(data => {
      this.badges = data;
    });
  }
  challengePage(nid) {
    this.router.navigate(['challenges/', nid]);
  }
  ShowProjectDetails(nid) {
    this.router.navigate(['/project/view', nid]
    );
  }
}
