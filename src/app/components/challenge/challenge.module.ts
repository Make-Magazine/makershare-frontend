import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChallengesComponent } from './challenges/challenges.component';
import { ChallengeSummaryComponent } from './challenge-summary/challenge-summary.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ChallengesComponent,
    ChallengeSummaryComponent,
  ]
})
export class ChallengeModule { }
export  {ChallengesComponent};
export  {ChallengeSummaryComponent};