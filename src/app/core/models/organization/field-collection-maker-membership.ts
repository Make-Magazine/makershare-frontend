import { FieldCollectionItem } from '../drupal/fields/field-collection-item';
import { FieldEntityReference, FieldText, FieldNumber } from '../drupal/fields';
 
export class FC_MakerMembership extends FieldCollectionItem{

  field_team_member?: FieldEntityReference;
  field_anonymous_member_name?: FieldText;
  field_membership_role?: FieldText;
  field_sort_order?: FieldNumber;

  initFields(){
    this.field_team_member = this.fieldsFactory.entityReference();
    this.field_anonymous_member_name = this.fieldsFactory.text();
    this.field_membership_role = this.fieldsFactory.text();
    this.field_sort_order = this.fieldsFactory.number();
  }

}