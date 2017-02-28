import { AbstractControl, ValidatorFn } from '@angular/forms';

export const validimagesize = (width,height): ValidatorFn => {
  return (control: AbstractControl): {[key: string]: any} => {
    var reader = new FileReader();
    reader.onload = (imgsrc:any) => {
      var image = new Image();
      image.src = imgsrc.target.result;
      image.onload = function() {
        if(image.width < width || image.height < height){
          return {validimagesize: true};
        }else{
          return null;
        }
      };
    }
    return null;
  };
};