import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../d7services/user/user.service';
import { Router } from "@angular/router";
import { HeaderComponent} from '../../general/header/header.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLogedIn = this.headerComponent.isLoggedIn;
  private loginForm = this.fb.group({
    username: ["", Validators.required],
    password: ["", Validators.required]
  });

  constructor(
    public fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private headerComponent: HeaderComponent
  ) { }

  doLogin(event) {

    this.userService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe(res => {
      res.subscribe(res => {
        console.log('login done');
        this.headerComponent.isLoggedIn = true;
        this.isLogedIn = true;
        this.router.navigate(['user']);
      }, err => {

      });

    }, err => {


    });
  }

}
