import { AbstractControl, ValidatorFn } from '@angular/forms';
/**
 * not working
 * @param width 
 * @param height 
 */
export const validimagesize = (width, height): ValidatorFn => {
  return (control: AbstractControl): {[key: string]: any} => {
      var image = new Image();
      image.src = control.value.file;
      image.onload = function() {
        if(image.width > width && image.height > height){
          return null;
        }
      };
      return {validimagesize: true};
  };
};