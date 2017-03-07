export interface field_collection_item_tool
{
  field_tool_name:{und:[field_coolection_item_reference_entity]};
  field_sort_order:{und:[field_coolection_item_reference_number]};
  field_tool_url :{und:[field_coolection_item_reference_url]};
  field_description:{und:[field_coolection_item_reference_text]};
  field_material_quantity:{und:[field_coolection_item_reference_text]};
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