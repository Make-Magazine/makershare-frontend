import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ViewService } from '../../../d7services';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
})
export class SearchInputComponent implements OnInit {
  searchFailed = false;

  constructor(
    private viewService: ViewService,
  ) {}

  search = (text$: Observable<string>) =>{
    return text$
      .debounceTime(300)
      .distinctUntilChanged()
      .do(() => this.searchFailed = false)
      .switchMap((query) => 
        {
          
          if(query.length > 1){
            return this.viewService.getView('maker_profile_search_data',[['email', query]])
            .map(result => {
              if(result.length == 0){
                this.searchFailed = true;
              }
              return result;
            })
          }
          return [];
        }
      )
  };

  ngOnInit() {
  }

}
