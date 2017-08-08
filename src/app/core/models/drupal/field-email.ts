import { DrupalCustomField } from './custom-field';

export class FieldEmail extends DrupalCustomField {

  email: string;

  constructor() {
    super();
    this.email = '';
  }

  init() {
    return [this];
  }
}