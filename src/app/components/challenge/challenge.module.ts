import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChallengesComponent } from './challenges/challenges.component';
import { ChallengeDataComponent } from './challenge-data/challenge-data.component';
import { RulesComponent } from './challenge-data/rules/rules.component'
import { DiscussionComponent } from './challenge-data/discussion/discussion.component';
import { FollowersComponent } from './challenge-data/followers/followers.component';
import { SummaryComponent } from './challenge-data/summary/summary.component';
import { AwardsComponent } from './challenge-data/awards/awards.component';
import { ChallengeProjectComponent } from './enter-challenge-project/challenge-project.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChallengeRoutingModule }from './challenge-routing.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ChallengeRoutingModule,
  ],
  declarations: [
    ChallengesComponent,
    ChallengeDataComponent,
    FollowersComponent,
    ChallengeProjectComponent,
    RulesComponent,
    DiscussionComponent,
    SummaryComponent,
    AwardsComponent,

  ]
})
export class ChallengeModule { }
export  {ChallengesComponent};
export {ChallengeDataComponent};

