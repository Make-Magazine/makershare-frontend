import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowcasesCollectionComponent } from './showcase-collection/showcasesCollection.component';
import { SinglShowcaseComponent } from './single-showcase/SingleShowcase.component';
import { ShowcaseSortingComponent } from './showcaseSorting.component';
import { ShowcaseRoutingModule } from './showcase-routing.module'
import { SharedModule } from '../shared/shared.module';
import { ShowcaseProjectModule } from './showcase-project/showcase-project.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    ShowcaseRoutingModule,
    SharedModule.forChild(),
    NgbModule,
    ShowcaseProjectModule,

  ],
  declarations: [
    ShowcasesCollectionComponent,
    SinglShowcaseComponent,
    ShowcaseSortingComponent,
    
  ],
})

export class ShowcaseModule { }
export  {ShowcasesCollectionComponent};
export  {SinglShowcaseComponent};
export  {ShowcaseSortingComponent};
