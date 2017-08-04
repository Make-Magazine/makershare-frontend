import { Injectable } from '@angular/core';
import { MainService } from 'app/CORE/d7services/main/main.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PmService {
  constructor(private mainService: MainService) {}

  getMessage(mid: number): Observable<any> {
    return this.mainService.get('privatemsg/' + mid);
  }

  getMessages(name: string, args?: (string | any)[][]): Observable<any> {
    var string_args = '';
    if (args && args.length > 0) {
      var string_args = '?';
      args.forEach((item, index) => {
        string_args += item[0] + '=' + item[1] + '&';
      });
    }
    return this.mainService.get(name + string_args);
  }

  deleteMessage(mid: number): Observable<any> {
    return this.mainService.delete('privatemsg/' + mid);
  }

  sendMessage(message: any): Observable<any> {
    return this.mainService.custompost('privatemsg/', message);
  }

  blockUser(recipient: number, author: number): Observable<any> {
    let data = {
      recipient: recipient,
      author: author,
    };
    return this.mainService.custompost('privatemsgblock/', data);
  }

  unBlockUser(recipient: number): Observable<any> {
    return this.mainService.delete('privatemsgblock/' + recipient);
  }

  blockedUsers(): Observable<any> {
    return this.mainService.get('privatemsgblock/');
  }

  updateSettings(mid: number, data: any): Observable<any> {
    return this.mainService.put('privatemsg/' + mid, data);
  }
  postView(viewName: string, uid: number) {
    return this.mainService.custompost(viewName, { uid: uid });
  }

  getStatus(uid: number): Observable<any> {
    return this.mainService.get('privatemsggetstatus/' + uid);
  }
  getBlocked(uid: number): Observable<any> {
    return this.mainService.get('privatemsgblocked/' + uid);
  }

  getAllBlocked(): Observable<any> {
    return this.mainService.get('privatemsgblock');
  }

  deleteReplay(mid: number): Observable<any> {
    return this.mainService.delete('privatemsgdeletereplay/' + mid);
  }

  getParticipents(mid: number): Observable<any> {
    return this.mainService.get('maker_get_pm_participent/' + mid);
  }

  getInboxCount(uid: number) {
    return this.mainService.get('maker_get_pm_author/' + uid);
  }

  getInboxOrSent(name: string, args?: (string | any)[][]): Observable<any> {
    var string_args = '';
    if (args && args.length > 0) {
      var string_args = '?';
      args.forEach((item, index) => {
        string_args += item[0] + '=' + item[1] + '&';
      });
    }
    return this.mainService.post(name + string_args);
  }

  deleteAcount(uid: number): Observable<any> {
    return this.mainService.custompost('maker_profile_api/delete_user', uid);
  }

  deleteNotification(mid: number): Observable<any> {
    return this.mainService.delete('maker_notification_api/' + mid);
  }

  postAction(viewName: string, uid: any) {
    return this.mainService.custompost(viewName, uid);
  }
  updateAction(viewName: string, uid: any) {
    return this.mainService.custompost(viewName, uid);
  }
}
