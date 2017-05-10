import { Component, OnInit,Output,EventEmitter   } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-registration-collect',
  templateUrl: './registration-collect.component.html',
  styleUrls: ['./registration-collect.component.css']
})
export class RegistrationCollectComponent implements OnInit {
  closeResult: string;
  @Output() hideReg: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(
    private modalService: NgbModal
  ) {
    
   }

  ngOnInit() {
  }

  open(content){

    this.modalService.open(content).result.then((result) => {
        this.closeResult = 'Closed with: ${result}';
    }, (reason) => {
      this.closeResult = 'Dismissed ${this.getDismissReason(reason)}';
    });

  }
  closeReg() {
    this.hideReg.emit();
  }

}
