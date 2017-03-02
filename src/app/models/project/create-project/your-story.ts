import { CoverImage } from './cover-image'

export interface CreateYourStoryModel{
  title: string;
  Categories: Category[];
  field_teaser: string;
  field_cover_photo: CoverImage;
  field_show_tell_video: string;
  field_aha_moment: string;
  field_uh_oh_moment: string;
  field_story: string;
  field_tags: string[];
}

export interface Category{
  display:string,
  value:number,
}