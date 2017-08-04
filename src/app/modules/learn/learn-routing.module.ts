import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndividualWorkshopComponent } from 'app/modules/learn/individual-workshop/individual-workshop.component';
import { SingleObjectComponent } from 'app/modules/learn/individual-workshop/single-object/single-object.component';
import { LearnComponent } from 'app/modules/learn/learn/learn.component';

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
