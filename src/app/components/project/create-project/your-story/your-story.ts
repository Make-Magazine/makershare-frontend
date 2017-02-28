export interface CreateYourStoryModel{
  title:string;
  Categories:[{display:string,value:number}];
  field_teaser:string;
  field_cover_photo: {filename : string,file : string};
  field_show_tell_video:string;
  field_aha_moment:string;
  field_uh_oh_moment:string;
  field_story:string;
  field_tags:[string];
}