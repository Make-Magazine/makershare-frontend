import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Auth } from './../auth.service';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NetworkError } from '../../../core/models/error';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  private CancelTitle: string = 'Cancel';
  private closeResult: string;
  resetSent;
  selected_day = '';
  selected_month = '';
  selected_year = '';
  submitted = false;
  loading: boolean = false;
  loginBtnLabel: string = 'Log in';
  forgetEmail = {
    email: '',
  };
  @ViewChild('content') modalContent: TemplateRef<any>;
  current_active_tab: string = 'login';
  errorMessage: string;

  // Modal
  modalRef: NgbModalRef;

  userlogin = {
    email: '',
    password: '',
  };
  userSignup = {
    emailUp: '',
    passwordUp: '',
    firstName: '',
    lastName: '',
    birthdate: 0,
    checkbox: 0,
    month: '',
    day: '',
    year: [],
  };

  constructor(public auth: Auth, private modalService: NgbModal) {
    this.auth.toggleModal$.subscribe(() => {
      this.open(this.modalContent);
    });
  }

  ngOnInit() {
    let index: number = 0;

    for (let i = 1930; i < 2017; i++) {
      this.userSignup.year[index] = i;
      index++;
    }
  }

  open(content) {
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

  public resetPassword(email) {
    this.auth.resetPassword(email);
    this.resetSent = true;
  }

  public signup(user) {
    this.submitted = true;
    if (
      user.emailUp &&
      user.passwordUp &&
      user.firstName &&
      user.lastName &&
      user.checkbox &&
      this.selected_month &&
      this.selected_day &&
      this.selected_year
    ) {
      this.auth.signup(
        user.emailUp,
        user.passwordUp,
        user.firstName,
        user.lastName,
        user.month,
        user.day,
        this.selected_year,
        user.birthdate,
        user.checkbox,
      );
    }
  }
}
