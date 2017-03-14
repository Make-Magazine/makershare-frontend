import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ChallengesComponent } from './challenges/challenges.component';
import { ChallengeProjectComponent } from './enter-challenge-project/challenge-project.component';


const ChallengeRouts: Routes = [
  {
    path: '',
    children: [
      { path: '', component: ChallengesComponent },
      { path: ':nid', loadChildren: 'app/components/challenge/challenge-data/challenge-data.module#ChallengeDataModule' },
      { path: 'enter-challenge', component: ChallengeProjectComponent },
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(ChallengeRouts),
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})

export class ChallengeRoutingModule { }





