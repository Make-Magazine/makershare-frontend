import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { MainService } from '../main/main.service';
import * as globals from '../globals';

@Injectable()
export class FlagService {

  constructor(private mainService: MainService) { }

  isFlagged(nid: number, uid: number, flag_name: string): Observable<any>{
    var obj = {
      "flag_name" : flag_name,// like, fork, node_bookmark
      "entity_id" : nid,
      "uid" : uid,
    }   
    return this.mainService.post(globals.endpoint + '/flag/is_flagged', obj).map(response => response.json()).catch(err => Observable.throw(err));
  }
  flag(nid: number,  uid: number, flag_name: string, fields?: {}): Observable<any>{
    var obj = {
      "flag_name" : flag_name,
      "entity_id" : nid,
      "action" : "flag",
      "uid" : uid,
    }
    if(fields){
      Object.assign(obj, fields);
    }
    
    return this.mainService.post(globals.endpoint + '/flag/flag', obj).map(response => response.json()).catch(err => Observable.throw(err));
  }
  unflag(nid: number,  uid: number, flag_name: string): Observable<any>{
    var obj = {
      "flag_name" : flag_name,
      "entity_id" : nid,
      "action" : "unflag",
      "uid" : uid,
    }
    return this.mainService.post(globals.endpoint + '/flag/flag', obj).map(response => response.json()).catch(err => Observable.throw(err));
  }
  flagCount(nid: number, flag_name): Observable<any>{
    var obj = {
      "flag_name" : flag_name,
      "entity_id" : nid
    }    
    return this.mainService.post(globals.endpoint + '/flag/countall', obj).map(response => response.json()).catch(err => Observable.throw(err));
  }
}
