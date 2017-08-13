import { DrupalCustomField, DrupalCustomLanguageField } from './';
import { FieldsFactory } from '../fields-factory';

export abstract class FieldCollectionItem extends DrupalCustomField {
  item_id?: number;
  revision_id?: number;
  _weight: number;

  protected fieldsFactory: FieldsFactory;

  constructor() {
    super();
    this.fieldsFactory = new FieldsFactory();
    this.initFields();
  }

  get value(): number {
    return this.item_id;
  }

  set value(item_id) {
    this.item_id = item_id;
  }

  init() : FieldCollectionItem[] {
    return [this];
  }

  updateValue(item_id: number) {
    this.item_id = item_id;
  }

  abstract initFields();

  getField(fieldName:string) {
    const field = this[fieldName];
    if(field instanceof DrupalCustomLanguageField) {
      return field.getField();
    }
    return field;
  }

  setField(fieldName: string, value: DrupalCustomField | string | number, index?: number): void {
    const field = this[fieldName];
    if (field instanceof DrupalCustomLanguageField) {
      field.setField(value);
      return;
    }
    this[fieldName] = value;
  }

  updateField(fieldName: string, value: any, index?: number) {
    const field = this[fieldName];
    if (field instanceof DrupalCustomLanguageField) {
      field.updateField(value, index);
      return;
    }
    this[fieldName] = value;
  }
}