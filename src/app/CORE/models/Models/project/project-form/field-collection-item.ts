import { FieldFileReference } from 'app/CORE/models';

export interface IFieldCollectionItemTool {
  field_tool_name: { und: [FieldCollectionItemReferenceEntity] };
  field_quantity: { und: [FieldCollectionItemReferenceText] };
}

export interface IFieldCollectionItemPart {
  field_part_name: { und: [FieldCollectionItemReferenceEntity] };
  field_quantity: { und: [FieldCollectionItemReferenceText] };
}

export interface IFieldCollectionItemMaterial {
  field_material_name: { und: [FieldCollectionItemReferenceEntity] };
  field_material_quantity: { und: [FieldCollectionItemReferenceText] };
}

export interface IFieldCollectionItemResource {
  field_resource_file?: { und: [FieldFileReference] };
  field_repository_link?: { und: [FieldCollectionItemReferenceUrl] };
  field_label: { und: [FieldCollectionItemReferenceText] };
}

export interface IFieldCollectionItemMember {
  field_team_member?: { und: [FieldCollectionItemReferenceEntity] };
  field_membership_role: { und: [FieldCollectionItemReferenceText] };
  field_anonymous_member_name?: { und: [FieldCollectionItemReferenceText] };
}

export interface IFieldCollectionItemReferenceRow {
  value: number;
  revision_id: number;
}

export class FieldCollectionItemReferenceRow
  implements IFieldCollectionItemReferenceRow {
  value: number;
  revision_id: number;
}

export interface IFieldCollectionItemReferenceEntity {
  target_id: string;
}

export class FieldCollectionItemReferenceEntity
  implements IFieldCollectionItemReferenceEntity {
  target_id = '';
  /*constructor() {
    this.target_id = '';
  }*/
}

export interface IFieldCollectionItemReferenceNumber {
  value: number | string;
}

export class FieldCollectionItemReferenceNumber
  implements IFieldCollectionItemReferenceNumber {
  value = '';
  /*constructor() {
    this.value = '';
  }*/
}

export interface IFieldCollectionItemReferenceText {
  value: string;
}

export class FieldCollectionItemReferenceText
  implements IFieldCollectionItemReferenceText {
  value = '';
  /*constructor() {
    this.value = '';
  }*/
}

export interface IFieldCollectionItemReferenceUrl {
  url: URL | string;
}

export class FieldCollectionItemReferenceUrl
  implements IFieldCollectionItemReferenceUrl {
  url = '';
  /*constructor() {
    this.url = '';
  }*/
}

export class FieldCollectionItemMember implements IFieldCollectionItemMember {
  field_team_member;
  field_membership_role;
  field_anonymous_member_name?;

  constructor() {
    this.field_team_member = {
      und: [new FieldCollectionItemReferenceEntity()],
    };
    this.field_membership_role = {
      und: [new FieldCollectionItemReferenceText()],
    };
    this.field_anonymous_member_name = {
      und: [new FieldCollectionItemReferenceText()],
    };
  }
}

export class FieldCollectionItemTool implements IFieldCollectionItemTool {
  field_tool_name;
  field_quantity;

  constructor() {
    this.field_tool_name = {
      und: [new FieldCollectionItemReferenceEntity()],
    };
    this.field_quantity = { und: [new FieldCollectionItemReferenceText()] };
  }
}

export class FieldCollectionItemPart implements IFieldCollectionItemPart {
  field_part_name;
  field_quantity;

  constructor() {
    this.field_part_name = {
      und: [new FieldCollectionItemReferenceEntity()],
    };
    this.field_quantity = { und: [new FieldCollectionItemReferenceText()] };
  }
}

export class FieldCollectionItemMaterial
  implements IFieldCollectionItemMaterial {
  field_material_name;
  field_material_quantity;

  constructor() {
    this.field_material_name = {
      und: [new FieldCollectionItemReferenceEntity()],
    };
    this.field_material_quantity = {
      und: [new FieldCollectionItemReferenceText()],
    };
  }
}

export class FieldCollectionItemResource
  implements IFieldCollectionItemResource {
  field_resource_file?;
  field_repository_link?;
  field_label;

  constructor() {
    this.field_resource_file = { und: [new FieldFileReference()] };
    this.field_repository_link = {
      und: [new FieldCollectionItemReferenceUrl()],
    };
    this.field_label = { und: [new FieldCollectionItemReferenceText()] };
  }
}
