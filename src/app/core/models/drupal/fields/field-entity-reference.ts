import { DrupalCustomField } from './custom-field';

export class FieldEntityReference extends DrupalCustomField {
  target_id: number | string;

  constructor(target_id?: string | number) {
    super();
    target_id? this.target_id = target_id : this.target_id = '';
  }

  init() {
    return [this];
  }

  updateValue(target_id) {
    this.target_id = target_id;
  }
}