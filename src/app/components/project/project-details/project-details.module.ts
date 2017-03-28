import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectDetailsRoutingModule } from './project-details-routing.module'
import { ReactiveFormsModule } from '@angular/forms';
import { ProjectDetailsComponent } from './project-details.component';
import { ProjectStoryComponent } from './project-story/project-story.component';
import { ProjectHowToComponent } from './project-how-to/project-how-to.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProjectHeaderComponent } from './project-header/project-header.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProjectDetailsRoutingModule,
    SharedModule,
    NgbModule,
  ],
  declarations: [ProjectDetailsComponent,ProjectStoryComponent,ProjectHowToComponent, ProjectHeaderComponent]
})
export class ProjectDetailsModule { }
