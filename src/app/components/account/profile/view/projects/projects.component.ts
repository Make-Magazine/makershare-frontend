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
  userPic = false;
  profile_projects = [];
  ngOnInit() {
    var args = [
      ['uid', localStorage.getItem('user_id')],
      ['uid1', localStorage.getItem('user_name')],
    ];
    this.viewService.getView('profile_projects_grid', args).subscribe( res=> {
      this.profile_projects = res;
      console.log(res);
    }, err => {

    });
  }
  addProject(event :Event){
    event.preventDefault();
    this.router.navigate(['/project/create']);
  }



}
