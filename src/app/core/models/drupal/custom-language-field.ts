import { Singleton, DrupalCustomField } from '../';

export class DrupalCustomLanguageField {
  [key: string]: any;

  constructor(newField: any) {
    if(newField instanceof DrupalCustomField) {
      this[Singleton.Settings.language] = newField.init();
    }else {
      this[Singleton.Settings.language] = newField;
    }
  }

  getField(index?: number): any {
    const field = this[Singleton.Settings.language];
    if(field instanceof Array){
      if(!index) {
        if(field.length > 1) {
          return field
        }
        return field[0];
      }
      return field[index];
    }
    return this[Singleton.Settings.language];
  }
}