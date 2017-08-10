import { DrupalCustomField } from './custom-field';

export class FieldAddress extends DrupalCustomField { 

  country: string;
  thoroughfare: string;
  administrative_area: string;
  dependent_locality: string;

  premise?: string;
  postal_code?: number;

  init() {
    return [this];
  }

  updateValue(value: FieldAddress) {
    
  }
}