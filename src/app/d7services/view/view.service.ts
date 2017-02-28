import { Injectable } from '@angular/core';
import { MainService } from '../main/main.service';
import { Observable } from "rxjs";
import * as globals from '../globals';


@Injectable()
export class ViewService {

  constructor(private mainService: MainService) { }

  getView(viewName: string, args?: (string | any)[][]): Observable<any>{

    var string_args = '';
    if(args && args.length > 0){
      var string_args = '?';
      args.forEach((item, index) => {

        string_args += item[0] + '=' + item[1] + '&';
      });
    }
   // console.log(string_args);
    return this.mainService.get(globals.endpoint + '/' + viewName + string_args).map(res => res.json()).catch(err => Observable.throw(err));
  }

}
