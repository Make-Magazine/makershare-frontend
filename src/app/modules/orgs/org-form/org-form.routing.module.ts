import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../../auth0/auth-guard.service';
import { OrgFormComponent } from '../../orgs/org-form/org-form/org-form.component';

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
