import { FieldCollectionItem, FieldURL } from '../drupal/fields';

export class FC_SocialAccounts extends FieldCollectionItem {

  field_facebook?: FieldURL;
  field_linkedin?: FieldURL;
  field_pinterest?: FieldURL;
  field_instagram?: FieldURL;
  field_twitter?: FieldURL;
  field_github?: FieldURL;
  field_kickstarter?: FieldURL;
  field_etsy_shop?: FieldURL;

  initFields(){
    this.field_facebook = this.fieldsFactory.url();
    this.field_linkedin = this.fieldsFactory.url();
    this.field_pinterest = this.fieldsFactory.url();
    this.field_instagram = this.fieldsFactory.url();
    this.field_twitter = this.fieldsFactory.url();
    this.field_github = this.fieldsFactory.url();
    this.field_kickstarter = this.fieldsFactory.url();
    this.field_etsy_shop = this.fieldsFactory.url();
  }

  updateValue(value) {
    console.log(this);
    Object.keys(value).forEach(key => {
      this[key].updateField(value[key]);
    });
  }
}