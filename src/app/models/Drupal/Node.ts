export interface Node{
  title: string;
  status: number;
  promote: number;
  sticky: number;
  type: string;
  
  name?: string;
  picture?: number;
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
  revision_uid?: number;
  cid?: number;
  last_comment_timestamp?: number;
  last_comment_name?: null|string;
  last_comment_uid?: number;
  comment_count?: number;
}

export abstract class Node implements Node{

  constructor(){
    this.Init();
  }

  public SetField(value:number|string|URL,FieldName:string):void{
    this[FieldName] = value;
  }

  public GetField(FieldName:string):any{
    return this[FieldName];
  }
  
  protected Init(Type?:string,Values?:any):void{
    this.title = "";
    this.status = 0;
    this.promote = 0;
    this.sticky = 0;
    this.comment = 2;
    this.type = Type;
  }
}