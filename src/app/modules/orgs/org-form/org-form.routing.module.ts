import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrgFormComponent } from 'app/modules/orgs/org-form/org-form/org-form.component';
import { AuthGuardService } from 'app/modules/auth0/auth-guard.service';

const orgsRouts: Routes = [
  { path: '', component: OrgFormComponent, canActivate: [AuthGuardService] },
  {
    path: ':path/edit',
    component: OrgFormComponent,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(orgsRouts)],
  exports: [RouterModule],
  declarations: [],
})
export class OrgsRoutingModule {}
