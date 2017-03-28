
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
    let fileObj = this;
    let obs = new Observable(observer => {
      // console.log('run');

      // var myReader:FileReader = new FileReader();
      // myReader.onloadend = function(){
      //   console.log('onloadend');
      //   fileObj.file = btoa(myReader.result);
      //   observer.next(fileObj.file);
      //   observer.complete();
      // };
      // myReader.readAsBinaryString(fileObj.file);
    });
    return obs;
  }
}
