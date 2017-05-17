import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProjectCardPortfolio } from '../../../../../../models';
import { NodeService,ViewService } from '../../../../../../d7services';
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
  pages: number = 0;
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
    this.modal.open(template,{size:'lg',windowClass:'delete-promodal'});
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

    var status = 0;
    if(NewVisibility == 370){
      status = 1;
    }
    let project = {
      nid: this.Project.nid,
      field_visibility2: { und: [NewVisibility] },
      field_sort_order:{und:[{value:0}]},
      status:status,
    }

    this.nodeService.UpdateNode(project).subscribe(data => {
      this.emitter.emit();
    });
  }
  ShowProjectDetails(path) {
    this.router.navigate(['/projects/', path]);
  }
  getBadgesProject() {
    this.viewService.getView('api-project-badges', [['nid', this.Project.nid]]).subscribe(data => {
      for (let i = 0; i < data.length && i < 4; i++) {
        this.badges.push(data[i]);
      }
    });
  }
   /* function load more  */
  loadMoreProject() {
    this.pages++;
    this.GetProjectCard();
  }
  /* end function load more  */
}
