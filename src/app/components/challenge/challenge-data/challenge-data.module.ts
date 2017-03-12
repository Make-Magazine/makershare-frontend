import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChallengeDataComponent } from './challenge-data.component';
import { ChallengeDataRoutingModule } from './challenge-data-routing.module'
import { RulesComponent } from './rules/rules.component'
import { DiscussionComponent } from './discussion/discussion.component';
import { FollowersComponent } from './followers/followers.component';
import { SummaryComponent } from './summary/summary.component';
import { AwardsComponent } from './awards/awards.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  imports: [
    CommonModule,
    ChallengeDataRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    FollowersComponent,
    RulesComponent,
    DiscussionComponent,
    SummaryComponent,
    AwardsComponent,
    ChallengeDataComponent

  ]
})
export class ChallengeDataModule { }
export { ChallengeDataComponent };

