import { Injectable } from '@angular/core';
import { Router,ActivatedRouteSnapshot,RouterStateSnapshot,NavigationExtras } from '@angular/router';
import { Observable } from "rxjs";
import { CanActivate, CanDeactivate, CanLoad } from '@angular/router';
import { Auth } from './auth.service';
import { UserService } from './../d7services/user/user.service';

@Injectable()
export class AuthGuardService implements CanActivate, CanLoad{

  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // check if the user is logged in
    //state.url
    
    var obs = Observable.create(observer => {
      this.userService.isLogedIn().subscribe(data => {
        if(data == false){
          localStorage.setItem('redirectUrl', state.url);
          this.router.navigate(['/access-denied']);          
        }
        observer.next(data);
        observer.complete();
      }, err => {
        
        observer.next(false);
        observer.complete();
        
      });

    });
    return obs;
    
  }

  canLoad(route): boolean {
    var obs = Observable.create(observer => {
      this.userService.isLogedIn().subscribe(data => {
        if(data == false){
          observer.next(false);  
        }
        observer.next(data);
        observer.complete();
      }, err => {
        
        observer.next(false);
        observer.complete();
        
      });

    });
    return obs;
  }
  

}
