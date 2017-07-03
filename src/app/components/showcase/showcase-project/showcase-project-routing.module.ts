import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowcaseProjectComponent } from './showcase-project.component';
import { Routes,RouterModule } from '@angular/router';

const ShowcaseProjectRoute: Routes = [
  {
    path: '', component: ShowcaseProjectComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(ShowcaseProjectRoute),
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class ShowcaseProjectRoutingModule { }

