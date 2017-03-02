import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { UserService } from '../../../d7services/user/user.service';
import { Router } from "@angular/router";
import { HeaderComponent} from '../../general/header/header.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  implements OnInit{
  isLogedIn = this.headerComponent.isLoggedIn;
  loginForm: FormGroup;
  username: FormControl;
  password: FormControl;

  formErrors = {
     'Name': '',
     'Categories': '',
     'Teaser': '',
     'Coverphoto': '',
     'ShowTellVideo': '',
     'AhaMoment': '',
     'UhOhMoment': '',
   }; 

   validationMessages = {
     'username': {
       'required': 'Username is required.',
       'minlength': 'Username must be at least 4 characters long.',
     },
     'password': {
       'required': 'Password is required.'
     },
   };
  
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private headerComponent: HeaderComponent
  ) { }

  ngOnInit() {
    this.buildForm();
  }


  buildForm(): void {
   this.loginForm = this.fb.group({
     'username': [this.username, [Validators.required, Validators.minLength(4)]],
     'password': [this.password, [Validators.required]]
   });
   this.loginForm.valueChanges.subscribe(data => this.onValueChanged(data));
   this.onValueChanged(); // (re)set validation messages now
 }

 onValueChanged(data?: any) {
    if (!this.loginForm) { return; }
    const form = this.loginForm;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
    
  } 

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
