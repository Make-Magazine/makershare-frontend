import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LearnComponent } from './learn/learn.component';
import { IndividualWorkshopComponent } from './individual-workshop/individual-workshop.component';
import { SingleObjectComponent } from './individual-workshop/single-object/single-object.component';

const LearnRouts: Routes = [
  {
    path: '', 
    children: [
      { path: '', component:LearnComponent },
      { path: ':path', component:IndividualWorkshopComponent },
      { path: 'lessons/:workshopID/:nid',  component:SingleObjectComponent },
      

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
