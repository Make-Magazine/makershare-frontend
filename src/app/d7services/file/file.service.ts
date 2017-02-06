import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { MainService } from '../main/main.service';

@Injectable()
export class FileService {

  constructor(private mainService: MainService) {}

  getAll(): Observable<any>{
    return this.mainService.get('/api/file').map(res => res.json()).catch(err => Observable.throw(err));
  }

  getFileById(fid: number): Observable <any>{
    return this.mainService.get('/api/file/' + fid).map(res => res.json()).catch(err => Observable.throw(err));
  }

  getUserFiles(uid: number): Observable <any>{
    return this.mainService.get('/api/file?parameters[uid]=' + uid).map(res => res.json()).catch(err => Observable.throw(err));
  }

  SendCreatedFile(file): Observable<any>{
    return this.mainService.post('/api/file', file).map(res => res.json()).catch(err => Observable.throw(err));

  }

  editFile(file): Observable<any>{
    return this.mainService.put('/api/file/' + file.fid, file).map(res => res.json()).catch(err => Observable.throw(err));
  }

  deleteFile(fid): Observable<any>{
    return this.mainService.delete('/api/file/' + fid).map(res => res.json()).catch(err => Observable.throw(err));
  }

}
