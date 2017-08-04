import { FileEntity, Node } from 'app/CORE/models/drupal';

export interface FileEntityManage extends FileEntity {
  url: URL;
  usage: FileUsage;
  sourceType: string;
}

interface FileUsage {
  node?: Node[];
  field_collection_item?: Node[];
  profile2?: number[];
}
