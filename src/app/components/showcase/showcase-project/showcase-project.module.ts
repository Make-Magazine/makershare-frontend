import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowcaseRoutingModule } from '../showcase-routing.module'
// import {ShowcaseCollectionModule } from '../showcase-collection/showcase-collection.module'
// import {ShowcasesCollectionComponent } from '../showcase-collection/showcasesCollection.component'
import { ShowcaseProjectComponent } from './showcase-project.component'
import { SharedModule } from '../../shared/shared.module'
// import { MetaModule } from '@nglibs/meta';
@NgModule({
  imports: [
    CommonModule,
    ShowcaseRoutingModule,
    SharedModule,
    // ShowcaseCollectionModule,
    // MetaModule.forRoot(),
  ],
   declarations: [ShowcaseProjectComponent],
  
})
export class ShowcaseProjectModule { }
export {ShowcaseProjectComponent}
