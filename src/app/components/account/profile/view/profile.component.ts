import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../d7services/user/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  profile;
  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit() {
    let userId = localStorage.getItem('user_id');
    this.userService.getUser(userId).subscribe(res => {
      this.profile = res;
    }, err => {

    });
  }
  editprofile() {
    this.router.navigate(['profile/editprofile',]);
  }
}
