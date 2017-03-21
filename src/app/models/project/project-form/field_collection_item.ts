import {field_file_reference} from './field_file_reference'

export interface field_collection_item_tool
{
  field_tool_name:{und:[field_coolection_item_reference_entity]};
  field_sort_order:{und:[field_coolection_item_reference_number]};
  field_tool_url :{und:[field_coolection_item_reference_url]};
  field_description:{und:[field_coolection_item_reference_text]};
  field_material_quantity:{und:[field_coolection_item_reference_text]};
}

export interface field_collection_item_part
{
  field_part_name:{und:[field_coolection_item_reference_entity]};
  field_sort_order:{und:[field_coolection_item_reference_number]};
  field_material_quantity:{und:[field_coolection_item_reference_text]};
}

export interface field_collection_item_material
{
  field_material_name:{und:[field_coolection_item_reference_entity]};
  field_sort_order:{und:[field_coolection_item_reference_number]};
  field_material_quantity:{und:[field_coolection_item_reference_text]};
}

export interface field_collection_item_resource
{
  field_resource_file:{und:[field_file_reference]};
  field_repository_link:{und:[field_coolection_item_reference_url]};
  field_label:{und:number};
}

export interface field_collection_item_member
{
  field_team_member:{und:[field_coolection_item_reference_entity]};
  field_sort_order:{und:[field_coolection_item_reference_number]};
  field_membership_role:{und:[field_coolection_item_reference_text]};
}

interface field_coolection_item_reference_entity{
  target_id:string;
}

interface field_coolection_item_reference_number{
  value:number;
}

interface field_coolection_item_reference_text{
  value:string;
}

interface field_coolection_item_reference_url{
  url:URL;
}