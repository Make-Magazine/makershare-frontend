import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, Validators } from '@angular/forms';

export function ValidImageSize(ImgHeight:number, ImgWidth:number): ValidatorFn {
  return (control: AbstractControl): {[key: string]: boolean} => {
    const name = control.value;
    //const no = nameRe.test(name);
    //return no ? {'ValidImageSize': {name}} : null;
    return {'ValidImageSize': false};
  };
}

// @Directive({
//   selector: '[ValidImageSize]',
//   providers: [{provide: NG_VALIDATORS, useExisting: ValidImageSize, multi: true}]
// })
//
// export class ValidImageSizeDirective implements Validator, OnChanges {
//   @Input() ValidImageSize: string;
//   private valFn = Validators.nullValidator;
//
//   ngOnChanges(changes: SimpleChanges): void {
//     const change = changes['ValidImageSize'];
//     if (change) {
//       const val: string | RegExp = change.currentValue;
//       const re = val instanceof RegExp ? val : new RegExp(val, 'i');
//       this.valFn = ValidImageSize();
//     } else {
//       this.valFn = Validators.nullValidator;
//     }
//   }
//
//   validate(control: AbstractControl): {[key: string]: any} {
//     return this.valFn(control);
//   }
// }
