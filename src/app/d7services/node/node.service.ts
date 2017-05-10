import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { MainService } from '../main/main.service';
import * as globals from '../globals';

@Injectable()
export class NodeService {

  constructor(private mainService: MainService) { }

  getPosts(): Observable<any>{
  	return this.mainService.get(globals.endpoint + '/node').map(res => res.json()).catch(err => Observable.throw(err));
  }

  getNode(nid): Observable<any>{
  	return this.mainService.get(globals.endpoint + '/node/'+nid).map(res => res.json()).catch(err => Observable.throw(err));
  }

  createNode(body): Observable<any>{
  	return this.mainService.post(globals.endpoint + '/node', body).map(res => res.json()).catch(err => Observable.throw(err));
  }

  createProject(body): Observable<any>{
  	return this.mainService.post(globals.endpoint + '/maker_project_api/', body).map(res => res.json()).catch(err => Observable.throw(err));
  }

  UpdateNode(body): Observable<any>{
  	return this.mainService.put(globals.endpoint + '/node/' + body.nid, body).map(res => res.json()).catch(err => Observable.throw(err));
  }

  DeleteNode(nid): Observable<any>{
  	return this.mainService.delete(globals.endpoint + '/node/' + nid).map(res => res.json()).catch(err => Observable.throw(err));
  }

  getIdFromUrl(url: string, type: string): Observable<any>{
    let body = {
      url: url,
      type: type,
    }
    return this.mainService.post(globals.endpoint + '/maker_urls/get_id', body).map(res => res.json()).catch(err => Observable.throw(err));
  }

  getUrlFromId(nid: number, type: string): Observable<any>{
    let body = {
      nid: nid,
      type: type,
    }
    return this.mainService.post(globals.endpoint + '/maker_urls/get_url', body).map(res => res.json()).catch(err => Observable.throw(err));
  }


}
