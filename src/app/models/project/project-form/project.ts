import { Node } from '../../';
import { field_file_reference } from '../../';
import { field_text } from '../../';
import { field_URL } from '../../';
import * as field_collection_item from './field_collection_item';
import { field_term_reference } from '../../';
import { field_entity_reference } from '../../';
import { field_number } from '../../';

export interface ProjectForm extends Node{
	field_story:{und:field_text[]};
	field_aha_moment?:{und:field_text[]|[""]};
	field_uh_oh_moment?:{und:field_text[]};
	field_teaser:{und:field_text[]};
	field_tools?:{und:field_collection_item.field_collection_item_tool[]};
	field_materials?:{und:field_collection_item.field_collection_item_material[]};
	field_parts?:{und:field_collection_item.field_collection_item_part[]};
	field_difficulty?:{und:number|'_none'};
	field_duration?:{und:number|'_none'};
	field_show_tell_video?:{und:field_URL[]};
	field_show_tell_video_as_default:{und:field_number[]};
	field_tags?:{und:string};
	field_resources?:{und:field_collection_item.field_collection_item_resource[]};
	field_collaborators?:{und:field_entity_reference[]};
	field_sort_order?:{und:field_number[]};
	field_maker_memberships?:{und:field_collection_item.field_collection_item_member[]};
	field_original_team_members?:{und:field_entity_reference[]};
	field_total_forks?:{und:field_number[]};
	field_forks?:{und:field_entity_reference[]};
	field_visibility2:{und:number[]};
	field_mfba17_project_id?:{und:field_text[]};
	field_cover_photo:{und:field_file_reference[]};
	field_how_to?:{und:field_text[]};
	field_categories:{und:number[]};
}

export interface ProjectView extends Node{
	field_story:{und:field_text[]};
	field_aha_moment?:{und:field_text[]};
	field_uh_oh_moment?:{und:field_text[]};
	field_teaser:{und:field_text[]};
  field_tools?:{und:field_collection_item.field_collection_item_reference_row[]};
	field_materials?:{und:field_collection_item.field_collection_item_reference_row[]};
	field_parts?:{und:field_collection_item.field_collection_item_reference_row[]};
	field_resources?:{und:field_collection_item.field_collection_item_reference_row[]};
	field_maker_memberships?:{und:field_collection_item.field_collection_item_reference_row[]};
	field_difficulty:{und:field_term_reference[]};
	field_duration:{und:field_term_reference[]};
	field_show_tell_video?:{und:field_URL[]};
	field_show_tell_video_as_default:{und:field_number[]};
	field_tags?:{und:field_term_reference[]};
	field_collaborators?:{und:field_entity_reference[]};
	field_sort_order?:{und:field_number[]};
	field_original_team_members?:{und:field_entity_reference[]};
	field_total_forks?:{und:field_number[]};
	field_forks?:{und:field_entity_reference[]};
	field_visibility2?:{und:field_term_reference[]};
	field_categories?:{und:field_term_reference[]};
	field_mfba17_project_id?:{und:field_text[]};
	field_how_to?:{und:field_text[]};	
	field_cover_photo?:{und:field_file_reference[]};	
}

export interface ProjectCardPortfolio extends Node{
	grid_image:URL;
	showcase_image:URL;
}

export class ProjectView extends Node implements ProjectView{
	constructor(Project:ProjectView){
		super();
		this.Init("project",Project);
	}

	protected Init(Type,Project:ProjectView){
		super.Init(Type);
		for (let FieldName in Project){
			let FieldValue = Project[FieldName];
			this.SetField(FieldValue,FieldName);
		}
	}
}

export class ProjectForm extends Node implements ProjectForm{

	protected Init():void{
		super.Init("project");
		this.field_how_to = {und:[new field_text(null)]};
    this.field_tools = {und:[]};
    this.field_parts = {und:[]};
    this.field_materials = {und:[]};
    this.field_difficulty = {und:'_none'};
    this.field_duration = {und:'_none'};
    this.field_resources = {und:[]};
    this.field_maker_memberships = {und:[]};
    this.field_visibility2 = {und:[1115]};
		this.field_teaser = {und:[new field_text(null)]};
    this.field_story = {und:[new field_text("filtered_html")]};
    this.field_cover_photo = {und:[new field_file_reference()]};
    this.field_categories = {und:[]};
    this.field_tags = {und:''};
    this.field_show_tell_video = {und:[new field_URL()]};
		this.field_show_tell_video_as_default = {und:[new field_number()]};
    this.field_aha_moment = {und:[new field_text(null)]};
    this.field_uh_oh_moment = {und:[new field_text(null)]};
		this.field_sort_order = {und:[{value:0}]};
	}

	public SetField(value:any,FieldName:string):void{
		if(this[FieldName] instanceof Object){
			this.SetCustomFields(value, FieldName);
		}else{
			super.SetField(value, FieldName);
		}
	}

	/**
   * Checking the project if ready to publish
   * otherwhise will be saved as a draft
   */
  public CheckIfReadyToPublic(){
    if(this.GetField('title') == ""){
      this.SetField("Untitled","title");
    }
    if(this.GetField("field_categories").und.length == 0 || this.GetField("field_cover_photo").und[0].fid == 0 ||
       this.GetField('title') == ("Untitled" || "untitled") || this.GetField('field_story').und[0].value == ""){
        this.GetField('field_visibility2').und[0] = 1115;
        this.SetField(0,'status');
       }
  }

	private SetCustomFields(value:any,FieldName:string):void{
		if(typeof value === 'string' || typeof value === 'number'){
			if(typeof this[FieldName].und === 'string' || typeof this[FieldName].und === 'number'){
				this[FieldName].und = value;
			}else{
				this[FieldName].und = [+value];
			}
		}else if(value instanceof Array){
			this[FieldName].und = value;
		}else{
			this[FieldName].und[0] = value;
		}
	}
}