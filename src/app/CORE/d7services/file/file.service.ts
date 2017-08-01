import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { MainService } from '../main/main.service';

@Injectable()
export class FileService {

  constructor(private mainService: MainService) {}

  getAll(): Observable<any>{
    return this.mainService.get('file').map(res => res.json()).catch(err => Observable.throw(err));
  }

  getFileById(fid: number): Observable <any>{
    return this.mainService.get('file/' + fid).map(res => res.json()).catch(err => Observable.throw(err));
  }

  getUserFiles(uid: number): Observable <any>{
    return this.mainService.get('file?parameters[uid]=' + uid).map(res => res.json()).catch(err => Observable.throw(err));
  }

  SendCreatedFile(file): Observable<any>{
    return this.mainService.post('file', file).map(res => res.json()).catch(err => Observable.throw(err));

  }

  editFile(file): Observable<any>{
    return this.mainService.put('file/' + file.fid, file).map(res => res.json()).catch(err => Observable.throw(err));
  }

  deleteFile(fid): Observable<any>{
    return this.mainService.delete('file/' + fid).map(res => res.json()).catch(err => Observable.throw(err));
  }

  getSiteMap(): Observable<any>{
    let out=this.mainService.get('sitemap.xml',true);
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
