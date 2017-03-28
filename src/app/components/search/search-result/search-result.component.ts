import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SolrService } from '../../../d7services/solr/solr.service';
import { SearchInputComponent } from './../search-input/search-input.component';


@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  searchFailed = false;
  constructor(
    private solrService: SolrService,
  ) { }


  search = (text$: Observable<string>) =>{
    return text$
      .debounceTime(300)
      .distinctUntilChanged()
      .do(() => this.searchFailed = false)
      .switchMap((query) => 
        {
          
          if(query.length > 1){
            return this.solrService.autocomplete(query)
            .map(result => {
              
              console.log(result);
              return result.response.docs;
            })
          }
          return [];
        }
      )
  };

  ngOnInit() {
  }

}
