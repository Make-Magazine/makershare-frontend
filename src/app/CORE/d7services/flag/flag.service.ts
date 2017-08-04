import { Injectable } from '@angular/core';
import { MainService } from 'app/CORE/d7services/main/main.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FlagService {
  constructor(private mainService: MainService) {}

  isFlagged(nid: number, uid: number, flag_name: string): Observable<any> {
    var obj = {
      flag_name: flag_name, // like, fork, node_bookmark
      entity_id: nid,
      uid: uid,
    };
    return this.mainService.custompost('flag/is_flagged', obj);
  }
  flag(
    nid: number,
    uid: number,
    flag_name: string,
    fields?: {},
  ): Observable<any> {
    var obj = {
      flag_name: flag_name,
      entity_id: nid,
      action: 'flag',
      uid: uid,
    };
    if (fields) {
      Object.assign(obj, fields);
    }

    return this.mainService.custompost('flag/flag', obj);
  }
  unflag(nid: number, uid: number, flag_name: string): Observable<any> {
    var obj = {
      flag_name: flag_name,
      entity_id: nid,
      action: 'unflag',
      uid: uid,
    };
    return this.mainService.custompost('flag/flag', obj);
  }
  flagCount(nid: number, flag_name): Observable<any> {
    var obj = {
      flag_name: flag_name,
      entity_id: nid,
    };
    return this.mainService.custompost('flag/countall', obj);
  }

  getCountFollowing(uid: number): Observable<any> {
    let body = {
      uid: uid,
    };
    return this.mainService.custompost('maker_count_api/following', body);
  }
}
