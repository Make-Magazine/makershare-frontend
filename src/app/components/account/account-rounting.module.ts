import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../../auth0/auth-guard.service';

const AccountRouts: Routes = [

  {
    path: '',
    children: [
      { path: 'editprofile', loadChildren: 'app/components/account/profile/edit/edit-profile/edit-profile.module#EditProfileModule',  canActivate: [AuthGuardService]},
      { path: 'collection', loadChildren: 'app/components/account/collection/collection.module#CollectionModule',  canActivate: [AuthGuardService]},
      { path: 'settings', loadChildren: 'app/components/account/account-settings/account-settings.module.ts#AccountSettingsModule',  canActivate: [AuthGuardService]},
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(AccountRouts),
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})

export class AccountRountingModule { }
