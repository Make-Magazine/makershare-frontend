import { 
  FileEntity, DrupalCustomLanguageField, FieldEmail, FieldNumber,
  FieldText, FieldLongText
} from './';

export class FieldsFactory {

  fileEntityReference(): any{
    return this.addLanguage(new FileEntity());
  }

  listText(defaultValue: string): any{
    return this.addLanguage(defaultValue);
  }

  email(): any {
    return this.addLanguage(new FieldEmail());
  }

  number(): any {
    return this.addLanguage(new FieldNumber());
  }

  text(format: null|string): any {
    return this.addLanguage(new FieldText(format));
  }

  longText(format: null|string): any {
    return this.addLanguage(new FieldLongText(format));
  }

  array(): any {
    return this.addLanguage([]);
  }

  private addLanguage(field: any): DrupalCustomLanguageField {
    return new DrupalCustomLanguageField(field);
  }
}