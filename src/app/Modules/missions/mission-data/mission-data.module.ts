import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MissionDataComponent } from './mission-data.component';
import { MissionDataRoutingModule } from './mission-data-routing.module';
import { RulesComponent } from './rules/rules.component';
import { BriefComponent } from './brief/brief.component';
import { DiscussionComponent } from './discussion/discussion.component';
import { FollowersComponent } from './followers/followers.component';
import { SummaryComponent } from './summary/summary.component';
import { AwardsComponent } from './awards/awards.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { MetaModule } from '@nglibs/meta';

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
