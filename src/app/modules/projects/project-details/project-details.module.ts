import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProjectDetailsRoutingModule } from 'app/modules/projects/project-details/project-details-routing.module';
import { SharedModule } from 'app/modules/shared/shared.module';
import { ProjectDetailsComponent } from 'app/modules/projects/project-details/project-details.component';
import { ProjectStoryComponent } from 'app/modules/projects/project-details/project-story/project-story.component';
import { ProjectHowToComponent } from 'app/modules/projects/project-details/project-how-to/project-how-to.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProjectDetailsRoutingModule,
    SharedModule.forChild(),
    NgbModule,
  ],
  declarations: [
    ProjectDetailsComponent,
    ProjectStoryComponent,
    ProjectHowToComponent,
  ]
})
export class ProjectDetailsModule { }
