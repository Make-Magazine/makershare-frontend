import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchRoutingModule } from './search-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchInputComponent } from './search-input/search-input.component';
import { SearchResultComponent } from './search-result/search-result.component';

// Services
import { SolrService } from '../../d7services/solr/solr.service';

@NgModule({
  imports: [
    CommonModule,
    SearchRoutingModule,
    NgbModule,
  ],
  declarations: [SearchInputComponent, SearchResultComponent],
  providers: [SolrService]
})
export class SearchModule { }
