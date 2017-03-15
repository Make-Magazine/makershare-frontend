import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { MainService} from '../main/main.service';
import * as globals from '../globals';

@Injectable()
export class TaxonomyService {

  constructor(private mainService: MainService) { }

  getAll(): Observable<any>{
    return this.mainService.get(globals.endpoint + '/taxonomy_term').map(response => response.json()).catch(err => Observable.throw(err));
  }

  getVocalbularyTerms(vid: number): Observable<any>{
    return this.mainService.get(globals.endpoint + '/taxonomy_term?parameters[vid]='+vid).map(response => response.json()).catch(err => Observable.throw(err));
  }

  getTermByName(name: string): Observable<any>{
    return this.mainService.get(globals.endpoint + '/taxonomy_term?parameters[name]=' + name).map(response => response.json()).catch(err => Observable.throw(err));
  }

  getTermByID(tid: number): Observable<any>{
    return this.mainService.get(globals.endpoint + '/taxonomy_term/' + tid).map(response => response.json()).catch(err => Observable.throw(err));
  }

  createTerm(term): Observable<any>{
    return this.mainService.post(globals.endpoint + '/taxonomy_term', term).map(response => response.json()).catch(err => Observable.throw(err));
  }

  updateTerm(term): Observable<any>{
    return this.mainService.put(globals.endpoint + '/taxonomy_term/' + term.vid, term).map(response => response.json()).catch(err => Observable.throw(err));
  }

  deleteTerm(tid: number): Observable<any>{
    return this.mainService.delete(globals.endpoint + '/taxonomy_term/' + tid).map(response => response.json()).catch(err => Observable.throw(err));
  }
}
