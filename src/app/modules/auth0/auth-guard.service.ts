import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  RouterStateSnapshot//,
  //Router,
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../../core/d7services';
import { Auth } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate, CanLoad {
  constructor(
     private userService: UserService, 
     public auth: Auth//,
     //private router: Router
   ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // check if the user is logged in
    var obs = Observable.create(observer => {
      this.userService.isLogedIn().subscribe(
        data => {
          // data is a boolean value whather the user is logged in or not
          console.error('User logged in is ', data);
          if(!data) {
            console.log('We should redirect to the auth0 login page here I think.... ', ActivatedRouteSnapshot);
            console.log(window.location.href, window.location.origin)
            this.auth.Auth0Login({'redirectURI': window.location.href})
            //this.router.navigateByUrl('/');
          }
          observer.next(data);
          observer.complete();
        },
        err => {
          // in case of error, return false (not logged in)
          console.error('User not logged in... we should redirect');
          observer.next(false);
          observer.complete();
        },
      );
    });
    return obs;
  }

  canLoad(route): boolean {
    var obs2 = Observable.create(observer => {
      this.userService.isLogedIn().subscribe(
        data => {
          // data is a boolean value whather the user is logged in or not
          observer.next(data);
          observer.complete();
        },
        err => {
          // in case of error, return false (not logged in)
          observer.next(false);
          observer.complete();
        },
      );
    });
    return obs2;
  }
}
