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

export class FileEntity implements FileEntity{
  constructor(){
    this.file = '';
    this.filename = '';
  }
}