import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from "rxjs";
import * as globals from '../globals';

@Injectable()
export class SolrService {

  constructor(
    private http: Http,
  ) { }

  // getPosts(): Observable<any>{
  // 	return this.mainService.get(globals.endpoint + '/node').map(res => res.json()).catch(err => Observable.throw(err));
  // }

//http://localhost:8983/solr/drupal/select?indent=on&q=*:*&spellcheck.q=test&spellcheck=on&wt=json&fl=tm_item_label
  autocomplete(query: string): Observable<any> {
    return this.http.get(globals.solrPath + 'select?fq=tm_item_label:'+query+'&indent=on&rows=10&wt=json&fl=tm_item_label').map(res => res.json()).timeout(10000);
  }
}
