export interface Notification{
  uid?: number;
  type:string;
  user_alias?:string;
  username?:string;
  seen:0|1;
  nid?:number;
  title?:string;
  mid:number;
  showcase_nid?:number;
  showcase_title?:string;
}