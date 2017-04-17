export interface FileEntity {
  fid?: number;
  filename: string;
  file: string;
  uri?: string;
  filemime?: string;
  filesize?:number;
  type?:string;
  status?:number;
}
