import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MakersComponent } from './makers.component';

const makersRouts: Routes = [
  { path: '', component:MakersComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(makersRouts),
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})


export class ProjectsRoutingModule { }
