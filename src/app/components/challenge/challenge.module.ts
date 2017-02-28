import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChallengesComponent } from './challenges/challenges.component';
import { ChallengeDataComponent } from './challenge-data/challenge-data.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ChallengesComponent,
    ChallengeDataComponent
  ]
})
export class ChallengeModule { }
export  {ChallengesComponent};
export {ChallengeDataComponent};