import { FileEntity } from '../Drupal';
import { Node } from '../Drupal';

export interface FileEntityManage extends FileEntity{
  url:URL;
  usage:FileUsage;
  sourceType:string;
}

interface FileUsage {
  node?:Node[];
  field_collection_item?:Node[];
  profile2?:number[];
}
