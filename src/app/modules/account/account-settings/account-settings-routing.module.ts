import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParentSettingsComponent } from 'app/modules/account/account-settings/parent-settings/parent-settings.component';

const DefaultSettingsRoutes: Routes = [
  { path: 'notifications', component: ParentSettingsComponent },
];
@NgModule({
  imports: [CommonModule, RouterModule.forChild(DefaultSettingsRoutes)],
  declarations: [],
})
export class AccountSettingsRoutingModule {}
