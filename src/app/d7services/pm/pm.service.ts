import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { MainService } from '../main/main.service';
import * as globals from '../globals';

@Injectable()
export class PmService {

  constructor(private mainService: MainService) { }

  getMessage(mid: number): Observable<any> {
    return this.mainService.get(globals.endpoint + '/privatemsg/' + mid).map(res => res.json()).catch(err => Observable.throw(err));
  }

  getMessages(name: string, args?: (string | any)[][]): Observable<any> {
    var string_args = '';
    if (args && args.length > 0) {
      var string_args = '?';
      args.forEach((item, index) => {
        string_args += item[0] + '=' + item[1] + '&';
      });
    }
    return this.mainService.get(globals.endpoint + '/' + name + string_args).map(res => res.json()).catch(err => Observable.throw(err));
  }

  deleteMessage(mid: number): Observable<any> {
    return this.mainService.delete(globals.endpoint + '/privatemsg/' + mid).map(res => res.json()).catch(err => Observable.throw(err));
  }

  sendMessage(message: any): Observable<any> {
    return this.mainService.post(globals.endpoint + '/privatemsg/', message).map(res => res.json()).catch(err => Observable.throw(err));
  }

  blockUser(recipient: number, author: number): Observable<any> {
    let data = {
      "recipient": recipient,
      "author": author,
    }
    return this.mainService.post(globals.endpoint + '/privatemsgblock/', data).map(res => res.json()).catch(err => Observable.throw(err));
  }

  unBlockUser(recipient: number): Observable<any> {
    return this.mainService.delete(globals.endpoint + '/privatemsgblock/' + recipient).map(res => res.json()).catch(err => Observable.throw(err));
  }

  blockedUsers(): Observable<any> {
    return this.mainService.get(globals.endpoint + '/privatemsgblock/').map(res => res.json()).catch(err => Observable.throw(err));
  }

  updateSettings(mid:number,data: any): Observable<any> {
    return this.mainService.put(globals.endpoint + '/privatemsg/' + mid, data).map(res => res.json()).catch(err => Observable.throw(err));
  }
  postView(viewName: string, uid: number){
    return this.mainService.post(globals.endpoint + '/' + viewName, {"uid" : uid}).map(res => res.json());
  }
  
  getStatus(uid: number): Observable<any> {
    return this.mainService.get(globals.endpoint + '/privatemsggetstatus/' + uid).map(res => res.json()).catch(err => Observable.throw(err));
  }
  getBlocked(uid: number): Observable<any> {
    return this.mainService.get(globals.endpoint + '/privatemsgblocked/' + uid).map(res => res.json()).catch(err => Observable.throw(err));
  }

  getAllBlocked(): Observable<any> {
    return this.mainService.get(globals.endpoint + '/privatemsgblock').map(res => res.json()).catch(err => Observable.throw(err));
  }

  deleteReplay(mid: number): Observable<any> {
    return this.mainService.delete(globals.endpoint + '/privatemsgdeletereplay/' + mid).map(res => res.json()).catch(err => Observable.throw(err));
  }

  getParticipents(mid: number): Observable<any> {
    return this.mainService.get(globals.endpoint + '/maker_get_pm_participent/' + mid).map(res => res.json()).catch(err => Observable.throw(err));
  }

  getInboxCount(uid: number){
    return this.mainService.get(globals.endpoint + '/maker_get_pm_author/' + uid).map(res => res.json()).catch(err => Observable.throw(err));
  }

  getInboxOrSent(name: string, args?: (string | any)[][]): Observable<any> {
    var string_args = '';
    if (args && args.length > 0) {
      var string_args = '?';
      args.forEach((item, index) => {
        string_args += item[0] + '=' + item[1] + '&';
      });
    }
    return this.mainService.post(globals.endpoint + '/' + name + string_args).map(res => res.json()).catch(err => Observable.throw(err));
  }

  deleteAcount(uid: number): Observable<any> {
    return this.mainService.post(globals.endpoint + '/maker_profile_api/delete_user', uid).map(res => res.json()).catch(err => Observable.throw(err));
  }

  deleteNotification(mid: number): Observable<any> {
    return this.mainService.delete(globals.endpoint + '/maker_notification_api/' + mid).map(res => res.json()).catch(err => Observable.throw(err));
  }
  
  postAction(viewName: string,uid:any){
    return this.mainService.post(globals.endpoint + '/' + viewName, uid).map(res => res.json());
  }
  updateAction(viewName: string,uid: any){
    return this.mainService.post(globals.endpoint + '/' + viewName, uid).map(res => res.json());
  }
 }
