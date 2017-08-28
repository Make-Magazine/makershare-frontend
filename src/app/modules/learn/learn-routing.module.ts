import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndividualWorkshopComponent } from '../learn/individual-workshop/individual-workshop.component';
import { SingleObjectComponent } from '../learn/individual-workshop/single-object/single-object.component';
import { LearnComponent } from '../learn/learn/learn.component';

const LearnRouts: Routes = [
  {
    path: '',
    children: [
      { path: '', component: LearnComponent },
      { path: ':path', component: IndividualWorkshopComponent },
      { path: 'lessons/:workshopID/:nid', component: SingleObjectComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(LearnRouts)],
  exports: [RouterModule],
  declarations: [],
})
export class LearnRoutingModule {}
