import { AbstractControl, ValidatorFn } from '@angular/forms';

export const inarray = (inarray: Array<any>): ValidatorFn => {
  return (control: AbstractControl): {[key: string]: any} => {
    if (inarray.length === 0) return null;
    var found = false;
    inarray.forEach((element, index) => {
      if(control.value == element){
        found = true;
        return;
      }
    });
    return found ? null : {inarray: true};
  };
};