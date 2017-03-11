import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { ExploreModule } from './explore.module';
import { ExploreComponent } from './explore.component';

const ExploreRouts: Routes = [
  {
    path: '', component:ExploreComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(ExploreRouts),
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})


export class ExploreRoutingModule { }
