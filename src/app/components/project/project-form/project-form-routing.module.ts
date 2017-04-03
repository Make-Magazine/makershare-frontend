import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectFormComponent } from './project-form/project-form.component';
import { AuthGuardService } from '../../../auth0/auth-guard.service';
import { AccessDeniedComponent } from '../../../auth0/access-denied/access-denied.component';
import { Four04Component } from '../../../auth0/four04/four04.component'

export const ProjectFormRoutes:Routes = [
  { path:'',component:ProjectFormComponent,canActivate: [AuthGuardService]},
  { path:':nid',component:ProjectFormComponent,canActivate: [AuthGuardService]}
]

@NgModule({
  imports: [
    RouterModule.forChild(ProjectFormRoutes),
  ],
  exports: [
    RouterModule,
  ],
})

export class ProjectFormRoutingModule { }
