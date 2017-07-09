export interface IComment{
    subject: string;
    comment_body:ICommentBody;

    //  comment_body:{und:{value:string}[]};
    nid: number;
}

export interface ICommentBody{
    und:Array<value>;
};
export interface value {
    value:string;
}
