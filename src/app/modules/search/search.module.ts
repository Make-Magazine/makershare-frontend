import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SolrService } from 'app/CORE/d7services/solr/solr.service';
import { AllResultComponent } from 'app/modules/search/all-result/all-result.component';
import { SearchInputComponent } from 'app/modules/search/search-input/search-input.component';
import { SearchResultComponent } from 'app/modules/search/search-result/search-result.component';
import { SearchRoutingModule } from 'app/modules/search/search-routing.module';
import { SharedModule } from 'app/modules/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SearchRoutingModule,
    NgbModule,
    FormsModule,
    SharedModule.forChild(),
  ],
  declarations: [
    SearchInputComponent,
    SearchResultComponent,
    AllResultComponent,
  ],
  providers: [SolrService],
})
export class SearchModule {}
