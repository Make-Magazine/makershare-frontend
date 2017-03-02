import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProfileComponent } from './edit/edit-profile/edit-profile.component';



const ProfileRouts: Routes = [
  { path: 'editprofile',  component:  EditProfileComponent}
 // { path: 'project/view/:nid', component: ProjectDetailsComponent }
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
