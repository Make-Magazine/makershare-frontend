import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../../auth0/auth-guard.service';

//modules
import { CollectionModule } from './collection/collection.module';
import { AccountSettingsModule } from './account-settings/account-settings.module';
import { MessagesModule } from './messages/messages.module';

const AccountRouts: Routes = [
  {
    path: '',
    children: [
      { path: 'collection', loadChildren: './collection/collection.module#CollectionModule',  canActivate: [AuthGuardService]},
      { path: 'settings', loadChildren: './account-settings/account-settings.module#AccountSettingsModule',  canActivate: [AuthGuardService]},
      { path: 'inbox', loadChildren: './messages/messages.module#MessagesModule',  canActivate: [AuthGuardService]},
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
