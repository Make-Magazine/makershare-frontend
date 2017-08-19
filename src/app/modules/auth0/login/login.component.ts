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

  current_active_tab: string = 'login';

  constructor(
    public auth: Auth,
    private modalService: NgbModal) { }

  ngOnInit() {
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

}
