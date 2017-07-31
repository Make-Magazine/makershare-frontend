import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrgFormComponent } from './org-form/org-form.component';
import { AuthGuardService } from '../../../auth0/auth-guard.service';
import { PendingChangesGuard } from '../../projects/project-form/pending-changes.guard';

const orgsRouts: Routes = [
   { path:'',component:OrgFormComponent,canActivate: [AuthGuardService],canDeactivate: [PendingChangesGuard]},
   { path:':path/edit',component:OrgFormComponent,canActivate: [AuthGuardService],canDeactivate: [PendingChangesGuard]}
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
