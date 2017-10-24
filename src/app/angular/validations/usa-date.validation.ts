import { AbstractControl, ValidatorFn } from '@angular/forms';

export const UsaDate = (): ValidatorFn => {
  return (control: AbstractControl): {[key: string]: any} => {
    const  date_regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
    if (date_regex.test(control.value) || !control.value) {
      return null;
    }
    return {usadate: true};
  };
};
