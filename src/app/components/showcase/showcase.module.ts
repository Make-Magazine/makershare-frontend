import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowcasesCollectionComponent } from './showcase-collection/showcasesCollection.component';
import { SinglShowcaseComponent } from './single-showcase/SingleShowcase.component';
import { ShowcaseSortingComponent } from './showcaseSorting.component';
import { ShowcaseRoutingModule } from './showcase-routing.module'
import { SharedModule } from '../shared/shared.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ShowcaseProjectComponent } from './showcase-project/showcase-project.component';
// import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  imports: [
    CommonModule,
    ShowcaseRoutingModule,
    SharedModule,


    NgbModule

  ],
  declarations: [
    ShowcasesCollectionComponent,
    SinglShowcaseComponent,
    ShowcaseSortingComponent,
    ShowcaseProjectComponent
  ],
      // providers: [NgbCarouselConfig] // add NgbCarouselConfig to the component providers

})

export class ShowcaseModule { }
export  {ShowcasesCollectionComponent};
export  {SinglShowcaseComponent};
export  {ShowcaseSortingComponent};
