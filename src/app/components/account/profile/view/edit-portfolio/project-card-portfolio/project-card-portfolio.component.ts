import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProjectCardPortfolio } from '../../../../../../models';
import { NodeService } from '../../../../../../d7services/node/node.service'
import { ViewService } from '../../../../../../d7services/view/view.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'project-card-portfolio',
  templateUrl: './project-card-portfolio.component.html',
})
export class ProjectCardPortfolioComponent implements OnInit {

  @Input() type: string;
  @Input() Project: ProjectCardPortfolio;
  @Input() Visibility: number;
  @Output() emitter = new EventEmitter();
  projectCard
  badges
  constructor(
    private nodeService: NodeService,
    private viewService: ViewService,
    private router: Router,
    private modal: NgbModal
  ) { }

  ngOnInit() {
    this.GetProjectCard();
  }

  GetProjectCard() {
    this.viewService.getView('api-project-card', [['nid', this.Project.nid]]).subscribe(res => {
      var categories_string = res[0].project_categories;
      categories_string = categories_string.substring(0, categories_string.length - 2);
      var categories_array = categories_string.split(', ');
      res[0].project_categories = categories_array;
      var membership_string = res[0].field_team_members;
      membership_string = membership_string.substring(0, membership_string.length - 1);
      var membership_array = membership_string.split(',');
      res[0].field_team_members = membership_array;
      this.projectCard = res[0];
    });
  }

  OpenModal(template) {
    this.modal.open(template);
  }

  DeleteProject(closebtn) {
    closebtn.click();
    this.nodeService.DeleteNode(this.Project.nid).subscribe(data => {
      this.emitter.emit();
    });
  }

  UpdateProjectVisibility(NewVisibility: number, closebtn?) {
    if (closebtn) {
      closebtn.click();
    }
    let project = {
      nid: this.Project.nid,
      field_visibility2: { und: [NewVisibility] },
    }

    this.nodeService.UpdateNode(project).subscribe(data => {
      this.emitter.emit();
    });
  }
  ShowProjectDetails(nid) {
    this.router.navigate(['/project/view/', nid]);
  }
  getBadgesProject() {
    this.viewService.getView('api-project-badges', [['nid', this.Project.nid]]).subscribe(data => {
      for (let i = 0; i < data.length && i < 4; i++) {
        this.badges.push(data[i]);
      }
    });
  }
}
