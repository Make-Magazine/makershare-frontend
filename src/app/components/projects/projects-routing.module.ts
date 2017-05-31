import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsComponent } from './projects.component';
import { AuthGuardService } from '../../auth0/auth-guard.service';

//modules
import { ProjectFormModule } from './project-form/project-form.module';
import { ProjectDetailsModule } from './project-details/project-details.module';

const ProjectsRouts: Routes = [
  { path: '', component:ProjectsComponent },
  { path: 'create', loadChildren: './project-form/project-form.module#ProjectFormModule', canActivate: [AuthGuardService]},
  { path: ':path/edit', loadChildren: './project-form/project-form.module#ProjectFormModule', canActivate: [AuthGuardService]},
  { path: ':path', loadChildren: './project-details/project-details.module#ProjectDetailsModule' },
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
