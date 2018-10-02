import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MainService } from '../main/main.service';

@Injectable()
export class VocabularyService {
  constructor(private mainService: MainService) {}

  getVocabularies(): Observable<any> {
    return this.mainService.get('taxonomy_vocabulary');
  }

  getVocabulary(vid: number): Observable<any> {
    return this.mainService.get('taxonomy_vocabulary', vid);
  }

  createVocabulray(body): Observable<any> {
    return this.mainService.custompost('taxonomy_vocabulary', body);
  }

  updateVocabulray(body): Observable<any> {
    return this.mainService.put('taxonomy_vocabulary', body.vid, body);
  }

  deleteVocabulray(vid: number): Observable<any> {
    return this.mainService.delete('taxonomy_vocabulary', vid);
  }
}
