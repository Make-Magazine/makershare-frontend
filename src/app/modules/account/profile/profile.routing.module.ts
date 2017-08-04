import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from 'app/modules/account/profile/base/base.component';
import { ProfileComponent } from 'app/modules/account/profile/view/profile.component';

export const ProfileRouts: Routes = [
  {
    path: '',
    children: [
      { path: '', component: BaseComponent },
      { path: ':user_name', component: ProfileComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(ProfileRouts)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
