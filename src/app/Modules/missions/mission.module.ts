import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MissionsComponent } from './missions/missions.component';
import { MissionProjectComponent } from './enter-mission-project/mission-project.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MissionRoutingModule } from './mission-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
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
