import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
import { Observable } from "rxjs";
import { CanActivate, CanLoad } from '@angular/router';
import { UserService } from './../d7services';

@Injectable()
export class AuthGuardService implements CanActivate, CanLoad{

  constructor(
    private userService: UserService,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // check if the user is logged in
    //state.url
    
    var obs = Observable.create(observer => {
      this.userService.isLogedIn().subscribe(data => {
        if(data == false){
         // localStorage.setItem('redirectUrl', state.url);
        //  this.router.navigate(['/access-denied']);          
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
    var obs2 = Observable.create(observer => {
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
    return obs2;
  }
  

}
