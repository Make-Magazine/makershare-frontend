export class Message {
  constructor(
    public to: string,
    public subject: string,
    public messageContent: string,
    public thread:number,
  ) {  }
}