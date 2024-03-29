import {
  DateTime,
  FieldEntityReference,
  NodeEntity,
} from '../../drupal';

export interface ProjectHold extends NodeEntity {
  field_project_to_edit: { und: FieldEntityReference[] };
  field_users_wants_edit?: { und: FieldEntityReference[] };
  unpublish_on: DateTime;
}

export class ProjectHold extends NodeEntity implements ProjectHold {
  constructor(Project_title_id: string) {
    super();
    this.initFields(Project_title_id);
  }

  protected initFields(Project_title_id) {
    super.initFields('project_hold');
    this.status = 1;
    this.field_project_to_edit = { und: [new FieldEntityReference(Project_title_id)] };

    const now = new Date(); // Get current date
    let date = new Date(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      now.getUTCHours(),
      now.getUTCMinutes(),
      now.getUTCSeconds(),
    ); // reset date to UTC
    date = new Date(date.getTime() - 3 * 60 * 60 * 1000); // convert to america time zone
    date = new Date(date.getTime() + 10 * 60000); // add 10 mins to timeout
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const date_with_time = new DateTime();
    date_with_time.date = year + '-' + month + '-' + day;
    date_with_time.time = hours + ':' + minutes + ':00';
    this.unpublish_on = new DateTime(date_with_time);
  }

  updateField() {
    
  }
}
