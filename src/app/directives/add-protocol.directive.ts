import { Directive } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[add-protocol]',
  host: {
    '(change)': 'AddProtocol($event)',
  }
})
export class AddProtocolDirective {
    constructor(public formControl: NgControl) {
    }
    AddProtocol($event) {
      if(this.formControl.control.value.indexOf("https://") == -1 && this.formControl.control.value.indexOf("http://") == -1){
        this.formControl.control.patchValue("http://"+this.formControl.value);
      }
    }
}