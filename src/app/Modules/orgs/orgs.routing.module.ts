import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrgsComponent } from './orgs.component';
import { AuthGuardService } from '../../Modules/auth0/auth-guard.service';

const orgsRouts: Routes = [
  { path: 'create', loadChildren: './org-form/org-form.module#OrgFormModule', canActivate: [AuthGuardService]},
  { path: ':path', component:OrgsComponent },
  { path: ':path/edit', loadChildren: './org-form/org-form.module#OrgFormModule', canActivate: [AuthGuardService]},
];

@NgModule({
  imports: [
    RouterModule.forChild(orgsRouts),
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})


export class OrgsRoutingModule { }
