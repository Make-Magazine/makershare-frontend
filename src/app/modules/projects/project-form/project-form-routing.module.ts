import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'app/modules/auth0/auth-guard.service';
import { PendingChangesGuard } from 'app/modules/projects/project-form/pending-changes.guard';
import { ProjectFormComponent } from 'app/modules/projects/project-form/project-form/project-form.component';

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
