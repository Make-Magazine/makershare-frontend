export interface UserInvitations {
  uid:number,
  project:number,
  mails?:string[]
}

export class UserInvitations implements UserInvitations {
  constructor(uid, project){
    this.uid = uid;
    this.project = project;
    this.mails = [];
  }
}