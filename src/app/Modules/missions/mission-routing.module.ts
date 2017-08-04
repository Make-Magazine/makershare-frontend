import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MissionsComponent } from './missions/missions.component';
import { MissionProjectComponent } from './enter-mission-project/mission-project.component';
import { AuthGuardService } from '../auth0/auth-guard.service';

const MissionRoutes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: MissionsComponent },
      {
        path: ':path',
        loadChildren:
          './mission-data/mission-data.module#MissionDataModule',
      },
      {
        path: 'enter-mission/:nid',
        component: MissionProjectComponent,
        canActivate: [AuthGuardService],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(MissionRoutes)],
  exports: [RouterModule],
  declarations: [],
})
export class MissionRoutingModule {}
