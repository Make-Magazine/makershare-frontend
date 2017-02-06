import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { MainService } from '../main/main.service';
import * as globals from '../globals';

@Injectable()
export class UserService {

  constructor(private mainService: MainService) {}

  getUser(userId): Observable<any>{
    return this.mainService.get(globals.endpoint + '/user/' + userId).map(res => res.json()).catch(err => Observable.throw(err));
  }

  createUser(user): Observable<any>{
    return this.mainService.post(globals.endpoint + '/user/register', user).map(res => res.json()).catch(err => Observable.throw(err));
  }

  deleteUser(userId): Observable<any>{
    return this.mainService.delete(globals.endpoint + '/user/' + userId).map(res => res.json()).catch(err => Observable.throw(err));
  }

  updateUser(user): Observable<any>{
    return this.mainService.put(globals.endpoint + '/user/' + user.uid, user).map(res => res.json()).catch(err => Observable.throw(err));
  }

  login(username, password): Observable<any>{
    return this.mainService.get('/services/session/token').map(response => response.text()).map(token => {
      this.mainService.saveCookies(token, null, null);
      var body = {"name": username, "pass": password};
      return this.mainService.post('/api/user/login', body).map(response => response.json()).map(user => {
        console.log("login ok", user);
        this.mainService.saveCookies(user.token, user.session_name, user.sessid);
        return user;
      });
    });
  }

  resetPassword(nameOrEmail): Observable<any>{
    var body = {"name": nameOrEmail};
    return this.mainService.post(globals.endpoint + '/user/request_new_password', body).map(response => response.json());
  }

  logout(): Observable<any>{
    return this.mainService.post(globals.endpoint + '/user/logout', null).map(response => response.json());
  }

  getStatus(session: string, token: string): Observable<any> {
    return this.mainService.post('/api/system/connect', null).map(response => response.json());
  }

  isLogedIn(): Observable<any>{
    var obs = Observable.create(observer => {
      var token = this.mainService.getToken();
      var session = this.mainService.getSession();
      if(session && token){
        this.getStatus(session, token).subscribe( data => {
            if(data.user.uid && data.user.uid > 0){
              observer.next(true);
              observer.complete();
            }else{
              observer.next(false);
              observer.complete();
            }
        });

      }else {
        observer.next(false);
        observer.complete();
      }

    });
    return obs;
  }

}
