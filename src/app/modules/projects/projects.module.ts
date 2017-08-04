import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProjectsRoutingModule } from 'app/modules/projects/projects-routing.module';
import { ProjectsComponent } from 'app/modules/projects/projects.component';
import { SharedModule } from 'app/modules/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    SharedModule.forChild(),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  declarations: [ProjectsComponent],
  exports: [],
})
export class ProjectsModule {}
