import { FileEntityManage } from '../filemanager/file-entity-manage';

export interface FileManageService {
  count: number;
  files: FileEntityManage[];
  quota: number;
}
