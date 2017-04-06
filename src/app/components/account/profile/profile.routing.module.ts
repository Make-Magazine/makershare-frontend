import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProfileComponent } from './edit/edit-profile/edit-profile.component';
import { AllProfileComponent } from './edit/all-profile/all-profile.component';
import { ProfileComponent } from './view/profile.component'
import { ProfileComponent as profilecomponent} from './view/profile.component';
import { AuthGuardService } from '../../../auth0/auth-guard.service';
import { BaseComponent } from './base/base.component';


const ProfileRouts: Routes = [

  {
    path: '',
    children: [
      { path: '',  component: BaseComponent},
      { path: ':user_name', component: profilecomponent },
      { path: 'editprofile', loadChildren: 'app/components/account/profile/edit/edit-profile/edit-profile.module#EditProfileModule',  canActivate: [AuthGuardService]},
      { path: 'editportfolio/edit', loadChildren: 'app/components/account/profile/edit/edit-portfolio/edit-portfolio.module#EditPortfolioModule',  canActivate: [AuthGuardService]},
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
