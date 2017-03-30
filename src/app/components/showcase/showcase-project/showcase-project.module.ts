import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowcaseRoutingModule } from '../showcase-routing.module'
// import {ShowcaseCollectionModule } from '../showcase-collection/showcase-collection.module'
// import {ShowcasesCollectionComponent } from '../showcase-collection/showcasesCollection.component'
import { ShowcaseProjectComponent } from './showcase-project.component'
import { SharedModule } from '../../shared/shared.module'
@NgModule({
  imports: [
    CommonModule,
    ShowcaseRoutingModule,
    SharedModule
    // ShowcaseCollectionModule
  ],
   declarations: [ShowcaseProjectComponent],
  
})
export class ShowcaseProjectModule { }
export {ShowcaseProjectComponent}
