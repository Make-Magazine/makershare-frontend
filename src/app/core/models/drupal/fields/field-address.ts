import { DrupalCustomField } from './custom-field';

export class FieldAddress extends DrupalCustomField { 

  country: string;
  name_line?: string;
  first_name?: string;
  last_name?: string;
  organisation_name?: string;
  sub_administrative_area?: string;
  locality?: string;
  dependent_locality?: string;
  sub_premise?: string;
  thoroughfare?: string;
  administrative_area?: string;
  premise?: string;
  postal_code?: number|'';

  constructor() {
    super();
    this.country = '';
    this.name_line = '';
    this.first_name = '';
    this.last_name = '';
    this.organisation_name = '';
    this.sub_administrative_area = '';
    this.locality = '';
    this.dependent_locality = '';
    this.sub_premise = '';
    this.thoroughfare = '';
    this.administrative_area = '';
    this.premise = '';
    this.postal_code = '';
  }

  init() {
    return [this];
  }

  updateValue(value: FieldAddress) {
    Object.keys(value).forEach(key => {
      this[key] = value[key];
    });
  }
}