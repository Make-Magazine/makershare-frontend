import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AwardsComponent } from 'app/modules/missions/mission-data/awards/awards.component';
import { BriefComponent } from 'app/modules/missions/mission-data/brief/brief.component';
import { DiscussionComponent } from 'app/modules/missions/mission-data/discussion/discussion.component';
import { FollowersComponent } from 'app/modules/missions/mission-data/followers/followers.component';
import { MissionDataRoutingModule } from 'app/modules/missions/mission-data/mission-data-routing.module';
import { MissionDataComponent } from 'app/modules/missions/mission-data/mission-data.component';
import { RulesComponent } from 'app/modules/missions/mission-data/rules/rules.component';
import { SummaryComponent } from 'app/modules/missions/mission-data/summary/summary.component';
import { SharedModule } from 'app/modules/shared/shared.module';

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
