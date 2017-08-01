import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { MainService} from '../main/main.service';

@Injectable()
export class VocabularyService {

  constructor(private mainService: MainService) { }

  getVocabularies(): Observable<any>{
    return this.mainService.get('taxonomy_vocabulary').map(response => response.json()).catch(err => Observable.throw(err));
  }

  getVocabulary(vid: number): Observable<any>{
    return this.mainService.get('taxonomy_vocabulary/' + vid).map(response => response.json()).catch(err => Observable.throw(err));
  }

  createVocabulray(body): Observable<any> {
    return this.mainService.post('taxonomy_vocabulary', body).map(response => response.json()).catch(err => Observable.throw(err));
  }

  updateVocabulray(body): Observable<any> {
    return this.mainService.put('taxonomy_vocabulary/' + body.vid, body).map(response => response.json()).catch(err => Observable.throw(err));
  }

  deleteVocabulray(vid: number): Observable<any> {
    return this.mainService.delete('taxonomy_vocabulary/' +vid).map(response => response.json()).catch(err => Observable.throw(err));
  }
}
