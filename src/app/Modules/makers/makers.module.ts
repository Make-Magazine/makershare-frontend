import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MakersComponent } from './makers.component';
import  { ProjectsRoutingModule } from './makers.routing.modules';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    SharedModule.forChild(),
  ],
  declarations: [
    MakersComponent,
  ]
})
export class MakersModule { }
