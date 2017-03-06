import { FileEntity } from './file_entity';

export interface CreateYourStoryModel{
  title: string;
  Categories: YourStoryCategory[];
  field_teaser: string;
  field_cover_photo: FileEntity,
  field_show_tell_video: string;
  field_aha_moment: string;
  field_uh_oh_moment: string;
  field_story: string;
  field_tags: string[];
}

export interface YourStoryCategory{
  display:string,
  value:number,
}