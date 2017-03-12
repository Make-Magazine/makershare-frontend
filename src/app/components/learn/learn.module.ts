import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LearnComponent } from './learn/learn.component';
import { IndividualWorkshopComponent } from './individual-workshop/individual-workshop.component';
import { PdfViewerComponent } from '../../../../node_modules/ng2-pdf-viewer';
import { BookComponent } from './book/book.component';

import { SharedModule } from '../shared/shared.module';
import { LearnRoutingModule }from './learn-routing.module'




@NgModule({ 
  imports: [
    CommonModule,
    SharedModule,

    LearnRoutingModule

  ],
  declarations: [
    LearnComponent,
    IndividualWorkshopComponent,
    PdfViewerComponent,
    BookComponent,
  ]
})
export class LearnModule { }
export {LearnComponent}; 