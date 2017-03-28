import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-shared-buttons',
  templateUrl: './shared-buttons.component.html'
})
export class SharedButtonsComponent implements OnInit {
  closeResult: string;
  @Input() PageUrl;
  @Input() PageTitle;
  @Input() PageDescription;
  @Input() PageImage;
  //@Input() tags;

  constructor(
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
  }

  open(content) {
    this.modalService.open(content).result.then((result) => {
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
