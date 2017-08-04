import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllResultComponent } from 'app/modules/search/all-result/all-result.component';
import { SearchResultComponent } from 'app/modules/search/search-result/search-result.component';

const SearchRouts: Routes = [
  { path: '', component: SearchResultComponent },
  { path: ':type', component: AllResultComponent },
];

@NgModule({
  imports: [RouterModule.forChild(SearchRouts)],
  exports: [RouterModule],
  declarations: [],
})
export class SearchRoutingModule {}
