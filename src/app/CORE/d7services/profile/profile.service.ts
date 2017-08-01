import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { MainService } from '../main/main.service';

@Injectable()
export class ProfileService {

  constructor(private mainService: MainService) { }


  createProfile(Profile): Observable<any> {
    return this.mainService.post('maker_profile_api', Profile).map(response => response.json()).catch(err => Observable.throw(err));
  }

  updateProfile(id,Profile): Observable<any> {
    return this.mainService.put('maker_profile_api/'+id, Profile).map(response => response.json()).catch(err => Observable.throw(err));
  }

  getUser(userId): Observable<any> {
    return this.mainService.get('maker_profile_api/' + userId).map(res => res.json()).catch(err => Observable.throw(err));
  }

  getAllCountries(): Observable<any> {
    return this.mainService.get('maker_address_api').map(response => response.json()).catch(err => Observable.throw(err));
  }
    getAllMarkers(): Observable<any> {
    return this.mainService.get('marker-space').map(response => response.json()).catch(err => Observable.throw(err));
  }

 getAllInterests(): Observable<any> {
    return this.mainService.get('interests_category').map(response => response.json()).catch(err => Observable.throw(err));
  }

  getByCountry(country: string): Observable<any> {
    return this.mainService.get('maker_address_api/' + country).map(response => response.json()).catch(err => Observable.throw(err));
  }

}