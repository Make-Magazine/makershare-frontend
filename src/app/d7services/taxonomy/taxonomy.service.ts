import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { MainService} from '../main/main.service';

@Injectable()
export class TaxonomyService {

  constructor(private mainService: MainService) { }

  getAll(): Observable<any>{
    return this.mainService.get('/api/taxonomy_term').map(response => response.json()).catch(err => Observable.throw(err));
  }

  getVocalbularyTerms(vid: number): Observable<any>{
    return this.mainService.get('/api/taxonomy_term?parameters['+ vid +']=').map(response => response.json()).catch(err => Observable.throw(err));
  }

  getTermByName(name: string): Observable<any>{
    return this.mainService.get('/api/taxonomy_term?parameters[name]=' + name).map(response => response.json()).catch(err => Observable.throw(err));
  }

  createTerm(term): Observable<any>{
    return this.mainService.post('/api/taxonomy_term', term).map(response => response.json()).catch(err => Observable.throw(err));
  }

  updateTerm(term): Observable<any>{
    return this.mainService.put('/api/taxonomy_term/' + term.vid, term).map(response => response.json()).catch(err => Observable.throw(err));
  }

  deleteTerm(vid: number): Observable<any>{
    return this.mainService.delete('/api/taxonomy_term/' + vid).map(response => response.json()).catch(err => Observable.throw(err));
  }
}
