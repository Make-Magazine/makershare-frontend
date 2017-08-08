import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectFormComponent } from './project-form/project-form.component';
import { PendingChangesGuard } from './pending-changes.guard';
import { AuthGuardService } from '../../auth0/auth-guard.service';

export const ProjectFormRoutes: Routes = [
  {
    path: '',
    component: ProjectFormComponent,
    canActivate: [AuthGuardService],
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: ':path/edit',
    component: ProjectFormComponent,
    canActivate: [AuthGuardService],
    canDeactivate: [PendingChangesGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(ProjectFormRoutes)],
  exports: [RouterModule],
})
export class ProjectFormRoutingModule {}
