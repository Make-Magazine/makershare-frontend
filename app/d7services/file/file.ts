
import { Observable } from "rxjs";

export class File {
  file;
  filename: string;
  filepath: string;
  uid: number;

  constructor() {

  }

  convertFile(): Observable<any>{
    // console.log('start convertFile function');
    let obs = new Observable(observer => {
    });
    return obs;
  }
}
