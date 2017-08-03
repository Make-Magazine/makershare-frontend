import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './view/profile.component';
import { BaseComponent } from './base/base.component';


export const ProfileRouts: Routes = [
  {
    path: '',
    children: [
      { path: '',  component: BaseComponent},
      { path: ':user_name', component: ProfileComponent },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(ProfileRouts),
  ],
  exports: [
    RouterModule
  ]
})

export class ProfileRoutingModule { }
