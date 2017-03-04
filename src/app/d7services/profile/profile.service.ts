import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { MainService} from '../main/main.service';
import * as globals from '../globals';

@Injectable()
export class ProfileService {

  constructor(private mainService: MainService) { }

  
  createProfile(Profile): Observable<any>{
    return this.mainService.post(globals.endpoint + '/maker_profile_api', Profile).map(response => response.json()).catch(err => Observable.throw(err));
  }

  
}