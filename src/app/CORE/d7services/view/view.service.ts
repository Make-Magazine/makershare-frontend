import { Injectable } from '@angular/core';
import { MainService } from '../main/main.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ViewService extends MainService {
  getView<T>(viewName: string, args?: (string | any)[][]): Observable<T | any> {
    var string_args = '';
    if (args && args.length > 0) {
      var string_args = '?';
      args.forEach((item, index) => {
        string_args += item[0] + '=' + item[1] + '&';
      });
    }
    return super.get(viewName + string_args);
  }

  /* function check user allowe to enter challenge */
  checkEnterStatus(viewName: string, nid: number): Observable<any> {
    return super.custompost(viewName, { challenge_id: nid });
  }

  /* end function cheack user allowe to enter challenge */

  getCountProjectByID(viewName: string, id: string): Observable<any> {
    // console.log(string_args);
    return super.get(viewName + '/' + id).catch(err => Observable.throw(err));
  }
}
