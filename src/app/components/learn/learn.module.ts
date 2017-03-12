import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LearnComponent } from './learn/learn.component';
import { IndividualWorkshopComponent } from './individual-workshop/individual-workshop.component';
import { PdfViewerComponent } from '../../../../node_modules/ng2-pdf-viewer';
import { BookComponent } from './book/book.component';
import { LearnRoutingModule }from './learn-routing.module';
import { Ng2PageScrollModule } from 'ng2-page-scroll';
import { SharedModule } from '../shared/shared.module';





@NgModule({ 
  imports: [
    CommonModule,
    LearnRoutingModule,
    Ng2PageScrollModule.forRoot(),
    SharedModule,

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