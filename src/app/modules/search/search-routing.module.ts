import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllResultComponent } from '../search/all-result/all-result.component';
import { SearchResultComponent } from '../search/search-result/search-result.component';

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
