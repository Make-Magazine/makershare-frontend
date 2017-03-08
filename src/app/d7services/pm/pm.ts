export class Message {
  constructor(
    public subject: string,
    public body: string,
    public recipients: string,
    public thread_id:number,
  ) {  }
}