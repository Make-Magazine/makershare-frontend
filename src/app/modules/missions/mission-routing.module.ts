import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'app/modules/auth0/auth-guard.service';
import { MissionProjectComponent } from 'app/modules/missions/enter-mission-project/mission-project.component';
import { MissionsComponent } from 'app/modules/missions/missions/missions.component';

const MissionRoutes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: MissionsComponent },
      {
        path: ':path',
        loadChildren: './mission-data/mission-data.module#MissionDataModule',
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
