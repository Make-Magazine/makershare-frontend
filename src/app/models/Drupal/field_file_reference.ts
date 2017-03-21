export interface field_file_reference {
  fid: number;
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

export class field_file_reference implements field_file_reference {
  constructor(){
    this.fid = 0;
  }
}