import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectDetailsComponent } from '../../projects/project-details/project-details.component';

const ProjectRouts: Routes = [
  {
    path: '',
    component: ProjectDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(ProjectRouts)],
  exports: [RouterModule],
  declarations: [],
})
export class ProjectDetailsRoutingModule {}
