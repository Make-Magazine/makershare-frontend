import { DrupalCustomField } from './custom-field';
export class FieldURL extends DrupalCustomField{
  value?: string;
  format: null;
  safe_value?: string;

  constructor() {
    super();
    this.value = '';
    this.format = null;
  }

  init() {
    return [this];
  }

  updateValue(value) {
    this.value = value;
  }
}