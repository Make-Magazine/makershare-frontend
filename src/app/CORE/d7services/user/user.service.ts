import { Injectable } from '@angular/core';
import { MainService } from 'app/CORE/d7services/main/main.service';
import { CookieOptions } from 'ngx-cookie';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {
  userInfo;
  constructor(private mainService: MainService) {}

  getUser(userId): Observable<any> {
    return this.mainService.get('maker_profile_api/' + userId);
  }

  createUser(user): Observable<any> {
    return this.mainService.custompost('user/register', user);
  }

  deleteUser(userId): Observable<any> {
    return this.mainService.delete('user/' + userId);
  }

  updateUser(user): Observable<any> {
    return this.mainService.put('user/' + user.uid, user);
  }

  login(username, password): Observable<any> {
    return this.mainService
      .get('services/session/token', true)
      .map(response => response.text())
      .map(token => {
        this.saveCookies(token, null, null);
        var body = { name: username, pass: password };
        return this.mainService.custompost('user/login', body).map(user => {
          this.saveCookies(user.token, user.session_name, user.sessid);
          return user;
        });
      });
  }

  getAnonymousToken(): Observable<any> {
    return this.mainService
      .get('services/session/token', true)
      .map(response => response.text())
      .map(token => {
        this.saveCookies(token, null, null);
      });
  }

  resetPassword(nameOrEmail): Observable<any> {
    var body = { name: nameOrEmail };
    return this.mainService.custompost('user/request_new_password', body);
  }

  logout(): Observable<any> {
    return this.mainService.custompost('user/logout');
  }

  getStatus(): Observable<any> {
    return this.mainService.custompost('system/connect');
  }

  isLogedIn(): Observable<any> {
    let obs = Observable.create(observer => {
      if (
        this.mainService.cookieService.get('sessid') &&
        this.mainService.cookieService.get('session_name') &&
        this.mainService.cookieService.get('token')
      ) {
        this.getStatus().subscribe(data => {
          if (data.user.uid && data.user.uid > 0) {
            observer.next(true);
            observer.complete();
          } else {
            observer.next(false);
            observer.complete();
          }
        });
      } else {
        observer.next(false);
        observer.complete();
      }
    });
    return obs;
  }

  auth0_authenticate(data: any): Observable<any> {
    this.userInfo = data;
    var obs = Observable.create(observer => {
      this.mainService
        .get('services/session/token', true)
        .map(res => res.text())
        .subscribe(token => {
          this.saveCookies(token, null, null);
          this.mainService
            .custompost('auth0_service/authenticate', this.userInfo)
            .subscribe(res => {
              observer.next(res);
              observer.complete();
            });
        });
    });
    return obs;
  }
  auth0_logout(): Observable<any> {
    return this.mainService.custompost('auth0_service/logout', null);
  }

  getIdFromUrl(url: string): Observable<any> {
    let body = {
      url: url,
    };
    return this.mainService.custompost('maker_profile_api/get_id', body);
  }

  getUrlFromId(uid: number): Observable<any> {
    let body = {
      uid: uid,
    };
    return this.mainService.custompost('maker_profile_api/get_url', body);
  }

  getProfilePicture(uid: number): Observable<any> {
    let body = {
      uid: uid,
    };
    return this.mainService.custompost('maker_profile_api/get_picture', body);
  }

  saveCookies(token: string, session_name: string, sessid: string): void {
    const expires = new Date();
    expires.setDate(expires.getDate() + 23);
    let options: CookieOptions = {
      expires: expires,
    };
    let someText = token.replace(/(\r\n|\n|\r)/gm, '');
    let tokenFinal = someText.split(' ').join('');

    this.mainService.cookieService.put('sessid', sessid, options);
    this.mainService.cookieService.put('session_name', session_name, options);
    this.mainService.cookieService.put('token', tokenFinal, options);
  }

  removeCookies(): void {
    this.mainService.cookieService.remove('sessid');
    this.mainService.cookieService.remove('session_name');
    this.mainService.cookieService.remove('token');
  }
}
