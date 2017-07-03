import { Node,field_entity_reference,field_date,date_time } from '../../Drupal';

export interface ProjectHold extends Node{
  field_project_to_edit:{und:field_entity_reference[]},
  field_users_wants_edit?:{und:field_entity_reference[]},
  unpublish_on:date_time,
}

export class ProjectHold extends Node implements ProjectHold{
  constructor(Project_title_id:string, date_with_time?:date_time){
    super();
    this.Init(Project_title_id,date_with_time);
  }

  protected Init(Project_title_id,date_with_time?){
    super.Init('project_hold');
    this.status = 1;
    this.field_project_to_edit = {und:[{target_id:Project_title_id}]};
    this.unpublish_on = new date_time(date_with_time);
  }

}