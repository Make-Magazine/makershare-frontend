import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators , FormControl , FormControlDirective , FormGroup} from '@angular/forms';
import { NodeService } from '../../../../d7services/node/node.service';
import { CreateProject } from '../../../../models/project/create-project/create-project';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
})
export class CreateProjectComponent implements OnInit {
  project: CreateProject;
  current_active_tab: string;
  CreateProjectComponentValues = [];
  constructor(
    private nodeService:NodeService,
  ) {}
  ngOnInit(): void {
    this.current_active_tab = 'Your Story';
    this.project = {
      nid: 0,
      type : 'project',
      title : 'Untitled',
      field_teaser : '',
      field_cover_photo : {filename : '',file : ''},//*
      field_categories: [{und:381}],
      field_story : '',
      field_show_tell_video : '',
      field_aha_moment : '', 
      field_uh_oh_moment : '',
      field_tags : [{tid : 768}],
      field_difficulty : 0,
      field_duration :  0,
      field_credit_your_inspiration : '',
      field_collaborators : [{target_id : 1}],
      field_sort_order : 0,
      field_tools: [{tool_id : 52,tool_url : '',tool_sort_order : 1,tool_description : '',tool_quantity : 1}],
      field_materials: [{material_id : 53,material_quantity : '',material_sort_order : 1}],
      field_parts: [{part_id : 0,part_sort_order : 0,part_quantity : 0}],
      field_resources: [{filename : '',file : '',resource_repository_link : '',resource_label : 0}],
      field_maker_memberships: [{membership_role : '',membership_sort_order : '',membership_team : 1}],
      field_original_team_members : [{target_id : 1}],
      field_total_forks : 0,
      field_forks : [{target_id : 0}],
      field_visibility2 : 0,
      field_mfba17_project_id : 0,
      field_how_to: '',
      status:1,
    };
  }
  CheckFormValidationAndNavigate(NewTab){
    this.current_active_tab = NewTab;
  }
  FormUpdateHandler (values, Component){
    this.CreateProjectComponentValues[Component] =  {};
    this.CreateProjectComponentValues[Component] = values;
    // for (let index in values){
    //    this.project[index] = values[index];
    // }
  }
  SaveProjectClick(Visibility,Status){
    this.project.field_visibility2 = Visibility;
    this.project.field_categories = [{und:381}];
    // this.project.field_cover_photo.uid = 1;
    this.project.type = 'project';
    this.project.status = Status;
    console.log(this.project);
    this.nodeService.createNode(this.project).subscribe(project => {
      console.log("project saved");
      console.log(project);
    }, err =>{
      console.log("error");
      console.log(err);
    });
  }
  // GettingProjectReady(Visibility,Status): CreateProject{
  //   return this.project;
  // }
  // SaveProject(project){

  // }
}
