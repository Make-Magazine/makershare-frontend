import {field_file_reference} from '../../'

export interface field_collection_item_tool
{
  field_tool_name:{und:[field_collection_item_reference_entity]};
  field_sort_order:{und:[field_collection_item_reference_number]};
  field_tool_url :{und:[field_collection_item_reference_url]};
  field_description:{und:[field_collection_item_reference_text]};
  field_quantity:{und:[field_collection_item_reference_text]};
}

export interface field_collection_item_part
{
  field_part_name:{und:[field_collection_item_reference_entity]};
  field_sort_order:{und:[field_collection_item_reference_number]};
  field_quantity:{und:[field_collection_item_reference_text]};
}

export interface field_collection_item_material
{
  field_material_name:{und:[field_collection_item_reference_entity]};
  field_sort_order:{und:[field_collection_item_reference_number]};
  field_material_quantity:{und:[field_collection_item_reference_text]};
}

export interface field_collection_item_resource
{
  field_resource_file:{und:[field_file_reference]};
  field_repository_link:{und:[field_collection_item_reference_url]};
  field_label:{und:number|'_none'};
}

export interface field_collection_item_member
{
  field_team_member:{und:[field_collection_item_reference_entity]};
  field_sort_order:{und:[field_collection_item_reference_number]};
  field_membership_role:{und:[field_collection_item_reference_text]};
}

export interface field_collection_item_reference_row{
  value: number;
  revision_id: number;
}

export interface field_collection_item_reference_entity{
  target_id:string;
}

export class field_collection_item_reference_entity implements field_collection_item_reference_entity{
  constructor(){
    this.target_id = '';
  }
}

export interface field_collection_item_reference_number{
  value:number|'';
}

export class field_collection_item_reference_number implements field_collection_item_reference_number{
  constructor(){
    this.value = '';
  }
}

export interface field_collection_item_reference_text{
  value:string;
}

export class field_collection_item_reference_text implements field_collection_item_reference_text{
  constructor(){
    this.value = '';
  }
}

export interface field_collection_item_reference_url{
  url:URL|'';
}

export class field_collection_item_reference_url implements field_collection_item_reference_url{
  constructor(){
    this.url = '';
  }
}

export class field_collection_item_member implements field_collection_item_member{
  constructor(){
    this.field_team_member = {und:[new field_collection_item_reference_entity()]};
    this.field_membership_role = {und:[new field_collection_item_reference_text()]};
    this.field_sort_order = {und:[new field_collection_item_reference_number()]};
  }
}

export class field_collection_item_tool implements field_collection_item_tool{
  constructor(){
    this.field_tool_name = {und:[new field_collection_item_reference_entity()]};
    this.field_quantity = {und:[new field_collection_item_reference_text()]};
    this.field_sort_order = {und:[new field_collection_item_reference_number()]};
    this.field_description = {und:[new field_collection_item_reference_text()]};
    this.field_tool_url ={und:[new field_collection_item_reference_url]};
  }
}

export class field_collection_item_part implements field_collection_item_part{
  constructor(){
    this.field_part_name = {und:[new field_collection_item_reference_entity()]};
    this.field_quantity = {und:[new field_collection_item_reference_text()]};
    this.field_sort_order = {und:[new field_collection_item_reference_number()]};
  }
}

export class field_collection_item_material implements field_collection_item_material{
  constructor(){
    this.field_material_name = {und:[new field_collection_item_reference_entity()]};
    this.field_material_quantity = {und:[new field_collection_item_reference_text()]};
    this.field_sort_order = {und:[new field_collection_item_reference_number()]};
  }
}

export class field_collection_item_resource implements field_collection_item_resource{
  constructor(){
    this.field_resource_file = {und:[new field_file_reference()]};
    this.field_repository_link = {und:[new field_collection_item_reference_url()]};
    this.field_label = {und:'_none'};
  }
}