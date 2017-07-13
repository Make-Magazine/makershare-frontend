import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChallengesComponent } from './challenges/challenges.component';
import { ChallengeProjectComponent } from './enter-challenge-project/challenge-project.component';
import { AuthGuardService } from '../../auth0/auth-guard.service';

const ChallengeRouts: Routes = [
  {
    path: '',
    children: [
      { path: '', component: ChallengesComponent },
      { path: ':path', loadChildren: './challenge-data/challenge-data.module#ChallengeDataModule' },
    { path: 'enter-mission/:nid', component: ChallengeProjectComponent , canActivate: [AuthGuardService] },
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(ChallengeRouts),
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})

export class ChallengeRoutingModule { }





