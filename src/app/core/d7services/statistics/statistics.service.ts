import { Injectable } from '@angular/core';
import { MainService } from '../main/main.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class StatisticsService {
  constructor(private mainService: MainService) {}

  view_record(entityId: number, entityType: string): Observable<any> {
    let body = {
      entityId: entityId,
      entityType: entityType,
    };
    return this.mainService.custompost('maker_counting/view', body);
  }

  notificationSetLastSeen(uid: number, mid: number): Observable<any> {
    let body = {
      uid: uid,
      mid: mid,
    };
    return this.mainService.custompost('maker_counting/last_seen', body);
  }

  notificationGetNewCount(uid: number): Observable<any> {
    let body = {
      uid: uid,
    };
    return this.mainService.custompost(
      'maker_counting/notification_count',
      body,
    );
  }
}
