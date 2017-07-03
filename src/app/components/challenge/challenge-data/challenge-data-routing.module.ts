import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ChallengeDataComponent } from './challenge-data.component';


const ChallengeDataRouts: Routes = [
  {
    path: '', component: ChallengeDataComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(ChallengeDataRouts),
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})

export class ChallengeDataRoutingModule { }
