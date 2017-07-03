import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchRoutingModule } from './search-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchInputComponent } from './search-input/search-input.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { AllResultComponent } from './all-result/all-result.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
// Services
import { SolrService } from '../../d7services';


@NgModule({
  imports: [
    CommonModule,
    SearchRoutingModule,
    NgbModule,
    FormsModule,
    SharedModule.forChild(),
  ],
  declarations: [SearchInputComponent, SearchResultComponent, AllResultComponent],
  providers: [SolrService]
})
export class SearchModule { }
