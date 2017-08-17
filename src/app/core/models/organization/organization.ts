import {
  NodeEntity,
  DrupalCustomLanguageField,
  DrupalCustomField,
  FileEntity,
  FieldEmail,
  FieldNumber,
  FieldText,
  FieldLongText,
  FieldDateTime,
  FC_MakerMembership,
  FC_SocialAccounts,
  FieldAddress,
} from '../';

export class Organization extends NodeEntity {
  field_orgs_logo: FileEntity; //
  field_orgs_cover_photo: FileEntity; //
  field_org_avatar: FileEntity; //
  field_orgs_type: 'non-profit' | 'startup'; //
  field_orgs_contact: FieldEmail; //
  field_minimum_number_of_follower: FieldNumber; //
  field_breif_info: FieldText; //
  body: FieldLongText; //

  field_website_blog?: FieldText; //
  field_orgs_projects?: Array<number>;
  field_orgs_phone?: FieldText; //
  field_number_of_employees?: FieldNumber; //
  field_founder_name?: FieldText; //
  field_founded_date?: FieldDateTime; //
  field_type_of_business?: FieldText; //
  field_maker_motto?: FieldText; //
  field_maker_memberships?: FC_MakerMembership[];
  field_social_accounts?: FC_SocialAccounts; //
  field_orgs_address?: FieldAddress; //

  constructor() {
    super();
    this.initFields();
    this.setOrganizationOwner();
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
    this.field_breif_info = this.fieldsFactory.text();
    this.body = this.fieldsFactory.longText(null);
    this.field_website_blog = this.fieldsFactory.longText(null);
    this.field_orgs_phone = this.fieldsFactory.longText(null);
    this.field_number_of_employees = this.fieldsFactory.number();
    this.field_founder_name = this.fieldsFactory.text();
    this.field_maker_motto = this.fieldsFactory.text();
    this.field_type_of_business = this.fieldsFactory.text();
    this.field_orgs_projects = this.fieldsFactory.array();
    this.field_founded_date = this.fieldsFactory.date(
      new Date().getFullYear().toString(),
    );
    this.field_maker_memberships = <Array<
      FC_MakerMembership
    >>this.fieldsFactory.fieldCollection(new FC_MakerMembership());
    this.field_social_accounts = <FC_SocialAccounts>this.fieldsFactory.fieldCollection(
      new FC_SocialAccounts(),
    );
    this.field_orgs_address = this.fieldsFactory.address();
  }

  setOrganizationOwner() {
    const usernameWithID =
      localStorage.getItem('user_name') +
      ' (' +
      localStorage.getItem('user_id') +
      ')';
    const field_maker_memberships = <FC_MakerMembership>this.getField(
      'field_maker_memberships',
      null,
      true,
    )[0];
    field_maker_memberships.updateField('field_team_member', usernameWithID);
    field_maker_memberships.updateField('field_membership_role', 'Admin');
  }

  getField(fieldName: string, index?: number, asArray?: boolean): any {
    const field = this[fieldName];
    if (field instanceof DrupalCustomLanguageField) {
      return field.getField(index, asArray);
    }
    return field;
  }

  setField(
    fieldName: string,
    value: DrupalCustomField[] | string | number,
    index?: number,
  ): void {
    const field = this[fieldName];
    if (field instanceof DrupalCustomLanguageField) {
      field.setField(value);
      return;
    }
    super.setField(fieldName, value);
  }

  updateField(fieldName: string, value: any, index?: number) {
    const field = this[fieldName];
    if (fieldName == 'field_maker_memberships' && value.length > 0) {
      const members: FC_MakerMembership[] = [];
      value.forEach(element => {
        const membership = new FC_MakerMembership();
        Object.keys(element).forEach(key => {
          membership.updateField(key, element[key]);
        });
        members.push(membership);
      });
      this[fieldName] = this.fieldsFactory.fieldCollection(members);
      return;
    } else if (field instanceof DrupalCustomLanguageField) {
      field.updateField(value, index);
      return;
    }
    super.setField(fieldName, value);
  }
}
