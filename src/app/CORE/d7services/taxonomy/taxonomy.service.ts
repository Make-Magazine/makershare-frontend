import { Injectable } from '@angular/core';
import { MainService } from 'app/CORE/d7services/main/main.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TaxonomyService {
  constructor(private mainService: MainService) {}

  getAll(): Observable<any> {
    return this.mainService.get('taxonomy_term');
  }

  getVocalbularyTerms(vid: number): Observable<any> {
    return this.mainService.get('taxonomy_term?parameters[vid]=' + vid);
  }

  getTermByName(name: string): Observable<any> {
    return this.mainService.get('taxonomy_term?parameters[name]=' + name);
  }

  getTermByID(tid: number): Observable<any> {
    return this.mainService.get('taxonomy_term/' + tid);
  }

  createTerm(term): Observable<any> {
    return this.mainService.custompost('taxonomy_term', term);
  }

  updateTerm(term): Observable<any> {
    return this.mainService.put('taxonomy_term/' + term.vid, term);
  }

  deleteTerm(tid: number): Observable<any> {
    return this.mainService.delete('taxonomy_term/' + tid);
  }
}
