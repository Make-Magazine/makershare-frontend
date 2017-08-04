import { FileEntityManage } from 'app/CORE/models/filemanager/file-entity-manage';

export interface FileManageService {
  count: number;
  files: FileEntityManage[];
  quota: number;
}
