import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-shared-buttons',
  templateUrl: './shared-buttons.component.html'
})
export class SharedButtonsComponent implements OnInit {
  closeResult: string;
  @Input() PageTitle;
  @Input() PageDescription;
  @Input() PageImage;
  CancelTitle = 'Cancel';

  constructor(
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
    this.PageImage = encodeURIComponent(this.PageImage);
  }

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.CancelTitle = 'Cancel';
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
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
}
