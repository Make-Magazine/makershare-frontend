import { Injectable } from '@angular/core';
import { CookieOptions } from 'ngx-cookie';
import { Observable } from 'rxjs/Observable';
import { MainService } from '../main/main.service';

@Injectable()
export class UserService {
  userInfo;
  constructor(private mainService: MainService) {}

  getUser(userId): Observable<any> {
    return this.mainService.get('maker_profile_api', userId);
  }

  createUser(user): Observable<any> {
    return this.mainService.custompost('user/register', user);
  }

  deleteUser(userId): Observable<any> {
    return this.mainService.delete('user', userId);
  }

  updateUser(user): Observable<any> {
    return this.mainService.put('user', user.uid, user);
  }

  login(username, password): Observable<any> {
    return this.mainService
      .get('services/session', 'token', true)
      .map(response => response.text())
      .map(token => {
        this.saveCookies(token, null, null);
        return this.mainService
          .custompost('user/login', { name: username, pass: password })
          .map(user => {
            this.saveCookies(user.token, user.session_name, user.sessid);
            return user;
          });
      });
  }

  getAnonymousToken(): Observable<any> {
    return this.mainService
      .get('services/session', 'token', true)
      .map(response => response.text())
      .map(token => {
        this.saveCookies(token, null, null);
      });
  }

  resetPassword(nameOrEmail): Observable<any> {
    return this.mainService.custompost('user/request_new_password', {
      name: nameOrEmail,
    });
  }

  logout(): Observable<any> {
    return this.mainService.custompost('user/logout');
  }

  getStatus(): Observable<any> {
    return this.mainService.custompost('system/connect');
  }

  isLogedIn(): Observable<any> {
    return Observable.create(observer => {
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
  }

  auth0_authenticate(data: any): Observable<any> {
    this.userInfo = data;
    return Observable.create(observer => {
      this.mainService
        .get('services/session', 'token', true)
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
  }
  auth0_logout(): Observable<any> {
    return this.mainService.custompost('auth0_service/logout', null);
  }

  getIdFromUrl(url: string): Observable<any> {
    return this.mainService.custompost('maker_profile_api/get_id', {
      url: url,
    });
  }

  getUrlFromId(uid: number): Observable<any> {
    return this.mainService.custompost('maker_profile_api/get_url', {
      uid: uid,
    });
  }

  getProfilePicture(uid: number): Observable<any> {
    return this.mainService.custompost('maker_profile_api/get_picture', {
      uid: uid,
    });
  }

  newsletterSubscribe(email: string): Observable<any> {
    return this.mainService.custompost('maker_wc/subscribe', {
      'email': email,
    });
  }

  saveCookies(token: string, session_name: string, sessid: string): void {
    const expires = new Date();
    expires.setDate(expires.getDate() + 23);
    const options: CookieOptions = {
      expires: expires,
    };
    const someText = token.replace(/(\r\n|\n|\r)/gm, '');
    const tokenFinal = someText.split(' ').join('');

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
