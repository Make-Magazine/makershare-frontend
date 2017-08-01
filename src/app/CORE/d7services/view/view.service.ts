import { Injectable } from '@angular/core';
import { MainService } from '../main/main.service';
import { Observable } from 'rxjs';
import { Headers } from '@angular/http';

@Injectable()
export class ViewService {
  promisehandleError: any;
  headers: Headers;
  constructor(private mainService: MainService) {
    // this.buildHeaders();
  }

  // public buildHeaders() {
  //     return this.mainService.getOptions(Option);
  // }

  getView<T>(viewName: string, args?: (string | any)[][]): Observable<T | any> {
    var string_args = '';
    if (args && args.length > 0) {
      var string_args = '?';
      args.forEach((item, index) => {
        string_args += item[0] + '=' + item[1] + '&';
      });
    }
    return this.mainService
      .get(viewName + string_args)
      .map(res => res.json())
      .catch(err => Observable.throw(err));
  }

  /* function check user allowe to enter challenge */
  checkEnterStatus(viewName: string, nid: number): Observable<any> {
    return this.mainService
      .post(viewName, { challenge_id: nid })
      .map(res => res.json());
  }

  /* end function cheack user allowe to enter challenge */

  getCountProjectByID(viewName: string, id: string): Observable<any> {
    // console.log(string_args);
    return this.mainService
      .get(viewName + '/' + id)
      .map(res => res.json())
      .catch(err => Observable.throw(err));
  }
}
