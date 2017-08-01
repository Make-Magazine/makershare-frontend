import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from "rxjs";
import { CookieService } from 'ngx-cookie';
import { Singleton } from '../../';

@Injectable()
export class MainService {
  constructor(private http: Http, public cookieService: CookieService) {}
  private GetOptions(){
    let headers = new Headers();
    headers.set('X-CSRF-Token', this.cookieService.get('token'));
    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');
    let options = new RequestOptions();
    options.headers = headers;
    options.withCredentials = true;
    return options;
  }

 	private getURL(url: string, WithoutEndPoint?:boolean): string {
    if(WithoutEndPoint)
      return Singleton.Settings.GetBackEndUrl() + url;
 		return Singleton.Settings.GetBackEndUrlWithEndpoint() + url;
 	}

  get(RequestURL: string, WithoutEndPoint?:boolean): Observable<Response>{
  	return this.http.get(this.getURL(RequestURL,WithoutEndPoint),this.GetOptions()).timeout(20000);
  }

  post(RequestURL: string, body?: any): Observable<Response>{
  	return this.http.post(this.getURL(RequestURL), body ? body: {},this.GetOptions()).timeout(20000);
  }

  put(RequestURL: string, body: any): Observable<Response>{
  	return this.http.put(this.getURL(RequestURL), body,this.GetOptions()).timeout(20000);
  }

  delete(RequestURL: string): Observable<Response>{
  	return this.http.delete(this.getURL(RequestURL),this.GetOptions()).timeout(20000);
  }
}
