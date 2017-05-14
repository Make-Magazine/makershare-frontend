import { AbstractControl, ValidatorFn } from '@angular/forms';

export const YoutubeOrVimeoLink = (): ValidatorFn => {
  return (control: AbstractControl): {[key: string]: any} => {
    if (!control.value || control.value.indexOf("youtube") != -1 || control.value.indexOf("vimeo") != -1 || control.value.indexOf("youtu.be") != -1) return null ;
    return {youtubeorvimeolink: true};
  };
};