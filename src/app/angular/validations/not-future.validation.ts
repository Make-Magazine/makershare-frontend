import { AbstractControl, ValidatorFn } from '@angular/forms';

export const NotFuture = (): ValidatorFn => {
  return (control: AbstractControl): {[key: string]: any} => {
      let date = control.value;
      const dateFrags = date.split('/');
      const now = new Date();
      date = new Date(`${dateFrags[2]}-${dateFrags[0]}-${dateFrags[1]}`);
      if (date > now) {
        return {notfuture: true};
      }
      return null;
  };
};
