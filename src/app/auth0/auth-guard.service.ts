import { Injectable } from '@angular/core';
import { Router,ActivatedRouteSnapshot,RouterStateSnapshot,NavigationExtras } from '@angular/router';
import { Observable } from "rxjs";
import { CanActivate, CanDeactivate, CanLoad } from '@angular/router';
import { Auth } from './auth.service';
import { UserService } from './../d7services';

@Injectable()
export class AuthGuardService implements CanActivate, CanLoad{

  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    
    // check if the user is logged in
    var obs = Observable.create(observer => {
      this.userService.isLogedIn().subscribe(data => {
        // data is a boolean value whather the user is logged in or not
        observer.next(data);
        observer.complete();
      }, err => {
        // in case of error, return false (not logged in)
        observer.next(false);
        observer.complete();
      });
    });
    return obs;
   
  }

  canLoad(route): boolean {
    var obs2 = Observable.create(observer => {
      this.userService.isLogedIn().subscribe(data => {
        // data is a boolean value whather the user is logged in or not
        observer.next(data);
        observer.complete();
      }, err => {
        // in case of error, return false (not logged in)
        observer.next(false);
        observer.complete();
        
      });
    });
    return obs2;
  }

}
