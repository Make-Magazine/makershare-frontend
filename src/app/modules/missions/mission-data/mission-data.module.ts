import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../shared/shared.module';
import { AwardsComponent } from './awards/awards.component';
import { BriefComponent } from './brief/brief.component';
import { DiscussionComponent } from './discussion/discussion.component';
import { FollowersComponent } from './followers/followers.component';
import { MissionDataRoutingModule } from './mission-data-routing.module';
import { MissionDataComponent } from './mission-data.component';
import { RulesComponent } from './rules/rules.component';
import { SummaryComponent } from './summary/summary.component';

@NgModule({
  imports: [
    CommonModule,
    MissionDataRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule.forChild(),
    NgbModule,
    // MetaModule.forRoot(),
  ],
  declarations: [
    FollowersComponent,
    RulesComponent,
    BriefComponent,
    DiscussionComponent,
    SummaryComponent,
    AwardsComponent,
    MissionDataComponent,
  ],
})
export class MissionDataModule {}
export { MissionDataComponent };
