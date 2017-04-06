import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { defaultSettingsComponent } from './default-settings/default-settings.component';
import { AccountSettingsRoutingModule} from './account-settings-routing.module';
import { ParentSettingsComponent } from './parent-settings/parent-settings.component';
import { AdminSettingsComponent } from './admin-settings/admin-settings.component';
import { ChallengeAdminSettingsComponent } from './challenge-admin-settings/challenge-admin-settings.component';
import { CommunityManagerSettingsComponent } from './community-manager-settings/community-manager-settings.component';

@NgModule({
  imports: [
    CommonModule,
    AccountSettingsRoutingModule
  ],
  declarations: [
    defaultSettingsComponent,
    ParentSettingsComponent,
    AdminSettingsComponent,
    ChallengeAdminSettingsComponent,
    CommunityManagerSettingsComponent
    ],
    exports: [
 
    defaultSettingsComponent
  ]
})
export class AccountSettingsModule { }
export  {
  defaultSettingsComponent,
};
