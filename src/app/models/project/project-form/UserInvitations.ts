export interface UserInvitations {
  uid:number,
  project:string,
  mails?:string[]
}

export class UserInvitations implements UserInvitations {
  constructor(uid, project){
    this.uid = uid;
    this.project = project;
    this.mails = [];
  }
}