import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../../core/d7services';

@Injectable()
export class AuthGuardService implements CanActivate, CanLoad {
  constructor(private userService: UserService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // check if the user is logged in
    var obs = Observable.create(observer => {
      this.userService.isLogedIn().subscribe(
        data => {
          // data is a boolean value whather the user is logged in or not
          console.error('User IS logged in... this is glorious');
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
