import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './view/profile.component';
import { ProjectsComponent } from './view/projects/projects.component';
import { ProfileRoutingModule } from './profile.routing.module';
import { SelectModule } from 'ng2-select';
import { IcDatepickerModule } from 'ic-datepicker';
import { AllProfileComponent } from './edit/all-profile/all-profile.component';
import { TagInputModule } from 'ng2-tag-input';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import { FormsModule } from '@angular/forms';



@NgModule({
  imports: [
    IcDatepickerModule,
    CommonModule,
    ProfileRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2AutoCompleteModule,
    SelectModule,
    TagInputModule
  ],
  declarations: [
    AllProfileComponent,
    ProfileComponent,
    ProjectsComponent
  ]
})
export class ProfileModule { }
