import { AbstractControl, ValidatorFn } from '@angular/forms';

export const inarray = (inarray: Array<any>): ValidatorFn => {
  return (control: AbstractControl): {[key: string]: any} => {
    if (!inarray || inarray.length === 0 || control.value === '') return null;
    if(inarray.indexOf(control.value) != -1){
      return null;
    }
    return {inarray: true};
  };
};