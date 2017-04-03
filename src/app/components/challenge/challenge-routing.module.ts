import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ChallengesComponent } from './challenges/challenges.component';
import { ChallengeProjectComponent } from './enter-challenge-project/challenge-project.component';
import { AuthGuardService } from '../../auth0/auth-guard.service';
import { AccessDeniedComponent } from '../../auth0/access-denied/access-denied.component';
import { Four04Component } from '../../auth0/four04/four04.component'

const ChallengeRouts: Routes = [
  {
    path: '',
    children: [
      { path: '', component: ChallengesComponent },
      { path: ':nid', loadChildren: 'app/components/challenge/challenge-data/challenge-data.module#ChallengeDataModule' },
      { path: 'enter-challenge', component: ChallengeProjectComponent,  canActivate: [AuthGuardService] },
      { path: 'enter-challenge/:nid', component: ChallengeProjectComponent , canActivate: [AuthGuardService] },
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





