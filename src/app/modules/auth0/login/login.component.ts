import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Auth } from './../auth.service';
// import { FormsModule } from '@angular/forms';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NetworkError, NetworkErrorCode } from '../../../core/models/error';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})

export class LoginComponent implements OnInit {
  subscribeToNewsletter: boolean = true;
  private CancelTitle: string = 'Cancel';
  private closeResult: string;
  resetSent;
  selected_day = '';
  selected_month = '';
  selected_year = '';
  submitted = false;
  loading: boolean = false;
  signingUp: boolean = false;
  loginBtnLabel: string = 'Log in';
  signupBtnLabel: string = 'Sign Up';
  recaptchaIsValidated: boolean = false;
  forgetEmail = {
    email: '',
  };
  @ViewChild('content') modalContent: TemplateRef<any>;
  current_active_tab: string = 'login';
  errorMessage: string;
  errorSignupMessage: string;
  extraErrorDetails: string;

  // Modal
  modalRef: NgbModalRef;

  formYears: number[] = [];

  userlogin;
  userSignup;

  constructor(public auth: Auth, private modalService: NgbModal) {
    this.auth.toggleModal$.subscribe(() => {
      this.open(this.modalContent);
    });
  }

  ngOnInit() {
    const currYear: number = (new Date()).getFullYear();
    for (let i = 1930; i < currYear; i++) {
      this.formYears.push(i);
    }
  }

  reset() {
    this.current_active_tab = 'login';
    this.loginBtnLabel = 'Log in';
    this.signupBtnLabel = 'Sign Up';
    this.errorMessage = null;
    this.errorSignupMessage = null;
    this.extraErrorDetails = null;
    this.loading = false;
    this.submitted = false;
    this.recaptchaIsValidated = false;
    this.signingUp = false;
    this.userlogin = {
      email: '',
      password: '',
    };
    this.userSignup = {
      emailUp: '',
      passwordUp: '',
      firstName: '',
      lastName: '',
      checkbox: 0,
      month: null,
      day: null,
      year: null,
    };
  }

  open(content) {
    // Reset view model
    this.reset();

    // Open modal
    this.modalRef = this.modalService.open(content);
    this.modalRef.result.then(
      result => {
        this.CancelTitle = 'Cancel';
        this.closeResult = `Closed with: ${result}`;
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  /**
   * login
   */
  public login() {
    this.errorMessage = '';
    if (this.userlogin.email && this.userlogin.password) {
      this.loading = true;
      this.loginBtnLabel = 'Logging in...';
      this.auth.login(this.userlogin.email, this.userlogin.password).subscribe((val: boolean) => {
        this.errorMessage = null;
        this.loginBtnLabel = 'Retrieving user info...';
      }, (err: NetworkError) => {
        this.loginBtnLabel = 'Log in';
        this.errorMessage = err.description;
        this.loading = false;
      }, () => {
        // Close modal
        this.modalRef.close();
      });
    } else {
      this.loading = false;
      this.errorMessage = 'Please fill the required fields';
    }
  }

  /**
   * resetPassword
   *
   * @param email
   */
  public resetPassword(email) {
    this.auth.resetPassword(email);
    this.resetSent = true;
  }

  /**
   * signup
   *
   * @param user
   */
  public signup() {
    if(this.subscribeToNewsletter) {
      localStorage.setItem('subscribeToNewsletter', 'true');
    } else {
      localStorage.setItem('subscribeToNewsletter', 'false');
    }
    
    this.errorSignupMessage = null;
    this.extraErrorDetails = null;
    this.submitted = true;
    if (
      this.userSignup.emailUp &&
      this.userSignup.passwordUp &&
      this.userSignup.firstName &&
      this.userSignup.lastName &&
      this.userSignup.checkbox &&
      this.userSignup.month &&
      this.userSignup.day &&
      this.userSignup.year &&
      this.recaptchaIsValidated
    ) {
      this.signingUp = true;
      this.signupBtnLabel = 'Signing Up...';
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
        this.signingUp = false;
      }, () => {
        // Close modal
        this.modalRef.close();
      });
    }
  }

  resolved(captchaResponse: string) {
    this.recaptchaIsValidated = true;
  }

}
