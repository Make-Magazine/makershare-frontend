import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsComponent } from './projects.component';
import { AuthGuardService } from '../../auth0/auth-guard.service';

const ProjectsRouts: Routes = [
  { path: '', component:ProjectsComponent },
  { path: 'create', loadChildren: 'app/components/projects/project-form/project-form.module#ProjectFormModule', canActivate: [AuthGuardService]},
  { path: ':title/edit', loadChildren: 'app/components/projects/project-form/project-form.module#ProjectFormModule', canActivate: [AuthGuardService]},
  { path: ':title', loadChildren: 'app/components/projects/project-details/project-details.module#ProjectDetailsModule' },
];

@NgModule({
  imports: [
    RouterModule.forChild(ProjectsRouts),
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})


export class ProjectsRoutingModule { }
