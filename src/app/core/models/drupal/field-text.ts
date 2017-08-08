import { DrupalCustomField } from './';

export class FieldText extends DrupalCustomField {
  value: string;
  format: string|null;
  safe_value: string;

  constructor(Format: string|null) {
    super();
    this.format = Format;
    this.value = '';
  }

  init() {
    return [this];
  }
}

export class FieldLongText extends FieldText {
  summary?: string;

  constructor(format: string|null) {
    super(format);
    this.format = format;
  }
}