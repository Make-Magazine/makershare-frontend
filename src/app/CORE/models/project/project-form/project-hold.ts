import { Node,field_entity_reference,date_time } from '../../drupal';

export interface ProjectHold extends Node{
  field_project_to_edit:{und:field_entity_reference[]},
  field_users_wants_edit?:{und:field_entity_reference[]},
  unpublish_on:date_time,
}

export class ProjectHold extends Node implements ProjectHold{
  constructor(Project_title_id:string){
    super();
    this.Init(Project_title_id);
  }

  protected Init(Project_title_id){
    super.InitFields('project_hold');
    this.status = 1;
    this.field_project_to_edit = {und:[{target_id:Project_title_id}]};
    
    let now = new Date(); //Get current date
    let date = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),  now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds()); //reset date to UTC
    date = new Date(date.getTime() - 3*60*60*1000); //convert to america time zone
    date = new Date(date.getTime() + 10*60000); // add 10 mins to timeout
    let day = date.getDate();
    let month = date.getMonth()+1;
    let year = date.getFullYear();
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let date_with_time = new date_time();
    date_with_time.date = year+'-'+month+'-'+day;
    date_with_time.time = hours+':'+minutes+':00';
    this.unpublish_on = new date_time(date_with_time);
  }

}