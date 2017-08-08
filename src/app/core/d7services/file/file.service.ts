import { Injectable } from '@angular/core';
import { MainService } from '../main/main.service';
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
    return this.mainService.put('file', file.fid, file);
  }

  deleteFile(fid): Observable<any> {
    return this.mainService.delete('file', fid);
  }

  getSiteMap(): Observable<any> {
    const out = this.mainService.get('', 'sitemap.xml', true);
     return out;
  }
}
