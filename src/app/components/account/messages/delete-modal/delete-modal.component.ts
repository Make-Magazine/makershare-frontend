import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../d7services';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html'
})
export class DeleteModalComponent implements OnInit {

closeResult: string;
  constructor(
    private userService: UserService,
    private modalService: NgbModal,
    private router: Router,
  ) { }

  ngOnInit() {
    this.checkUserLogin();
  }

  open(content) {
    this.userService.isLogedIn().subscribe(data => {
      this.checkUserLogin = data;
      if (data == false) {
        localStorage.setItem('redirectUrl', this.router.url);
        this.router.navigate(['/access-denied']);
      }
      this.modalService.open(content).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    });
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
  checkUserLogin() {

  }

}
