import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.css']
})
export class AuthModalComponent implements OnInit {

  constructor() { }
  @ViewChild('myModal')
  modal: ModalComponent;
  


  ngOnInit() {
  }

  openMe() {
    this.modal.open();
  }

  closeMe (){
    this.modal.close();
  }


}
