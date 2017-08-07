export interface UndValue {
  value: string;
}

export interface ICommentBody {
  und: Array<UndValue>;
}

export interface IComment {
  subject: string;
  comment_body: ICommentBody;

  //  comment_body:{und:{value:string}[]};
  nid: number;
}
