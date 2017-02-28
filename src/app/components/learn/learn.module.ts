import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LearnComponent } from './learn/learn.component';
import { IndividualWorkshopComponent } from './individual-workshop/individual-workshop.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LearnComponent,
    IndividualWorkshopComponent
  ]
})
export class LearnModule { }
export {LearnComponent};
