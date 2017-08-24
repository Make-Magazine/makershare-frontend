import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MainService } from '../main/main.service';

@Injectable()
export class ViewService extends MainService {
  getView<T>(viewName: string, args?: (string | any)[][]): Observable<T | any> {
    let string_args = '';
    if (args && args.length > 0) {
      string_args = '?';
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
    return super.get(viewName + '/' + id).catch(err => Observable.throw(err));
  }
}
