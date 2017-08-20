import { Component, OnInit } from '@angular/core';
import { Auth } from './../auth.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  forgetEmail = {
    email: ''
  };

  userlogin = {
    email: '',
    password: ''
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
    year: []
  }
  constructor(
    public auth: Auth,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
          var index=0;

    for (let i = 1930; i < 2017; i++) {
        this.userSignup.year[index] = i;
        index++;
  }
  }
  open(content) {
    this.modalService.open(content).result.then(
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
  public  (email, password) {

    if (email && password) {
      this.auth.login(email, password);
    }

  }

  public resetPassword(email) {
    this.auth.resetPassword(email);
    this.resetSent = true;
  }

  public signup(user) {

    this.submitted = true;
    if (user.emailUp && user.passwordUp && user.firstName && user.lastName && user.checkbox && this.selected_month && this.selected_day && this.selected_year) {
      this.auth.signup(user.emailUp, user.passwordUp, user.firstName, user.lastName, user.month, user.day, this.selected_year, user.birthdate, user.checkbox)
    }
  }

 
}
