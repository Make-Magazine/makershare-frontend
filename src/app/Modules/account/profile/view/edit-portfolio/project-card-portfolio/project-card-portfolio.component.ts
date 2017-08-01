import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProjectCardPortfolio } from '../../../../../../CORE';
import { NodeService, ViewService } from '../../../../../../CORE/d7services';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { UserService } from '../../../../../../CORE/d7services/user/user.service';

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
  badges = [];
  pages: number = 0;
  constructor(
    private nodeService: NodeService,
    private viewService: ViewService,

    private router: Router,

    private modal: NgbModal,
    private userService: UserService,

  ) { }

  ngOnInit() {
    this.GetProjectCard();
    this.getBadgesProject();
  }

  GetProjectCard() {
    this.viewService.getView('api-project-card', [['nid', this.Project.GetField("nid")]]).subscribe(res => {

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
    this.modal.open(template, { size: 'lg', windowClass: 'delete-promodal' });
  }

  DeleteProject(closebtn) {
    closebtn.click();
    this.nodeService.DeleteNode(this.Project.GetField("nid")).subscribe(data => {
      this.emitter.emit();
    });
  }

  UpdateProjectVisibility(NewVisibility: number, closebtn?) {
    if (closebtn) {
      closebtn.click();
    }

    var status = null;
    if (NewVisibility == 370) {
      status = 1;
    }
    let project = {
      nid: this.Project.GetField("nid"),
      field_visibility2: { und: [NewVisibility] },
      field_sort_order: { und: [{ value: 0 }] },
      status: status,
    }

    this.nodeService.UpdateNode(project).subscribe(data => {
      this.emitter.emit();
    });
  }
  ShowProjectDetails(path) {
    this.router.navigate(['/projects/', path]);
  }
  getBadgesProject() {
    if (this.Project.GetField("nid")) {
      this.viewService.getView('api-project-badges', [['nid', this.Project.GetField("nid")]]).subscribe(data => {
        for (let i = 0; i < data.length && i < 4; i++) {
          this.badges.push(data[i]);
        }
        // for (let i = 0; i < data.length; i++) {
        //   //this.badges.push(data[i]);
        //   console.log(data[i])
        // }
      });
    }
  }
  /* function load more  */
  loadMoreProject() {
    this.pages++;
    this.GetProjectCard();
  }
  /* end function load more  */
  getProfile() {
    if (this.projectCard['uid']) {
      this.userService.getUrlFromId(this.projectCard['uid']).subscribe(res => {
        this.router.navigate(['/portfolio/' + res.url]);
        //  console.log(res.url)
      });

    }
    //console.log("fsafasf")

  }
}
