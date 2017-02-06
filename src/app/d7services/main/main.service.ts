import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from "rxjs";
import { CookieService } from 'angular2-cookie/core';
import * as globals from '../globals';


@Injectable()
export class MainService {

  private serviceURL: string = globals.domain;

  constructor(private http: Http, private cookieService: CookieService) { }

 	getURL(url: string): string {

 		return this.serviceURL + url;
 	}

  getOptions(options: RequestOptionsArgs): RequestOptionsArgs {

    var headers: Headers = new Headers({
      "Accept": "application/json",
      "Content-Type": "application/json",
    });

    var token = this.getToken();
    var session = this.getSession();
    if(session && token){
        headers.append('Cookie', session);
        headers.append('X-CSRF-Token', token);
    }

    var basicOptions = {withCredentials: true, headers: headers};
    if(options){
      return Object.assign(basicOptions, options);
    }
 		return basicOptions;
 	}


  get(endpoint: string, options?: RequestOptionsArgs): Observable<Response>{

  	let url = this.getURL(endpoint);
  	let op = this.getOptions(options);
  	return this.http.get(url, op).timeout(5000);
  }

  post(endpoint: string, body?: any, options?: RequestOptionsArgs): Observable<Response>{

  	let url = this.getURL(endpoint);
  	let op = this.getOptions(options);
  	return this.http.post(url, body, op).timeout(5000);
  }

  put(endpoint: string, body: any, options?: RequestOptionsArgs): Observable<Response>{

  	let url = this.getURL(endpoint);
  	let op = this.getOptions(options);
  	return this.http.put(url, body, op).timeout(5000);
  }

  delete(endpoint: string, options?: RequestOptionsArgs): Observable<Response>{

  	let url = this.getURL(endpoint);
  	let op = this.getOptions(options);
  	return this.http.delete(url, op).timeout(5000);
  }

  saveCookies(token: string, session_name: string, sessid: string){
    this.cookieService.put('sessid', sessid);
    this.cookieService.put('session_name', session_name);
    this.cookieService.put('token', token);
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
