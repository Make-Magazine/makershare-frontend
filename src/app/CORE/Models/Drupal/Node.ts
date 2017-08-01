export abstract class Node{
  protected title: string;
  protected status: number;
  protected promote: number;
  protected sticky: number;
  protected type: string;
  protected comment: number;
  
  protected name?: string;
  protected picture?: number;
  protected nid?: number;
  protected vid?: number;
  protected language?: string;
  protected uid?: number;
  protected created?: number;
  protected changed?: number;
  protected tnid?: number;
  protected translate?: number;
  protected uuid?: string;
  protected uri?: string;
  protected log?: number;
  protected vuuid?: string;
  protected revision_timestamp?: number;
  protected revision_uid?: number;
  protected cid?: number;
  protected last_comment_timestamp?: number;
  protected last_comment_name?: null|string;
  protected last_comment_uid?: number;
  protected comment_count?: number;

  constructor(){
  }

  public SetField(FieldName:string, value:number|string):void{
    this[FieldName] = value;
  }

  public GetField(FieldName:string):string|number{
    return this[FieldName];
  }
  
  protected InitFields(Type:string):void{
    this.title = "";
    this.status = null;
    this.promote = null;
    this.sticky = null;
    this.comment = 2;
    this.type = Type;
  }
}