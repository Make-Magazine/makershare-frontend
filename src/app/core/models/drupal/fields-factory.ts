import { 
  FileEntity, DrupalCustomLanguageField, FieldEmail, FieldNumber,
  FieldText, FieldLongText, FieldDateTime, DateTime
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
  
  date(date?: string,time?: string): any {
    if(date || time) {
      let date_time = new DateTime();
      date_time.date = date;
      date_time.time = time;
      return this.addLanguage(new FieldDateTime(date_time));
    }
    return this.addLanguage(new FieldDateTime());
  }

  private addLanguage(field: any): DrupalCustomLanguageField {
    return new DrupalCustomLanguageField(field);
  }
}