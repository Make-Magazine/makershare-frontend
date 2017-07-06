import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from "rxjs";
import { CookieService } from 'ngx-cookie';
import * as globals from '../globals';


@Injectable()
export class MainService {

  private serviceURL: string = globals.domain;
  constructor(private http: Http, private cookieService: CookieService) {   }


  GetOptions(){
    let headers = new Headers();
    headers.set('X-CSRF-Token', this.getToken());
    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');
    let options = new RequestOptions();
    options.headers = headers;
    options.withCredentials = true;
    return options;
  }

 	getURL(url: string): string {
 		return this.serviceURL + url;
 	}

  get(endpoint: string): Observable<Response>{
  	let url = this.getURL(endpoint);
  	return this.http.get(url,this.GetOptions()).timeout(20000);
  }

  post(endpoint: string, body?: any): Observable<Response>{
  	let url = this.getURL(endpoint);
  	return this.http.post(url, body ? body: {},this.GetOptions()).timeout(20000);
  }

  put(endpoint: string, body: any): Observable<Response>{
  	let url = this.getURL(endpoint);
  	return this.http.put(url, body,this.GetOptions()).timeout(20000);
  }

  delete(endpoint: string): Observable<Response>{
  	let url = this.getURL(endpoint);
  	return this.http.delete(url,this.GetOptions()).timeout(20000);
  }

  saveCookies(token: string, session_name: string, sessid: string){
    var expires = new Date();
    expires.setDate(expires.getDate() + 23);
    var options = {
      expires: expires
    };
    var someText = token.replace(/(\r\n|\n|\r)/gm,"");
    var tokenFinal = someText.split(' ').join('')

    this.cookieService.put('sessid', sessid, options);
    this.cookieService.put('session_name', session_name, options);
    this.cookieService.put('token', tokenFinal, options);
  }

  removeCookies(){
    this.cookieService.remove('sessid');
    this.cookieService.remove('session_name');
    this.cookieService.remove('token');
  }

  getToken(): string{
    var token = this.cookieService.get('token');
    if(token){
      return token;
    }
    return null;
  }

  getSession(): string{
    var session = this.cookieService.get('session_name') + '=' + this.cookieService.get('sessid');
    if(session){
      return session;
    }
    return null;
  }
}

/*
CRUD
The basis of the REST server. In the below:

[endpoint_path] refers to the Path to the endpoint you defined when setting up the endpoint.
[resource] is the name of the resource, like node or taxonomy_term.
[resource_id] is the id of the resource you're acting on.
Create: POST /[endpoint_path]/[resource] + body data
Retrieve: GET /[endpoint_path]/[resource]/[resource_id]
Retrieve: GET /[endpoint_path]/[resource]
Update: PUT /[endpoint_path]/[resource]/[resource_id] + body data
Delete: DELETE /[endpoint_path]/[resource]/[resource_id]
http://localhost:81/api/node?parameters[uid]=1
*/
