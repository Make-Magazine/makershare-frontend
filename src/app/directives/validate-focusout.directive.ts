import { Directive } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[validate-onfocusout]',
  host: {
    '(focusout)': 'onFocusout($event)',
  }
})
export class ValidateOnFocusoutDirective {
    constructor(public formControl: NgControl) {
    }

    onFocusout($event) {
      this.formControl.control.markAsUntouched(false);
    }
}