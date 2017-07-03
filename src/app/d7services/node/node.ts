export class Node {
  title: string;
  nid: number;
  body: string;
  author: number;
  status: number;
  comment: number;
  promote: number;
  sticky: number;
  type: string;
  language: string = "und";

  constructor(){
    this.status = 1;
    this.comment = 1;
    this.promote = 0;
    this.sticky = 0;
  }

}
