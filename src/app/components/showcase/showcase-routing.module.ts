import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ShowcasesCollectionComponent } from './showcase-collection/showcasesCollection.component'
import { SinglShowcaseComponent } from './single-showcase/SingleShowcase.component'

const ShowcaseRoutes: Routes = [
  {
    path: '', 
    children: [
      { path: '', component:ShowcasesCollectionComponent },
      { path: ':nid', component:SinglShowcaseComponent }
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(ShowcaseRoutes),
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class ShowcaseRoutingModule { }
