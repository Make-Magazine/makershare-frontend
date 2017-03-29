import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchResultComponent } from './search-result/search-result.component';

const SearchRouts: Routes = [
  {
    path: '', component: SearchResultComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(SearchRouts),
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})

export class SearchRoutingModule { }
