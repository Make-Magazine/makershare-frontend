import { 
  FileEntity, DrupalCustomLanguageField, FieldEmail, FieldNumber,
  FieldText, FieldLongText, FieldDateTime, DateTime, FieldEntityReference,
  FieldCollectionItem, FieldURL, FieldAddress
} from './';

export class FieldsFactory {

  fileEntityReference(): FileEntity{
    return this.addLanguage(new FileEntity());
  }

  listText(defaultValue: string): any {
    return this.addLanguage(defaultValue);
  }

  email(): FieldEmail {
    return this.addLanguage(new FieldEmail());
  }

  number(): FieldNumber {
    return this.addLanguage(new FieldNumber());
  }

  text(): FieldText {
    return this.addLanguage(new FieldText(null));
  }

  longText(format: null|string): FieldLongText {
    return this.addLanguage(new FieldLongText(format));
  }

  array(): Array<any> {
    return this.addLanguage([]);
  }
  
  date(date?: string,time?: string): FieldDateTime {
    if(date || time) {
      let date_time = new DateTime();
      date_time.date = date;
      date_time.time = time;
      return this.addLanguage(new FieldDateTime(date_time));
    }
    return this.addLanguage(new FieldDateTime());
  }

  entityReference(): FieldEntityReference {
    return this.addLanguage(new FieldEntityReference());
  }

  fieldCollection(itemField: FieldCollectionItem[] | FieldCollectionItem): any {
    return this.addLanguage(itemField);
  }

  url() {
    return this.addLanguage(new FieldURL());
  }
  
  address() {
    return this.addLanguage(new FieldAddress());
  }

  private addLanguage(field: any): any {
    return new DrupalCustomLanguageField(field);
  }
}