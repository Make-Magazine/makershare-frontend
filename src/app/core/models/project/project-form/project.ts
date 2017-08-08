import {
  date_time,
  field_date,
  field_entity_reference,
  FieldNumber,
  field_term_reference,
  FieldText,
  field_URL,
  FieldFileReference,
  NodeEntity,
} from '../../';
import * as FieldCollectionItem from '../../project/project-form/field-collection-item';

export interface ProjectForm extends NodeEntity {
  field_story: { und: FieldText[] };
  field_aha_moment?: { und: FieldText[] };
  field_uh_oh_moment?: { und: FieldText[] };
  field_teaser: { und: FieldText[] };
  field_tools?: { und: FieldCollectionItem.FieldCollectionItemTool[] };
  field_materials?: {
    und: FieldCollectionItem.FieldCollectionItemMaterial[];
  };
  field_parts?: { und: FieldCollectionItem.FieldCollectionItemPart[] };
  field_difficulty?: { und: number | '_none' };
  field_duration?: { und: number | '_none' };
  field_show_tell_video?: { und: field_URL[] };
  field_show_tell_video_as_default: { und: FieldNumber[] };
  field_tags?: { und: string };
  field_resources?: {
    und: FieldCollectionItem.FieldCollectionItemResource[];
  };
  field_collaborators?: { und: field_entity_reference[] };
  field_sort_order?: { und: FieldNumber[] };
  field_maker_memberships?: {
    und: FieldCollectionItem.FieldCollectionItemMember[];
  };
  field_original_team_members?: { und: field_entity_reference[] };
  field_total_forks?: { und: FieldNumber[] };
  field_forks?: { und: field_entity_reference[] };
  field_visibility2: { und: number[] };
  field_faire_name: { und: number[] };
  field_mfba17_project_id?: { und: FieldText[] };
  field_cover_photo: { und: FieldFileReference[] };
  field_how_to?: { und: FieldText[] };
  field_categories: { und: any[] };
  field_creation_date: { und: field_date[] };
}

export interface ProjectView extends NodeEntity {
  field_story: { und: FieldText[] };
  field_aha_moment?: { und: FieldText[] };
  field_uh_oh_moment?: { und: FieldText[] };
  field_teaser: { und: FieldText[] };
  field_tools?: {
    und: FieldCollectionItem.FieldCollectionItemReferenceRow[];
  };
  field_materials?: {
    und: FieldCollectionItem.FieldCollectionItemReferenceRow[];
  };
  field_parts?: {
    und: FieldCollectionItem.FieldCollectionItemReferenceRow[];
  };
  field_resources?: {
    und: FieldCollectionItem.FieldCollectionItemReferenceRow[];
  };
  field_maker_memberships?: {
    und: FieldCollectionItem.FieldCollectionItemReferenceRow[];
  };
  field_difficulty: { und: field_term_reference[] };
  field_duration: { und: field_term_reference[] };
  field_show_tell_video?: { und: field_URL[] };
  field_show_tell_video_as_default: { und: FieldNumber[] };
  field_tags?: { und: field_term_reference[] };
  field_collaborators?: { und: field_entity_reference[] };
  field_sort_order?: { und: FieldNumber[] };
  field_original_team_members?: { und: field_entity_reference[] };
  field_total_forks?: { und: FieldNumber[] };
  field_forks?: { und: field_entity_reference[] };
  field_visibility2?: { und: field_term_reference[] };
  field_categories?: { und: field_term_reference[] };
  field_mfba17_project_id?: { und: FieldText[] };
  field_how_to?: { und: FieldText[] };
  field_cover_photo?: { und: FieldFileReference[] };
}

export interface ProjectCardPortfolio extends NodeEntity {
  grid_image: URL;
  showcase_image: URL;
}

export class ProjectView extends NodeEntity implements ProjectView {
  constructor(Project: ProjectView) {
    super();
    this.Init('project', Project);
  }

  protected Init(Type, Project: ProjectView) {
    super.initFields(Type);
    for (const FieldName in Project) {
      const FieldValue = Project[FieldName];
      this.setField(FieldName, FieldValue);
    }
  }
}

export class ProjectForm extends NodeEntity implements ProjectForm {
  protected Init(): void {
    super.initFields('project');
    this.field_how_to = { und: [new FieldText(null)] };
    this.field_tools = { und: [] };
    this.field_parts = { und: [] };
    this.field_materials = { und: [] };
    this.field_difficulty = { und: '_none' };
    this.field_duration = { und: '_none' };
    this.field_resources = { und: [] };
    this.field_maker_memberships = { und: [] };
    this.field_visibility2 = { und: [1115] };
    this.field_teaser = { und: [new FieldText(null)] };
    this.field_story = { und: [new FieldText('filtered_html')] };
    this.field_cover_photo = { und: [new FieldFileReference()] };
    this.field_categories = { und: [] };
    this.field_tags = { und: '' };
    this.field_show_tell_video = { und: [new field_URL()] };
    this.field_show_tell_video_as_default = { und: [new FieldNumber()] };
    this.field_aha_moment = { und: [new FieldText(null)] };
    this.field_uh_oh_moment = { und: [new FieldText(null)] };
    this.field_sort_order = { und: [new FieldNumber()] };
    this.field_creation_date = { und: [new field_date(new date_time())] };
  }

  public SetField(FieldName: string, value: any): void {
    if (this[FieldName] instanceof Object) {
      this.SetCustomFields(value, FieldName);
    } else {
      super.setField(FieldName, value);
    }
  }

  GetField(FieldName: string): any {
    super.getField(FieldName);
  }

  /**
   * Checking the project if ready to publish
   * otherwhise will be saved as a draft
   */
  public CheckIfReadyToPublic() {
    if (this.GetField('title') == '') {
      this.SetField('title', 'Untitled');
    }
    if (
      this.GetField('field_categories').und.length == 0 ||
      this.GetField('field_cover_photo').und[0].fid == 0 ||
      this.GetField('title') == ('Untitled' || 'untitled') ||
      this.GetField('field_story').und[0].value == ''
    ) {
      this.GetField('field_visibility2').und[0] = 1115;
    }
    if (this.GetField('field_visibility2').und[0] == 370) {
      this.SetField('status', 1);
    } else {
      this.SetField('status', null);
    }
  }

  private SetCustomFields(value: any, FieldName: string): void {
    if (typeof value === 'string' || typeof value === 'number') {
      if (
        typeof this[FieldName].und === 'string' ||
        typeof this[FieldName].und === 'number'
      ) {
        this[FieldName].und = value;
      } else {
        this[FieldName].und = [+value];
      }
    } else if (value instanceof Array) {
      this[FieldName].und = value;
    } else {
      this[FieldName].und[0] = value;
    }
  }
}
