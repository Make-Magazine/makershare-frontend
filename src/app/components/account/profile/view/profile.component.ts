import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../d7services/user/user.service';
import { ViewService } from '../../../../d7services/view/view.service';
import { RouterModule, Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile;
  constructor(
    private userService: UserService,
    private router: Router,
    private viewService: ViewService
  ) { }
  profile_projects = [];
  ngOnInit() {
    let userId = localStorage.getItem('user_id');
    this.userService.getUser(userId).subscribe(res => {
      this.profile = res;
    }, err => {

    });
    var args = [
      ['uid', localStorage.getItem('user_id')],
      ['uid1', localStorage.getItem('user_name')],
    ];
    this.viewService.getView('profile_projects_grid', args).subscribe(res => {
      this.profile_projects = res;
    }, err => {

    });

  }
  ShowProjectDetails(nid) {
    this.router.navigate(['/project/view', nid]);
  }

}
