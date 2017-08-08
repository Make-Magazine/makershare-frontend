export abstract class Node {
  public title: string;
  public status: number;
  public promote: number;
  public sticky: number;
  public type: string;
  public comment: number;
  public name?: string;
  public picture?: number;
  public nid?: number;
  public vid?: number;
  public language?: string;
  public uid?: number;
  public created?: number;
  public changed?: number;
  public tnid?: number;
  public translate?: number;
  public uuid?: string;
  public uri?: string;
  public log?: number;
  public vuuid?: string;
  public revision_timestamp?: number;
  public revision_uid?: number;
  public cid?: number;
  public last_comment_timestamp?: number;
  public last_comment_name?: null | string;
  public last_comment_uid?: number;
  public comment_count?: number;

  constructor() {}

  public SetField(FieldName: string, value: number | string): void {
    this[FieldName] = value;
  }

  public GetField(FieldName: string): string | number {
    return this[FieldName];
  }

  protected InitFields(Type: string): void {
    this.title = '';
    this.status = null;
    this.promote = null;
    this.sticky = null;
    this.comment = 2;
    this.type = Type;
  }
}
