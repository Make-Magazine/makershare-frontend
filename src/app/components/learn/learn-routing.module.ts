import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LearnComponent } from './learn/learn.component'
import { IndividualWorkshopComponent } from './individual-workshop/individual-workshop.component'



const LearnRouts: Routes = [
  {
    path: '', 
    children: [
      { path: '', component:LearnComponent },
      { path: ':nid', component:IndividualWorkshopComponent }
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(LearnRouts),
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})

export class LearnRoutingModule { }
