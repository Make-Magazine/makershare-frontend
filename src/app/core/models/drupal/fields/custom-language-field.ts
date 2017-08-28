import { Singleton, DrupalCustomField } from '../../';

export class DrupalCustomLanguageField {
  [key: string]: any;

  constructor(newField: any) {
    if(newField instanceof DrupalCustomField) {
      this[Singleton.Settings.language] = newField.init();
    }else {
      this[Singleton.Settings.language] = newField;
    }
  }

  getField(index?: number, asArray?:boolean): any {
    const field = this[Singleton.Settings.language];
    if(field instanceof Array){
      if(!index && field[0]) {
        if(field.length > 1 || asArray) {
          return field;
        }
        return field[0];
      }else if(index) {
        return field[index];
      }
    }
    return field;
  }
  
  setField(value: any): void {
    const field = this[Singleton.Settings.language];
    if(value instanceof DrupalCustomField && field instanceof Array) {
      this[Singleton.Settings.language][0] = value;
      return;      
    }
    this[Singleton.Settings.language] = value;
  }

  updateField(value: any, index?: number) {
    const self = this;
    const field = self[Singleton.Settings.language];
    if(value instanceof DrupalCustomField && field instanceof Array) {
      if(index) {
        field[index] = value;
      } else {
        field[0] = value;
      }
      return;
    }else if (field instanceof Array && field[0] instanceof DrupalCustomField) {
      if(index) {
        field[index].updateValue(value);
      } else {
        field[0].updateValue(value);
      }
      return;
    }
    this[Singleton.Settings.language] = value;
  }
}