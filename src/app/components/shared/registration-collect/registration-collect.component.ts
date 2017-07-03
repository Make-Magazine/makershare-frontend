import { Component, OnInit, Input,EventEmitter   } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-registration-collect',
  templateUrl: './registration-collect.component.html',
  styleUrls: ['./registration-collect.component.css']
})
export class RegistrationCollectComponent implements OnInit {
  showForm: boolean = false;
  @Input() registrationFormState: string;
  constructor(
    private modalService: NgbModal
  ) {
    
   }

  ngOnInit() {
    // console.log(this.registrationFormState);
    if(this.registrationFormState && this.registrationFormState.length > 0){
      this.showForm = true;
    }
    
  }
  
}
