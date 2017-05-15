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
    //return this.http.get(globals.solrPath + 'select?fq=tm_item_label:'+query+'&indent=on&rows=10&wt=json&fl=tm_item_label,ss_item_bundle,ss_item_entity_id,ss_item_type').map(res => res.json()).timeout(10000);
    return this.http.get(globals.solrPath + 'select?q=content:'+query+'&spellcheck=true&wt=json&fl=tm_title,tm_name').map(res => res.json()).timeout(10000);
    
  }

  // select general query
  selectContent(query: string,count: number = 10, skip:number, type:string): Observable<any> {
     return this.http.get(globals.solrPath + 'select?fq=ss_type:'+type+'&f='+query+'&rows='+count+'&start='+skip+'&indent=on&wt=json&fl=is_nid').map(res => res.json()).timeout(10000);
  }

  // select projects query
  selectProjects(query: string,count: number = 10): Observable<any> {
     return this.http.get(globals.solrPath + 'select?fq=ss_type:project&fq=tm_title:'+query+'&rows='+count+'&indent=on&wt=json&fl=is_nid').map(res => res.json()).timeout(10000);
  }

  // select challenges query
  selectChallenges(query: string,count: number = 10): Observable<any> {
     return this.http.get(globals.solrPath + 'select?fq=ss_type:challenge&fq=tm_title:'+query+'&rows='+count+'&indent=on&wt=json&fl=is_nid').map(res => res.json()).timeout(10000);
  }  

  // select showcases query
  selectShowcases(query: string,count: number = 10): Observable<any> {
     return this.http.get(globals.solrPath + 'select?fq=ss_type:showcase&fq=tm_title:'+query+'&rows='+count+'&indent=on&wt=json&fl=is_nid').map(res => res.json()).timeout(10000);
  }

  // select learning sequence query
  selectworkshops(query: string,count: number = 10): Observable<any> {
     return this.http.get(globals.solrPath + 'select?fq=ss_type:learning_sequence&fq=tm_title:'+query+'&rows='+count+'&indent=on&wt=json&fl=is_nid').map(res => res.json()).timeout(10000);
  }

  // select users query
  selectUsers(query: string,count: number = 10, skip: number = 0): Observable<any> {
     //return this.http.get(globals.solrPath + 'select?fq=index_id:user_index&fq=spell:'+query+'&rows='+count+'&indent=on&wt=json&fl=is_uid&fq=is_status:1').map(res => res.json()).timeout(10000);
     return this.http.get(globals.solrPath + 'select?fq=index_id:user_index&fq=spell:'+query+'&indent=on&wt=json&rows='+ count).map(res => res.json()).timeout(10000);
     
  }      
}
