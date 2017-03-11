/**
 * Project model
 * located at models/create-project/project.ts
 * the main project object which will be posted or retrieved from drupal
 */

import { field_text } from './field_text';
import { field_URL } from './field_URL';
import { field_collection_item_material,field_collection_item_part,field_collection_item_resource,field_collection_item_tool,field_collection_item_member } from './field_collection_item';
import { field_entity_reference } from './field_entity_reference';
import { field_number } from './field_number';
import { field_file_reference } from './field_file_reference';

export interface Project {
	uid?: number;
	nid?: number;
	title: string;
	body?:{und:field_text[]};
	status: number;
	promote: number;
	sticky: number;
	readonly type: string;
	created?: number;
	changed?: number;
	field_story:{und:field_text[]};
	field_aha_moment?:{und:field_text[]};
	field_uh_oh_moment?:{und:field_text[]};
	field_teaser?:{und:field_text[]};
	field_tools?:{und:field_collection_item_tool[]};
	field_materials?:{und:field_collection_item_material[]};
	field_parts?:{und:field_collection_item_part[]};
	field_difficulty?:{und:number};
	field_duration?:{und:number};
	field_credit_your_inspiration?:{und:field_text[]};
	field_show_tell_video?:{und:field_URL[]};
	field_tags?:{und:string};
	field_resources?:{und:field_collection_item_resource[]};
	field_collaborators?:{und:field_entity_reference[]};
	field_sort_order?:{und:field_number[]};
	field_maker_memberships?:{und:field_collection_item_member[]};
	field_original_team_members?:{und:field_entity_reference[]};
	field_total_forks?:{und:field_number[]};
	field_forks?:{und:field_entity_reference[]};
	field_visibility2:{und:number[]};
	field_mfba17_project_id?:{und:field_text[]};
	field_cover_photo:{und:field_file_reference[]};
	field_how_to?:{und:field_text[]};
	field_categories:{und:number[]};
	path?: URL;
	last_comment_timestamp?: number;
	last_comment_uid?: number,
	comment_count?: number,
}