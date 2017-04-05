import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../../auth0/auth-guard.service';
import { AccessDeniedComponent } from '../../auth0/access-denied/access-denied.component';
import { Four04Component } from '../../auth0/four04/four04.component';

const ProjectRouts: Routes = [
  {
    path: '',
    children: [
      { path: 'create', loadChildren: 'app/components/project/project-form/project-form.module#ProjectFormModule', canActivate: [AuthGuardService]},
      { path: 'edit', loadChildren: 'app/components/project/project-form/project-form.module#ProjectFormModule', canActivate: [AuthGuardService]},
      { path: 'view/:nid', loadChildren: 'app/components/project/project-details/project-details.module#ProjectDetailsModule' },
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(ProjectRouts),
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})

export class ProjectRoutingModule { }
