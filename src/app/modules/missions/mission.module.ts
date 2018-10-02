import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MissionProjectComponent } from '../missions/enter-mission-project/mission-project.component';
import { MissionRoutingModule } from '../missions/mission-routing.module';
import { MissionsComponent } from '../missions/missions/missions.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    MissionRoutingModule,
    SharedModule.forChild(),
  ],
  declarations: [MissionsComponent, MissionProjectComponent],
  providers: [],
})
export class MissionModule {}
export { MissionsComponent };
