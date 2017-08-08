import { DrupalCustomField } from './custom-field';

export class FileEntity extends DrupalCustomField{

  fid?: number;
  filename: string;
  file: string;
  uri?: string;
  filemime?: string;
  filesize?: number;
  type?: string;
  status?: number;
  uri_full?: URL;
  uid?: number;
  filepath?: string;

  constructor(){
    super();
    this.file = '';
    this.filename = '';
  }

  init(){
    return [this];
  }
}