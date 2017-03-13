import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EditProfileComponent } from './edit-profile.component';

const EditProfileRouts: Routes = [
  {
    path: '', component: EditProfileComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(EditProfileRouts),
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class EditProfileRoutingModule { }
