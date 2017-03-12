import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProfileComponent } from './edit/edit-profile/edit-profile.component';
import { AllProfileComponent } from './edit/all-profile/all-profile.component';




const ProfileRouts: Routes = [
  { path: 'editprofile',  component:  EditProfileComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(ProfileRouts),
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})

export class ProfileRoutingModule { }
