import { FileEntity } from '../Drupal';

export interface FileEntityManage extends FileEntity{
  url:URL;
  usage:FileUsage;
}

interface FileUsage {
  node?:number[];
  field_collection_item?:number[];
  profile2?:number[];
  user?:number[];
}
