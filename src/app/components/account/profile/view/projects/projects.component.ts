import { Component, OnInit } from '@angular/core';
import { ViewService } from '../../../../../d7services/view/view.service';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'profile-projects',
  templateUrl: './projects.component.html',
})

export class ProjectsComponent implements OnInit {

  constructor(
    private router: Router,
    private viewService: ViewService
  ) { }
  view = 'grid';
  pages: number = 0;
  page_arg;
  countProject = 0;
  hideloadmoreproject = false;

  userPic = false;
  profile_projects = [];
  ngOnInit() {
    this.getProjects();
    this.getCountProject();
  }
  addProject(event: Event) {
    event.preventDefault();
    this.router.navigate(['/project/create']);
  }
  getProjects() {
    var args = [
      ['uid', localStorage.getItem('user_id')],
      ['uid1', localStorage.getItem('user_name')],
      ['page', this.pages],
    ];
    this.viewService.getView('profile_projects_grid', args).subscribe(res => {
      this.profile_projects = this.profile_projects.concat(res);
       this.loadMoreVisibilty();
    }, err => {

    });
  }
  /* function to get count projects */
  getCountProject() {
    this.viewService.getView('maker_count_all_projects/'+  [localStorage.getItem('user_id')]).subscribe(data => {
      this.countProject = data[0];
       console.log(this.countProject);
    }, err => {

    });
  }
  /* end count function */
  loadMoreProject() {
    this.pages++;
    this.getProjects();
  }
   // Function to control load more button
  loadMoreVisibilty() {
    // get the challenges array count
    this.getCountProject();
    if (this.countProject == this.profile_projects.length) {
      this.hideloadmoreproject = true;
      console.log(this.profile_projects.length);

    } else if (this.countProject > this.profile_projects.length) {
      setTimeout(10000);
            console.log(this.profile_projects.length);

      this.hideloadmoreproject = false;
    }
  }
  /* END FUNCTION loadMoreVisibilty */

}
