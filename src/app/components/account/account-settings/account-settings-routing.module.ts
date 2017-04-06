import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { NotificationsSettingsComponent } from './notifications-settings/notifications-settings.component';
const  NotificationsSettingsRoutes: Routes = [

      { path: '', component: NotificationsSettingsComponent },
];
@NgModule({
  imports: [
    CommonModule,
        RouterModule.forChild(NotificationsSettingsRoutes),

    
  ],
  declarations: []
})
export class AccountSettingsRoutingModule { }
