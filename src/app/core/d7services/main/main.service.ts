import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { CookieService } from 'ngx-cookie';
import { Observable } from 'rxjs';
import { Singleton } from '../../models/application/singleton';

@Injectable()
export class MainService {
  EntityType: string = '';
  private _timeout: number = 20000;
  private _options: RequestOptionsArgs;

  constructor(private _http: Http, public cookieService: CookieService) {
    this._options = this.GetOptions();
  }

  private GetOptions(): RequestOptionsArgs {
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
    selector?: string | number,
    without_end_point?: boolean,
  ): string {
    let request_url = Singleton.Settings.getBackEndUrlWithEndpoint();

    if (without_end_point) {
      request_url = Singleton.Settings.getBackEndUrl();
    }

    if (this.EntityType) {
      request_url += this.EntityType + '/';
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
    return HttpObservableRequest.timeout(this._timeout).catch(err =>
      Observable.throw(err),
    );
  }

  get(
    selector?: string | number,
    without_end_point?: boolean,
  ): Observable<any> {
    return this.HttpRequestWithConfig(
      this._http.get(this.getURL(selector, without_end_point), this._options),
      without_end_point,
    );
  }

  post(body?: any): Observable<any> {
    return this.HttpRequestWithConfig(
      this._http.post(this.getURL(), body ? body : {}, this._options),
    );
  }

  put(selector: number | string, body: any): Observable<any> {
    return this.HttpRequestWithConfig(
      this._http.put(this.getURL(selector), body, this._options),
    );
  }

  delete(selector: string | number): Observable<any> {
    return this.HttpRequestWithConfig(
      this._http.delete(this.getURL(selector), this._options),
    );
  }

  // temp solution for custom services
  custompost(url, body?: any): Observable<any> {
    url = Singleton.Settings.getBackEndUrlWithEndpoint() + url;
    return this.HttpRequestWithConfig(
      this._http.post(url, body ? body : {}, this._options),
    );
  }
}
