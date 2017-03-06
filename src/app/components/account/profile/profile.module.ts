import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './view/profile.component';
import { ProjectsComponent } from './view/projects/projects.component';
import { EditProfileComponent } from './edit/edit-profile/edit-profile.component';
import { BasicInfoComponent } from './edit/edit-profile/basic-info/basic-info.component';
import { OptionalInfoComponent } from './edit/edit-profile/optional-info/optional-info.component';
import { ProfileRoutingModule } from './profile.routing.module';
import { SelectModule } from '../../../../../node_modules/ng-select';
import { IcDatepickerModule } from 'ic-datepicker';


@NgModule({
  imports: [
    IcDatepickerModule,
    CommonModule,
    ProfileRoutingModule,
    ReactiveFormsModule,
    SelectModule
  ],
  declarations: [
    EditProfileComponent,
    BasicInfoComponent,
    OptionalInfoComponent,
    ProfileComponent,
    ProjectsComponent
  ]
})
export class ProfileModule { }
