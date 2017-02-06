import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../d7services/user/user.service';
import { Router } from "@angular/router";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.userService.isLogedIn().subscribe(res => {
      console.log(res);
      if(res == true){
        this.isLoggedIn = true;
      }
    });
  }

  Logout(event){
    console.log(event);
    this.userService.logout().subscribe();

    this.router.navigate(['']);
  }

}
