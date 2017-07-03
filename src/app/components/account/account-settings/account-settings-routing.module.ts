import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { defaultSettingsComponent } from './default-settings/default-settings.component';
import {ParentSettingsComponent} from './parent-settings/parent-settings.component';
const  DefaultSettingsRoutes: Routes = [

      { path: 'notifications', component: ParentSettingsComponent },

];
@NgModule({
  imports: [
    CommonModule,
        RouterModule.forChild(DefaultSettingsRoutes),

    
  ],
  declarations: []
})
export class AccountSettingsRoutingModule { }
