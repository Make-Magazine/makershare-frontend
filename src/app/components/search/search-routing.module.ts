import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchResultComponent } from './search-result/search-result.component';
import { AllResultComponent } from './all-result/all-result.component';

const SearchRouts: Routes = [
  
    {path: '', component: SearchResultComponent},
    {path: ':type', component:  AllResultComponent},

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
