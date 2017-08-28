export class FieldFileReference{
  fid: number|'';
  uid?: number;
  filename?: string;
  uri?: string;
  filemime?: string;
  filesize?: number;
  status?: number;
  timestamp?: number;
  type?: string;
  alt?: string;
  title?: string;
  height?: number;
  width?: number;
  constructor(){
    this.fid = '';
  }
}