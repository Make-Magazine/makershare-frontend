import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChallengesComponent } from './challenges/challenges.component';
import { ChallengeProjectComponent } from './enter-challenge-project/challenge-project.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
<<<<<<< HEAD
import { SharedModule } from '../shared/shared.module';
=======
import { ChallengeRoutingModule } from './challenge-routing.module';


>>>>>>> ac3f2cb7aabd58da1248e6a204b213022cc63cf9

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
<<<<<<< HEAD
    SharedModule
=======
    ChallengeRoutingModule,
>>>>>>> ac3f2cb7aabd58da1248e6a204b213022cc63cf9
  ],
  declarations: [
    ChallengesComponent,
    ChallengeProjectComponent,
<<<<<<< HEAD
    RulesComponent, 
    DiscussionComponent,
    SummaryComponent,
    AwardsComponent,
  ],
  providers: []
=======
  ]
>>>>>>> ac3f2cb7aabd58da1248e6a204b213022cc63cf9
})
export class ChallengeModule { }
export { ChallengesComponent };

