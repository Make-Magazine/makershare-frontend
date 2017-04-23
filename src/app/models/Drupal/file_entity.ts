export interface FileEntity {
  fid?: number;
  filename: string;
  file: string;
  uri?: string;
  filemime?: string;
  filesize?:number;
  type?:string;
  status?:number;
  uri_full?:URL;
  uid?:number;
  filepath?:string;
}
