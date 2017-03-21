export interface Node{
  title: string;
  status: number;
  promote: number;
  sticky: number;
  readonly type: string;
  
  nid?: number;
  vid?: number;
  language?: string;
  uid?: number;
  created?: number;
  changed?: number;
  comment?: number;
  tnid?: number;
  translate?: number;
  uuid?: string;
  uri?: URL;
  log?: number;
  vuuid?: string;
  revision_timestamp?: number;

  SetField(value:number|string|URL,FieldName:string):void;
  GetField(FieldName:string):string|number|URL;
}

export abstract class Node implements Node{
  constructor(){
    this.title = "Untitled";
    this.status = 0;
    this.promote = 0;
    this.sticky = 0;
  }

  SetField(value:number|string|URL,FieldName:string):void{
    this[FieldName] = value;
  }

  GetField(FieldName:string):string|number|URL{
    return this[FieldName];
  }
}