import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ChallengeDataComponent } from './challenge-data/challenge-data.component';
import { ChallengeSummaryComponent } from './challenge-summary/challenge-summary.component';
import { ProjectDetailsComponent } from '../project/project-details/project-details.component';
const SummaryRoute: Routes = [
  { path: 'challenge-summary/:nid',  component: ChallengeSummaryComponent },
  { path: 'project/view/:nid',  component: ProjectDetailsComponent },
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(SummaryRoute)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class ChallengeRoutingModule { }





