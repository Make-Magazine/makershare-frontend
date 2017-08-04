import { Injectable } from '@angular/core';
import { MainService } from 'app/CORE/d7services/main/main.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProfileService {
  constructor(private mainService: MainService) {}

  createProfile(Profile): Observable<any> {
    return this.mainService.custompost('maker_profile_api', Profile);
  }

  updateProfile(id, Profile): Observable<any> {
    return this.mainService.put('maker_profile_api/' + id, Profile);
  }

  getUser(userId): Observable<any> {
    return this.mainService.get('maker_profile_api/' + userId);
  }

  getAllCountries(): Observable<any> {
    return this.mainService.get('maker_address_api');
  }
  getAllMarkers(): Observable<any> {
    return this.mainService.get('marker-space');
  }

  getAllInterests(): Observable<any> {
    return this.mainService.get('interests_category');
  }

  getByCountry(country: string): Observable<any> {
    return this.mainService.get('maker_address_api/' + country);
  }
}
