import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChallengesComponent } from './challenges/challenges.component';
import { ChallengeProjectComponent } from './enter-challenge-project/challenge-project.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { SharedModule } from '../shared/shared.module';

import { ChallengeRoutingModule } from './challenge-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ChallengeRoutingModule,
    NgbModule,
    SharedModule.forChild(),
  ],
  declarations: [
    ChallengesComponent,
    ChallengeProjectComponent,

  ],
  providers: []
})
export class ChallengeModule { }
export { ChallengesComponent };

