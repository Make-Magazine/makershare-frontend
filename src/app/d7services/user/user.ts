export class User {
  name: string;
  uid: number;
  mail: string;
  pass: string;
  status: number;
  roles: {};
  constructor (){
    this.status = 1;
    this.roles = {"2": 2, "3": 3};
  }
}
