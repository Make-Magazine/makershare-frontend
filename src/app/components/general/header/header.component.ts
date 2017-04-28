import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../d7services/user/user.service';
import { Router } from "@angular/router";
import { Auth } from '../../../auth0/auth.service';
import { SearchBoxComponent } from './search-box/search-box.component';
import { ProfilePictureService } from '../../shared/profile-picture/profile-picture.service';
import { NotificationComponent } from '../../notification/notification.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  showSearchBox: boolean = false;
  user_photo: string;
  constructor(
    private userService: UserService,
    private router: Router,
    private auth: Auth,
    private profilePictureService: ProfilePictureService,
  ) { }


  ngOnInit() {
    // this.userService.isLogedIn().subscribe(res => {
    //   if (res == true) {
    //     this.user_photo = localStorage.getItem('user_photo');
    //   }
    // });
    // localStorage.setItem('redirectUrl', this.router.url);
    // this.user_photo = localStorage.getItem('user_photo');
    // this.profilePictureService.url.subscribe((val: URL) => {
    //   this.user_photo = val;
    // });
    this.profilePictureService.url.subscribe((val: string) => {
      this.user_photo = val;
    })

  }

  openSearchBox() {
    this.showSearchBox = true;
  }

  onNotify(event) {
    this.showSearchBox = false;
  }
  
}
