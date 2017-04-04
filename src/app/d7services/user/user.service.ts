import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { MainService } from '../main/main.service';
import * as globals from '../globals';

@Injectable()
export class UserService {
  userInfo;
  constructor(private mainService: MainService) {}

  getUser(userId): Observable<any>{
    return this.mainService.get(globals.endpoint + '/maker_profile_api/' + userId).map(res => res.json()).catch(err => Observable.throw(err));
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
        // console.log("login ok", user);
        // console.log(user);
        this.mainService.saveCookies(user.token, user.session_name, user.sessid);
        return user;
      });
    });
  }

  getAnonymousToken(): Observable<any>{
    return this.mainService.get('/services/session/token').map(response => response.text()).map(token => {
      this.mainService.saveCookies(token, null, null);
    });    
  }

  resetPassword(nameOrEmail): Observable<any>{
    var body = {"name": nameOrEmail};
    return this.mainService.post(globals.endpoint + '/user/request_new_password', body).map(response => response.json());
  }

  logout(): Observable<any>{
    return this.mainService.post(globals.endpoint + '/user/logout').map(response => response.json());
  }

  getStatus(): Observable<any> {
    return this.mainService.post('/api/system/connect').map(response => response.json());
  }

  isLogedIn(): Observable<any>{
    var obs = Observable.create(observer => {
      var token = this.mainService.getToken();
      var session = this.mainService.getSession();
      if(session && token){
        this.getStatus().subscribe( data => {
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

  auth0_authenticate(data: any): Observable<any>{
    this.userInfo = data;
    var obs = Observable.create(observer => {
      this.mainService.get('/services/session/token').map(response => response.text()).subscribe(token => {
         this.mainService.saveCookies(token, null, null);
         this.mainService.post(globals.endpoint + '/auth0_service/authenticate', this.userInfo).map(res => res.json()).catch(err => Observable.throw(err)).subscribe( res => {
           observer.next(res);
           observer.complete();
         });
       });
    });
    return obs;
  }
  auth0_logout(): Observable<any>{
    return this.mainService.post(globals.endpoint + '/auth0_service/logout', null).map(res => res.json()).catch(err => Observable.throw(err));
  }

  geIdFromUrl(url: string): Observable<any>{
    let body = {
      url: url,
    }
    return this.mainService.post(globals.endpoint + '/maker_profile_api/get_id', body).map(res => res.json()).catch(err => Observable.throw(err));
  }

}
