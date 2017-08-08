import { FileEntity, NodeEntity } from '../drupal';

export interface FileEntityManage extends FileEntity {
  url: URL;
  usage: FileUsage;
  sourceType: string;
}

interface FileUsage {
  node?: NodeEntity[];
  field_collection_item?: NodeEntity[];
  profile2?: number[];
}