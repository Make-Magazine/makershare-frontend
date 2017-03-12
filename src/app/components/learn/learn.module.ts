import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LearnComponent } from './learn/learn.component';
import { IndividualWorkshopComponent } from './individual-workshop/individual-workshop.component';
import { PdfViewerComponent } from '../../../../node_modules/ng2-pdf-viewer';
import { BookComponent } from './book/book.component';
<<<<<<< HEAD
import { SharedModule } from '../shared/shared.module';
=======
import { LearnRoutingModule }from './learn-routing.module'
>>>>>>> ac3f2cb7aabd58da1248e6a204b213022cc63cf9



@NgModule({ 
  imports: [
    CommonModule,
<<<<<<< HEAD
    SharedModule,
=======
    LearnRoutingModule
>>>>>>> ac3f2cb7aabd58da1248e6a204b213022cc63cf9
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