import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProjectDetailsRoutingModule } from '../../projects/project-details/project-details-routing.module';
import { ProjectDetailsComponent } from '../../projects/project-details/project-details.component';
import { ProjectHowToComponent } from '../../projects/project-details/project-how-to/project-how-to.component';
import { ProjectStoryComponent } from '../../projects/project-details/project-story/project-story.component';
import { SharedModule } from '../../shared/shared.module';

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
