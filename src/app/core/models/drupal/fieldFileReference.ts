export interface IFieldFileReference {
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
}

export class FieldFileReference implements IFieldFileReference {
  fid;

  constructor() {
    this.fid = '';
  }
}