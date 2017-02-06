import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../d7services/user/user.service';
import { Router } from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public loginForm = this.fb.group({
    username: ["", Validators.required],
    password: ["", Validators.required]
  });

  constructor(
    public fb: FormBuilder,
    private userService: UserService,
    private router: Router,
  ) { }

  doLogin(event) {

    this.userService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe(res => {
      res.subscribe(res => {
        console.log('login done');
        this.router.navigate(['user']);
      }, err => {

      });

    }, err => {


    });
  }

}
