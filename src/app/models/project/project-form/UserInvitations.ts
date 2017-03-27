export interface UserInvitations {
  uid:number,
  mails?:string[]
}

export class UserInvitations implements UserInvitations {
  constructor(uid){
    this.uid = uid;
    this.mails = [];
  }
}