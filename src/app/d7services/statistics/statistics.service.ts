import { Injectable } from '@angular/core';
import { MainService } from '../main/main.service';
import { Observable } from "rxjs";
import * as globals from '../globals';

@Injectable()
export class StatisticsService {

  constructor(
    private mainService: MainService,
  ) { }


  view_record(entityId: number, entityType: string): Observable<any> {
    let body = {
      entityId: entityId,
      entityType: entityType,
    };
    return this.mainService.post(globals.endpoint + '/maker_counting/view', body).map(res => res.json()).catch(err => Observable.throw(err));
  }


}
