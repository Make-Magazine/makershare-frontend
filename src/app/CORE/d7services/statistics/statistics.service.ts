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

  notificationSetLastSeen(uid: number, mid: number): Observable<any> {
    let body = {
      uid: uid,
      mid: mid,
    };
    return this.mainService.post(globals.endpoint + '/maker_counting/last_seen', body).map(res => res.json()).catch(err => Observable.throw(err));
  }

  notificationGetNewCount(uid: number): Observable<any> {
    let body = {
      uid: uid
    };
    return this.mainService.post(globals.endpoint + '/maker_counting/notification_count', body).map(res => res.json()).catch(err => Observable.throw(err));
  }


}
