import { 
  NodeEntity, DrupalCustomLanguageField, DrupalCustomField, FileEntity, FieldEmail, FieldNumber,
  FieldText, FieldLongText, FieldDateTime
} from '../';

export class Organization extends NodeEntity {

  field_orgs_logo: FileEntity;
  field_orgs_cover_photo: FileEntity;
  field_org_avatar: FileEntity;
  field_orgs_type: 'non-profit' | 'startup';
  field_orgs_contact: FieldEmail;
  field_minimum_number_of_follower: FieldNumber;
  field_breif_info: FieldText;
  body: FieldLongText;

  field_website_blog?: FieldText;
  field_orgs_projects?: Array<number>;
  field_orgs_phone?: FieldText;
  field_number_of_employees?: FieldNumber;
  field_founder_name?: FieldText;
  field_founded_date?: FieldDateTime;
  field_type_of_business?: FieldText; 
  field_maker_motto?: FieldText;
  // field_orgs_address?;
  // field_social_accounts?;
  // field_maker_memberships?;
  
  // field_badges?;

  constructor() {
    super();
    this.initFields();
  }

  protected initFields() {
    super.initFields('company_profile');
    this.status = 1;
    this.field_orgs_logo = this.fieldsFactory.fileEntityReference();
    this.field_orgs_cover_photo = this.fieldsFactory.fileEntityReference();
    this.field_org_avatar = this.fieldsFactory.fileEntityReference();
    this.field_orgs_type = this.fieldsFactory.listText('non-profit');
    this.field_orgs_contact = this.fieldsFactory.email();
    this.field_minimum_number_of_follower = this.fieldsFactory.number();
    this.field_breif_info = this.fieldsFactory.text(null);
    this.body = this.fieldsFactory.longText(null);
    this.field_website_blog = this.fieldsFactory.longText(null);
    this.field_orgs_phone = this.fieldsFactory.longText(null);
    this.field_number_of_employees = this.fieldsFactory.number();
    this.field_founder_name = this.fieldsFactory.text(null);
    this.field_maker_motto = this.fieldsFactory.text(null);
    this.field_type_of_business = this.fieldsFactory.text(null);
    this.field_orgs_projects = this.fieldsFactory.array();
    this.field_founded_date = this.fieldsFactory.date(new Date().getFullYear().toString());
  }

  getField(fieldName: string, index?: number): any {
    const field = this[fieldName];
    if (field instanceof DrupalCustomLanguageField) {
      return field.getField(index);
    }
    return field;
  }
  
  setField(fieldName: string, value: DrupalCustomField | string | number, index?: number): void {
    const field = this[fieldName];
    if (field instanceof DrupalCustomLanguageField) {
      field.setField(value);
      return;
    }
    super.setField(fieldName, value);
  }

  updateField(fieldName: string, value: any, index?: number) {
    const field = this[fieldName];
    if (field instanceof DrupalCustomLanguageField) {
      field.updateField(value, index);
      return;
    }
    super.setField(fieldName, value);
  }
}
