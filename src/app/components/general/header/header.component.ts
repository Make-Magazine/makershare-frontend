import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../d7services/user/user.service';
import { Router } from "@angular/router";
import { Auth } from '../../../auth0/auth.service';
import { SearchBoxComponent } from './search-box/search-box.component';
import { NotificationBarService, NotificationType } from 'angular2-notification-bar/release';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  showSearchBox: boolean = false;
  user_photo
  constructor(
    private userService: UserService,
    private router: Router,
    private auth: Auth,
    private notificationBarService: NotificationBarService,

    ) {  }

  ngOnInit() {
    this.userService.isLogedIn().subscribe(res => {
      if(res == true){
     this.user_photo = localStorage.getItem('user_photo');
      }
    });
   // localStorage.setItem('redirectUrl', this.router.url);
    this.user_photo = localStorage.getItem('user_photo');
    
  }

  // Logout(event){
  //   this.userService.logout().subscribe(res => {
  //       this.isLoggedIn = false;
  //       this.router.navigate(['']);
  //   });
  // }

  

  openSearchBox(){
    this.showSearchBox = true;
  } 

  onNotify(event){
    this.showSearchBox = false;
  }
  note() {
    this.notificationBarService.create({ message: 'For your security, confirm your email address. If you can’t find our Welcome email in your inbox, tell us your email address and we’ll resend.', type: NotificationType.Warning, autoHide: false, allowClose: true, hideOnHover: false });
    this.notificationBarService.create({ message: 'For your security, confirm your email address. If you can’t find our Welcome email in your inbox, tell us your email address and we’ll resend.', type: NotificationType.Error, autoHide: false, allowClose: true, hideOnHover: false });
    this.notificationBarService.create({ message: 'For your security, confirm your email address. If you can’t find our Welcome email in your inbox, tell us your email address and we’ll resend.', type: NotificationType.Success, autoHide: false, allowClose: true, hideOnHover: false });
    this.notificationBarService.create({ message: 'For your security, confirm your email address. If you can’t find our Welcome email in your inbox, tell us your email address and we’ll resend.', type: NotificationType.Info, autoHide: false, allowClose: true, hideOnHover: false });
  }

}
