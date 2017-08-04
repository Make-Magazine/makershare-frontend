import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Singleton } from 'app/CORE';

@Injectable()
export class SolrService {
  constructor(private http: Http) {}

  // http://localhost:8983/solr/drupal/select?indent=on&q=*:*&spellcheck.q=test&spellcheck=on&wt=json&fl=tm_item_label
  autocomplete(query: string): Observable<any> {
    query = encodeURIComponent(query);
    // return this.http.get(Singleton.Settings.solrPath + 'select?fq=tm_item_label:'+query+'&indent=on&rows=10&wt=json&fl=tm_item_label,ss_item_bundle,ss_item_entity_id,ss_item_type').timeout(10000);
    return this.http
      .get(
        Singleton.Settings.solrPath +
          'select?fq=tm_title:(' +
          query +
          ') OR tm_field_first_name:(' +
          query +
          ') OR tm_field_last_name:(' +
          query +
          ') OR tm_name:(' +
          query +
          ')&spellcheck=true&wt=json&fl=tm_title,tm_name,tm_field_first_name,tm_field_last_name,tm_name',
      )
      .timeout(10000);
  }

  // select general query
  selectContent(
    query: string,
    count: number = 10,
    skip: number,
    type: string,
  ): Observable<any> {
    query = encodeURIComponent(query);
    return this.http
      .get(
        Singleton.Settings.solrPath +
          'select?fq=ss_type:' +
          type +
          '&fq=tm_title"' +
          query +
          '"&rows=' +
          count +
          '&start=' +
          skip +
          '&indent=on&wt=json&fl=is_nid',
      )
      .timeout(10000);
  }

  // select projects query
  selectProjects(query: string, count: number = 10): Observable<any> {
    query = encodeURIComponent(query);
    let category = query.charAt(0).toUpperCase() + query.slice(1);
    return this.http
      .get(
        Singleton.Settings.solrPath +
          'select?fq=ss_type:project&fq=tm_title:"' +
          query +
          '" OR sm_field_categories$name:("' +
          category +
          '")&rows=' +
          count +
          '&indent=on&wt=json&fl=is_nid&fq=is_field_visibility2:370',
      )
      .timeout(10000);
  }

  // select challenges query
  selectChallenges(query: string, count: number = 10): Observable<any> {
    query = encodeURIComponent(query);
    let category = query.charAt(0).toUpperCase() + query.slice(1);
    return this.http
      .get(
        Singleton.Settings.solrPath +
          'select?fq=ss_type:challenge&fq=tm_title:"' +
          query +
          '" OR sm_field_challenge_category$name:("' +
          category +
          '")&rows=' +
          count +
          '&indent=on&wt=json&fl=is_nid',
      )
      .timeout(10000);
  }

  // select showcases query
  selectShowcases(query: string, count: number = 10): Observable<any> {
    query = encodeURIComponent(query);
    let category = query.charAt(0).toUpperCase() + query.slice(1);
    return this.http
      .get(
        Singleton.Settings.solrPath +
          'select?fq=ss_type:showcase&fq=tm_title:"' +
          query +
          '" OR sm_field_categories$name:("' +
          category +
          '")&rows=' +
          count +
          '&indent=on&wt=json&fl=is_nid',
      )
      .timeout(10000);
  }

  // select learning sequence query
  selectworkshops(query: string, count: number = 10): Observable<any> {
    query = encodeURIComponent(query);
    let category = query.charAt(0).toUpperCase() + query.slice(1);
    return this.http
      .get(
        Singleton.Settings.solrPath +
          'select?fq=ss_type:learning_sequence&fq=tm_title:"' +
          query +
          '" OR sm_field_categories$name:("' +
          category +
          '")&rows=' +
          count +
          '&indent=on&wt=json&fl=is_nid',
      )
      .timeout(10000);
  }

  // select users query
  selectUsers(
    query: string,
    count: number = 10,
    skip: number = 0,
  ): Observable<any> {
    // query = encodeURIComponent(query);
    let category = query.charAt(0).toUpperCase() + query.slice(1);
    //return this.http.get(Singleton.Settings.solrPath + 'select?fq=index_id:user_index&fq=spell:'+query+'&rows='+count+'&indent=on&wt=json&fl=is_uid&fq=is_status:1').timeout(10000);
    return this.http
      .get(
        Singleton.Settings.solrPath +
          'select?fq=index_id:user_index&fq=tm_field_first_name:(' +
          query +
          ') OR tm_field_last_name:(' +
          query +
          ') OR tm_profile_maker$field_address$country:("' +
          query +
          '") OR tm_profile_maker$field_address$administrative_area:("' +
          query +
          '") OR tm_profile_maker$field_address$locality:("' +
          query +
          '") OR tm_profile_maker$field_maker_interests$name:("' +
          category +
          '")&indent=on&fl=is_uid&wt=json&rows=' +
          count,
      )
      .timeout(10000);
  }
}
