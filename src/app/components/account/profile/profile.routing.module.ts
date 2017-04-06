import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProfileComponent } from './edit/edit-profile/edit-profile.component';
import { AllProfileComponent } from './edit/all-profile/all-profile.component';
import { ProfileComponent } from './view/profile.component'
import { AuthGuardService } from '../../../auth0/auth-guard.service';
import { AccessDeniedComponent } from '../../../auth0/access-denied/access-denied.component';
import { Four04Component } from '../../../auth0/four04/four04.component'



const ProfileRouts: Routes = [

  {
    path: '',
    children: [
      { path: '', component: ProfileComponent },
      { path: 'editprofile', loadChildren: 'app/components/account/profile/edit/edit-profile/edit-profile.module#EditProfileModule',  canActivate: [AuthGuardService]},
      { path: 'editportfolio', loadChildren: 'app/components/account/profile/edit/edit-portfolio/edit-portfolio.module#EditPortfolioModule',  canActivate: [AuthGuardService]},
      { path: 'collection', loadChildren: 'app/components/account/collection/collection.module#CollectionModule',  canActivate: [AuthGuardService]},
      { path: 'settings', loadChildren: 'app/components/account/account-settings/account-settings.module.ts#AccountSettingsModule',  canActivate: [AuthGuardService]},

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
