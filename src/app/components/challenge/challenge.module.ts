import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChallengesComponent } from './challenges/challenges.component';

import { ChallengeDataComponent } from './challenge-data/challenge-data.component';

import { ChallengeSummaryComponent } from './challenge-summary/challenge-summary.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ChallengesComponent,

    ChallengeDataComponent,

    ChallengeSummaryComponent,

  ]
})
export class ChallengeModule { }
export  {ChallengesComponent};
export {ChallengeDataComponent};
export  {ChallengeSummaryComponent};
