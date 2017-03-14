import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExploreComponent } from './explore.component';
import { ExploreRoutingModule } from './explore-routing.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    ExploreRoutingModule,
    SharedModule
  ],
  declarations: [ExploreComponent],
  exports:[]
})
export class ExploreModule { }
