import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { MainService } from '../main/main.service';
import * as globals from '../globals';

@Injectable()
export class ProfileService {

  constructor(private mainService: MainService) { }


  createProfile(Profile): Observable<any> {
    return this.mainService.post(globals.endpoint + '/maker_profile_api', Profile).map(response => response.json()).catch(err => Observable.throw(err));
  }

  updateProfile(id,Profile): Observable<any> {
    return this.mainService.put(globals.endpoint + '/maker_profile_api/'+id, Profile).map(response => response.json()).catch(err => Observable.throw(err));
  }

  getUser(userId): Observable<any> {
    return this.mainService.get(globals.endpoint + '/maker_profile_api/' + userId).map(res => res.json()).catch(err => Observable.throw(err));
  }

  getAllCountries(): Observable<any> {
    return this.mainService.get(globals.endpoint + '/maker_address_api').map(response => response.json()).catch(err => Observable.throw(err));
  }
    getAllMarkers(): Observable<any> {
    return this.mainService.get(globals.endpoint + '/marker-space').map(response => response.json()).catch(err => Observable.throw(err));
  }

 getAllInterests(): Observable<any> {
    return this.mainService.get(globals.endpoint + '/interests_category').map(response => response.json()).catch(err => Observable.throw(err));
  }

  getByCountry(country: string): Observable<any> {
    return this.mainService.get(globals.endpoint + '/maker_address_api/' + country).map(response => response.json()).catch(err => Observable.throw(err));
  }

}