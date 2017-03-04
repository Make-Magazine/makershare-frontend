import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './view/profile.component';
import { ProjectsComponent } from './view/projects/projects.component';
import { EditProfileComponent } from './edit/edit-profile/edit-profile.component';
import { BasicInfoComponent } from './edit/edit-profile/basic-info/basic-info.component';
import { OptionalInfoComponent } from './edit/edit-profile/optional-info/optional-info.component';
import { ProfileRoutingModule } from './profile.routing.module';
<<<<<<< HEAD
// import {SelectModule} from 'ng-select';
=======
import {SelectModule} from '../../../../../node_modules/ng-select';
>>>>>>> 98e075e39b2d02248712367cd0c3398097087dd4

@NgModule({
  imports: [
    CommonModule, 
    ProfileRoutingModule,
    ReactiveFormsModule,
    // SelectModule
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
