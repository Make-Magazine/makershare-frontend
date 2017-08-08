import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { CookieService } from 'ngx-cookie';
import { Observable } from 'rxjs';
import { Singleton } from '../../models/application/singleton';

@Injectable()
export class MainService {
  private timeout: number = 20000;
  private options: RequestOptionsArgs;

  constructor(private http: Http, public cookieService: CookieService) {
    this.options = this.getOptions();
  }

  private getOptions(): RequestOptionsArgs {
    const headers = new Headers();
    headers.set('X-CSRF-Token', this.cookieService.get('token'));
    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');

    const options: RequestOptionsArgs = new RequestOptions();
    options.headers = headers;
    options.withCredentials = true;
    return options;
  }

  private getURL(
    entityType: string,
    selector?: string | number,
    without_end_point?: boolean,
  ): string {
    var request_url = Singleton.Settings.getBackEndUrlWithEndPoint();

    if (without_end_point) {
      request_url = Singleton.Settings.getBackEndUrl();
    }

    if (entityType) {
      request_url += entityType + '/';
    }

    if (selector) {
      request_url = request_url + selector;
    }

    return request_url;
  }

  private HttpRequestWithConfig(
    HttpObservableRequest: Observable<any>,
    text_response?: boolean,
  ): Observable<any> {
    if (!text_response) {
      return this.HttpRequestWithConfig(HttpObservableRequest, true).map(res =>
        res.json(),
      );
    }
    return HttpObservableRequest.timeout(this.timeout).catch(err =>
      Observable.throw(err),
    );
  }

  get(
    entityType: string,
    selector?: string | number,
    without_end_point?: boolean,
  ): Observable<any> {
    return this.HttpRequestWithConfig(
      this.http.get(this.getURL(entityType, selector, without_end_point), this.options),
      without_end_point,
    );
  }

  post(entityType: string, body?: any): Observable<any> {
    return this.HttpRequestWithConfig(
      this.http.post(this.getURL(entityType), body ? body : {}, this.options),
    );
  }

  put(entityType: string, selector: number | string, body: any): Observable<any> {
    return this.HttpRequestWithConfig(
      this.http.put(this.getURL(entityType, selector), body, this.options),
    );
  }

  delete(entityType: string, selector: string | number): Observable<any> {
    return this.HttpRequestWithConfig(
      this.http.delete(this.getURL(entityType, selector), this.options),
    );
  }

  // temp solution for custom services
  custompost(url, body?: any): Observable<any> {
    url = Singleton.Settings.getBackEndUrlWithEndPoint() + url;
    return this.HttpRequestWithConfig(
      this.http.post(url, body ? body : {}, this.options),
    );
  }
}
