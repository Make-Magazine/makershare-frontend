import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './view/profile.component';
import { ProjectsComponent } from './view/projects/projects.component';
import { EditProfileComponent } from './edit/edit-profile/edit-profile.component';
import { BasicInfoComponent } from './edit/edit-profile/basic-info/basic-info.component';
import { OptionalInfoComponent } from './edit/edit-profile/optional-info/optional-info.component';
import { ProfileRoutingModule } from './profile.routing.module';
import { SelectModule } from 'ng2-select';
import { IcDatepickerModule } from 'ic-datepicker';
import { AllProfileComponent } from './edit/all-profile/all-profile.component';
import { TagInputModule } from 'ng2-tag-input';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';



@NgModule({
  imports: [
    IcDatepickerModule,
    CommonModule,
    ProfileRoutingModule,
    ReactiveFormsModule,
    Ng2AutoCompleteModule,
    SelectModule,
    TagInputModule
  ],
  declarations: [
    AllProfileComponent,
    EditProfileComponent,
    BasicInfoComponent,
    OptionalInfoComponent,
    ProfileComponent,
    ProjectsComponent
  ]
})
export class ProfileModule { }
