import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsSettingsComponent } from './notifications-settings/notifications-settings.component';
import { AccountSettingsRoutingModule} from './account-settings-routing.module';

@NgModule({
  imports: [
    CommonModule,
    AccountSettingsRoutingModule
  ],
  declarations: [
    NotificationsSettingsComponent
    ],
    exports: [
 
    NotificationsSettingsComponent
  ]
})
export class AccountSettingsModule { }
export  {
  NotificationsSettingsComponent,
};
