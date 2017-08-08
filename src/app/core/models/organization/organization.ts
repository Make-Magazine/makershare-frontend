import { 
  NodeEntity, DrupalCustomLanguageField, FileEntity, FieldEmail, FieldNumber,
  FieldText, FieldLongText
} from '../';

export class Organization extends NodeEntity {

  private field_orgs_logo: FileEntity;
  private field_orgs_cover_photo: FileEntity;
  private field_orgs_type: 'non-profit'|'startup';
  private field_orgs_contact: FieldEmail;
  private field_minimum_number_of_follower: FieldNumber;
  private field_breif_info: FieldText;
  private body: FieldLongText;

  // field_social_accounts?;
  // field_website_blog?;
  // field_orgs_address?;
  // field_orgs_projects?;
  // field_orgs_phone?;
  // FieldNumber_of_employees?;
  // field_founder_name?;
  // field_founded_date?;
  // field_type_of_business?;  
  // field_badges?;
  // group_about_us?;
  // field_maker_memberships?;

  constructor() {
    super();
    this.initFields();
    // this.implementSetGet();
  }

  protected initFields() {
    super.initFields('company_profile');
    this.field_orgs_logo = this.fieldsFactory.fileEntityReference();
    this.field_orgs_cover_photo = this.fieldsFactory.fileEntityReference();
    this.field_orgs_type = this.fieldsFactory.listText('non-profit');
    this.field_orgs_contact = this.fieldsFactory.email();
    this.field_minimum_number_of_follower = this.fieldsFactory.number();
    this.field_breif_info = this.fieldsFactory.text(null);
    this.body = this.fieldsFactory.longText(null);
  }

  getField(fieldName: string, index?: number): any {
    const field = this[fieldName];
    if (field instanceof DrupalCustomLanguageField) {
      return field.getField(index);
    }
    return field;
  }

  implementSetGet() {
    super.implementSetGet();
    // for (let key in this) {
    //   if(this[key] !instanceof DrupalCustomLanguageField) {
    //     return;
    //   }
    //   Object.defineProperty(this, key, {
    //     get: () => { return this[key] },
    //     set: (value: string|number) => {
    //       console.log("test");
    //       this[key] = value;
    //     },
    //   });
    // }
  }
}
