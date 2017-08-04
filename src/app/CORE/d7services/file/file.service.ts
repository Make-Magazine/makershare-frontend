import { Injectable } from '@angular/core';
import { MainService } from 'app/CORE/d7services/main/main.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FileService {
  constructor(private mainService: MainService) {}

  getAll(): Observable<any> {
    return this.mainService.get('file');
  }

  getFileById(fid: number): Observable<any> {
    return this.mainService.get('file/' + fid);
  }

  getUserFiles(uid: number): Observable<any> {
    return this.mainService.get('file?parameters[uid]=' + uid);
  }

  SendCreatedFile(file): Observable<any> {
    return this.mainService.custompost('file', file);
  }

  editFile(file): Observable<any> {
    return this.mainService.put('file/' + file.fid, file);
  }

  deleteFile(fid): Observable<any> {
    return this.mainService.delete('file/' + fid);
  }

  getSiteMap(): Observable<any> {
    let out = this.mainService.get('sitemap.xml', true);
    return out;
  }
  // getXMLFile():Observable<any>{
  //     var obs = Observable.create(observer => {
  //       this.getSiteMap().subscribe( data => {
  //         console.log(data);
  //           if(data ){

  //             observer.next(true);
  //             observer.complete();

  //           }else{
  //             observer.next(false);
  //             observer.complete();
  //           }
  //       });

  //   });
  //   return obs;

  // }
}
