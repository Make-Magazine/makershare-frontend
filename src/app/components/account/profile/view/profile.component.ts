import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../d7services/user/user.service';
import { JoinModalComponent } from '../../../modals/join/join-modal/join-modal.component';

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
    this.userService.getUser(1).subscribe(res => {
      console.log(res);
          this.profile = res;

    }, err => {
      
    });


  }


}
