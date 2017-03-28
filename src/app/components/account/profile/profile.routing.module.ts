import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProfileComponent } from './edit/edit-profile/edit-profile.component';
import { AllProfileComponent } from './edit/all-profile/all-profile.component';
import { ProfileComponent } from './view/profile.component'



const ProfileRouts: Routes = [

  {
    path: '',
    children: [
      { path: '', component: ProfileComponent },
      { path: 'editprofile', loadChildren: 'app/components/account/profile/edit/edit-profile/edit-profile.module#EditProfileModule' },
      { path: 'editportfolio', loadChildren: 'app/components/account/profile/edit/edit-portfolio/edit-portfolio.module#EditPortfolioModule' },
    ]
  }
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
