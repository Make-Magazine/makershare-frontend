import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../d7services';
import { Router } from "@angular/router";
import { Auth } from '../../../auth0/auth.service';
import { SearchBoxComponent } from './search-box/search-box.component';
import { ProfilePictureService } from '../../shared/profile-picture/profile-picture.service';
import { domain } from '../../../d7services/globals';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  Back_End_Domain;
  roles = [];
  Manager:boolean = false;
  showSearchBox: boolean = false;
  user_photo: string;
  displayRegistration:boolean = false;
  constructor(
    private userService: UserService,
    private router: Router,
    public auth: Auth,
    private profilePictureService: ProfilePictureService,
  ) { }


  ngOnInit() {
    this.Back_End_Domain = domain;
    if(localStorage.getItem('roles')){
      this.roles = localStorage.getItem('roles').split(',');
      if(this.roles.indexOf('3') != -1 || this.roles.indexOf('4') != -1 || this.roles.indexOf('6') != -1 || this.roles.indexOf('7') != -1 ||
        this.roles.indexOf('8') != -1 || this.roles.indexOf('9') != -1 || this.roles.indexOf('10') != -1){
        this.Manager = true;
      }
    }
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
  showRegistration(){
    this.displayRegistration = true;
  }
  hideRegisteration(event){
    this.displayRegistration = false;   
  }
}
