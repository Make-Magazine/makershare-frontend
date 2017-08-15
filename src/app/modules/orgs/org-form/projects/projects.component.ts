import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ViewService } from '../../../../core/d7services/view/view.service';

@Component({
  selector: 'app-org-form-projects',
  templateUrl: './projects.component.html',
})
export class ProjectsComponent implements OnInit {
  @Input() organizationForm: FormGroup;
  tmpSelectedProject: number;
  userProjects = [];

  constructor(private viewService: ViewService) {}

  ngOnInit() {
    // get logged-in user projects
    this.getUserProjects();
  }

  getUserProjects() {
    let uid = +localStorage.getItem('user_id');
    this.viewService
      .getView('profile_projects_grid', [['uid', uid]])
      .subscribe(data => {
        this.userProjects = data;
      });
  }

  insertSelectedProject() {
    if (
      this.organizationForm.value.field_orgs_projects.indexOf(
        this.tmpSelectedProject,
      ) > -1
    ) {
      // console.log('this project is already selected.');
    } else {
      // add the selected nid to the field array
      this.organizationForm.value.field_orgs_projects.push(
        this.tmpSelectedProject,
      );
    }
  }
}
