import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";

@Component({
  selector: 'confirm',
  templateUrl: './join-modal.component.html',
})
export class JoinModalComponent  extends DialogComponent {
  constructor(dialogService: DialogService) {
    super(dialogService);
  }
  join() {
    // we set dialog result as true on click on confirm button, 
    // then we can get dialog result from caller code 
    this.result = true;
    console.log("Join Us")
    this.close();
  }
  logIn(){
    console.log("LogIn")
  }
}