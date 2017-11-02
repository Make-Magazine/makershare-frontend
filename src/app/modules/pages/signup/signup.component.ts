import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Auth } from '../../auth0/auth.service';
import { NetworkError, NetworkErrorCode } from '../../../core/models/error';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit, OnDestroy {

  signingUp: boolean = true;
  subscribe: boolean = true;
  signupBtnLabel = 'Sign Up';
  errorMessage = null;
  errorSignupMessage = null;
  extraErrorDetails = null;
  submitted = false;  
  formYears: number[] = [];
  userSignup = {
    emailUp: '',
    passwordUp: '',
    firstName: '',
    lastName: '',
    checkbox: 0,
    month: null,
    day: null,
    year: null,
  };
  
  constructor(
    public auth: Auth,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit() {
    this.document.body.classList.add('signup');
    const currYear: number = (new Date()).getFullYear();
    for (let i = 1930; i < currYear; i++) {
      this.formYears.push(i);
    }    
  }

  ngOnDestroy() {
    this.document.body.classList.remove('signup');
  }

  /**
   * signup
   *
   * @param user
   */
  public signup() {
    this.submitted = true;
    if(this.signingUp){
      return;
    }

    if (
      this.userSignup.emailUp &&
      this.userSignup.passwordUp &&
      this.userSignup.firstName &&
      this.userSignup.lastName &&
      this.userSignup.checkbox &&
      this.userSignup.month &&
      this.userSignup.day &&
      this.userSignup.year
    ) {
      this.signupBtnLabel = 'Signing Up...';
      if ( this.subscribe ) {
        this.auth.signupNewsletter(this.userSignup.emailUp);
      }
      this.auth.signup(
        this.userSignup.emailUp,
        this.userSignup.passwordUp,
        this.userSignup.firstName,
        this.userSignup.lastName,
        this.userSignup.month,
        this.userSignup.day,
        this.userSignup.year,
      ).subscribe((val: boolean) => {
        this.errorSignupMessage = null;
        this.extraErrorDetails = null;
        this.signupBtnLabel = 'Retrieving user info...';
      }, (err: NetworkError) => {
        this.signupBtnLabel = 'Sign Up';

        // If error related to password
        if (err.code === NetworkErrorCode.INVALID_PASSWORD) {
          this.errorSignupMessage = err.original.response.body['message'];
          this.extraErrorDetails = err.original.response.body['policy'];
        } else {
          this.errorSignupMessage = err.description;
        }
        
      }, () => {
        
      });
    }
  }

  /**
   * subscribeUpdate
   */
  public subscribeUpdate() {
    this.subscribe = !this.subscribe;
  }

  resolved(captchaResponse: string) {
    this.signingUp = false;
  }

}
