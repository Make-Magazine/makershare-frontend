import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccountSettingsRoutingModule } from './account-settings-routing.module';
import { AdminSettingsComponent } from './admin-settings/admin-settings.component';
import { ChallengeAdminSettingsComponent } from './challenge-admin-settings/challenge-admin-settings.component';
import { CommunityManagerSettingsComponent } from './community-manager-settings/community-manager-settings.component';
import { DefaultSettingsComponent } from './default-settings/default-settings.component';
import { ParentSettingsComponent } from './parent-settings/parent-settings.component';

@NgModule({
  imports: [CommonModule, AccountSettingsRoutingModule],
  declarations: [
    DefaultSettingsComponent,
    ParentSettingsComponent,
    AdminSettingsComponent,
    ChallengeAdminSettingsComponent,
    CommunityManagerSettingsComponent,
  ],
  exports: [DefaultSettingsComponent],
})
export class AccountSettingsModule {}
export { DefaultSettingsComponent };
