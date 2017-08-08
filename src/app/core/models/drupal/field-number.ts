import { DrupalCustomField } from './custom-field';

export class FieldNumber extends DrupalCustomField{
  value: number|'';
  
  constructor(){
    super();
    this.value = '';
  }

  init() {
    return [this];
  }
}