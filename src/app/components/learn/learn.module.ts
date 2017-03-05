import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LearnComponent } from './learn/learn.component';
import { IndividualWorkshopComponent } from './individual-workshop/individual-workshop.component';
import { PdfViewerComponent } from '../../../../node_modules/ng2-pdf-viewer';



@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LearnComponent,
    IndividualWorkshopComponent,
    PdfViewerComponent
  ]
})
export class LearnModule { }
export {LearnComponent};
