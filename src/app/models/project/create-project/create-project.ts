import { CoverImage } from './cover-image'

export interface CreateProject {
	nid?: number;
	title : string;
	field_teaser : string;
	field_cover_photo :  CoverImage;
	field_categories : Category[]; 
	field_story : string;
	field_show_tell_video : string;
	field_aha_moment : string;  
  field_uh_oh_moment : string;
	field_tags? : Tag[];
	field_difficulty : Difficulty;
	field_duration :  Duration;
	field_credit_your_inspiration : string;
	field_collaborators : Collaborator[];
	field_sort_order : number;
	field_tools?: Tool[];
	field_materials?: Material[];
	field_parts?: Part[];
	field_resources?: Resource[];
	field_maker_memberships: Membership[];
  field_original_team_members : TeamMember[];
  field_total_forks : number;
  field_forks? : Fork[];
  field_visibility2 : number;
  field_mfba17_project_id : number;
	field_how_to: string;
	status: number;
}

interface Category{
	tid: number,	
}

interface Tag{
	tid: number,
}

interface Difficulty{
	tid: number,
}

interface Duration{
	tid: number,
}

interface Collaborator{
	target_id : number,
}

interface Tool{
	tool_id : number,
	tool_url? : string,
	tool_sort_order : number,
	tool_description? : string,
	tool_quantity : string,
}

interface Material{
	material_id : number,
	material_quantity : string,
	material_sort_order : number,
}

interface Part{
	part_id : number,
	part_sort_order : number,
	part_quantity : string,
}

interface Resource{
	filename : string,
	file : string,
	resource_repository_link? : string,
	resource_label : number,
}

interface Membership{
	membership_role? : string,
	membership_sort_order : number,
	membership_team : number,
}

interface TeamMember{
	target_id : number,
}

interface Fork{
	target_id : number,
}