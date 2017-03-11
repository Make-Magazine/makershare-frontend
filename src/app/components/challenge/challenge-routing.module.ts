import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ChallengesComponent } from './challenges/challenges.component';
import { ChallengeDataComponent } from './challenge-data/challenge-data.component';

const ChallengeRouts: Routes = [
  {
    path: '', 
    children: [
      { path: '', component:ChallengesComponent },
      { path: ':nid', component:ChallengeDataComponent }
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





