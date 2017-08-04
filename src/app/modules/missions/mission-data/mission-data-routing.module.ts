import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MissionDataComponent } from 'app/modules/missions/mission-data/mission-data.component';

const MissionDataRoutes: Routes = [
  {
    path: '',
    component: MissionDataComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(MissionDataRoutes)],
  exports: [RouterModule],
  declarations: [],
})
export class MissionDataRoutingModule {}
