import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowcasesCollectionComponent } from './showcase-collection/showcasesCollection.component';

import { SinglShowcaseComponent } from './single-showcase/SingleShowcase.component';

//import { ChallengeSummaryComponent } from './challenge-summary/challenge-summary.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ShowcasesCollectionComponent,

    SinglShowcaseComponent,


  ]
})
export class ShowcaseModule { }
export  {ShowcasesCollectionComponent};
export {SinglShowcaseComponent};
//export  {ChallengeSummaryComponent};
