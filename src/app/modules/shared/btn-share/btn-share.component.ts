import { Component, Input, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-btn-share',
  templateUrl: './btn-share.component.html',
})
export class BtnShareComponent implements OnInit {
  @Input() PageTitle;
  @Input() PageDescription;
  @Input() PageImage;
  @Input() showLabel: boolean = true;
  private CancelTitle: string = 'Cancel';
  private closeResult: string;

  constructor(private modalService: NgbModal) {}

  ngOnInit() {
    this.PageImage = encodeURIComponent(this.PageImage);
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
