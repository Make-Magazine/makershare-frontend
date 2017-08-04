import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccountSettingsRoutingModule } from 'app/modules/account/account-settings/account-settings-routing.module';
import { AdminSettingsComponent } from 'app/modules/account/account-settings/admin-settings/admin-settings.component';
import { ChallengeAdminSettingsComponent } from 'app/modules/account/account-settings/challenge-admin-settings/challenge-admin-settings.component';
import { CommunityManagerSettingsComponent } from 'app/modules/account/account-settings/community-manager-settings/community-manager-settings.component';
import { defaultSettingsComponent } from 'app/modules/account/account-settings/default-settings/default-settings.component';
import { ParentSettingsComponent } from 'app/modules/account/account-settings/parent-settings/parent-settings.component';

@NgModule({
  imports: [CommonModule, AccountSettingsRoutingModule],
  declarations: [
    defaultSettingsComponent,
    ParentSettingsComponent,
    AdminSettingsComponent,
    ChallengeAdminSettingsComponent,
    CommunityManagerSettingsComponent,
  ],
  exports: [defaultSettingsComponent],
})
export class AccountSettingsModule {}
export { defaultSettingsComponent };
