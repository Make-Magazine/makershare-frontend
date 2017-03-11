import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../d7services/user/user.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile;
  constructor(
    private userService: UserService,
  ) { }

  ngOnInit() {
    let userId = localStorage.getItem('user_id');
    this.userService.getUser(userId).subscribe(res => {
          this.profile = res;
    }, err => {
      
    });


  }


}
