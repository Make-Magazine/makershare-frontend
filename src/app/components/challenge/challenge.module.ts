import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChallengesComponent } from './challenges/challenges.component';
import { ChallengeProjectComponent } from './enter-challenge-project/challenge-project.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChallengeRoutingModule } from './challenge-routing.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ChallengeRoutingModule,
  ],
  declarations: [
    ChallengesComponent,
    ChallengeProjectComponent,
  ]
})
export class ChallengeModule { }
export { ChallengesComponent };

