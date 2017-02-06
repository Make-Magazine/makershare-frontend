import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, Response, Headers } from '@angular/http';
import { Observable } from "rxjs";
import { MainService } from '../main/main.service';
import { CookieService } from 'angular2-cookie/core';

@Injectable()
export class NodeService {

  constructor(private mainService: MainService) { }

  getPosts(): Observable<any>{
  	return this.mainService.get('/api/node').map(res => res.json()).catch(err => Observable.throw(err));
  }

  createNode(body): Observable<any>{
  	return this.mainService.post('/api/node', body).map(res => res.json()).catch(err => Observable.throw(err));
  }

  UpdateNode(body): Observable<any>{
  	return this.mainService.put('/api/node/' + body.nid, body).map(res => res.json()).catch(err => Observable.throw(err));
  }

  DeleteNode(nid): Observable<any>{
  	return this.mainService.delete('/api/node/' + nid).map(res => res.json()).catch(err => Observable.throw(err));
  }
}
