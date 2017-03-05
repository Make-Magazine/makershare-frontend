import { Injectable } from '@angular/core'; 
import { Observable } from "rxjs";
import { MainService } from '../main/main.service';
import * as globals from '../globals';

@Injectable()
export class PmService {

  constructor(private mainService: MainService) { }

  getMessage(mid: number): Observable<any>{
      return this.mainService.get(globals.endpoint + '/privatemsg/' + mid).map(res => res.json()).catch(err => Observable.throw(err));
  }

  getMessages(): Observable<any>{
      return this.mainService.get(globals.endpoint + '/privatemsg').map(res => res.json()).catch(err => Observable.throw(err));
  }  

  deleteMessage(mid: number): Observable<any>{
      return this.mainService.delete(globals.endpoint + '/privatemsg/' + mid).map(res => res.json()).catch(err => Observable.throw(err));
  }

  sendMessage(message: any): Observable<any>{
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
    return this.mainService.delete(globals.endpoint + '/privatemsgblock?uid=' + recipient ).map(res => res.json()).catch(err => Observable.throw(err));
  }

  blockedUsers(): Observable<any> {
    return this.mainService.get(globals.endpoint + '/privatemsgblock/').map(res => res.json()).catch(err => Observable.throw(err));
  }

  updateSettings(data: any): Observable<any>{
    return this.mainService.put(globals.endpoint + '/privatemsg/1', data).map(res => res.json()).catch(err => Observable.throw(err));
  }

}
