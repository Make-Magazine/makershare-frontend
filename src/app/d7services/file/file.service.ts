import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, Response, Headers } from '@angular/http';
import { Observable } from "rxjs";
import { MainService } from '../main/main.service';
import * as globals from '../globals';

@Injectable()
export class FileService {

  constructor(private mainService: MainService) {}

  getAll(): Observable<any>{
    return this.mainService.get(globals.endpoint + '/file').map(res => res.json()).catch(err => Observable.throw(err));
  }

  getFileById(fid: number): Observable <any>{
    return this.mainService.get(globals.endpoint + '/file/' + fid).map(res => res.json()).catch(err => Observable.throw(err));
  }

  getUserFiles(uid: number): Observable <any>{
    return this.mainService.get(globals.endpoint + '/file?parameters[uid]=' + uid).map(res => res.json()).catch(err => Observable.throw(err));
  }

  SendCreatedFile(file): Observable<any>{
    return this.mainService.post(globals.endpoint + '/file', file).map(res => res.json()).catch(err => Observable.throw(err));

  }

  editFile(file): Observable<any>{
    return this.mainService.put(globals.endpoint + '/file/' + file.fid, file).map(res => res.json()).catch(err => Observable.throw(err));
  }

  deleteFile(fid): Observable<any>{
    return this.mainService.delete(globals.endpoint + '/file/' + fid).map(res => res.json()).catch(err => Observable.throw(err));
  }

}
