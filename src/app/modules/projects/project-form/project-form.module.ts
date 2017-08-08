import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomFormsModule } from 'ng2-validation';
import { EntityReferenceNoNid } from '../../../Angular/pipes/EntityReferenceWithoutNid';
import { HowToComponent } from '../../projects/project-form/how-to/how-to.component';
import { PendingChangesGuard } from '../../projects/project-form/pending-changes.guard';
import { ProjectFormRoutingModule } from '../../projects/project-form/project-form-routing.module';
import { ProjectFormComponent } from '../../projects/project-form/project-form/project-form.component';
import { TeamComponent } from '../../projects/project-form/team/team.component';
import { YourStoryComponent } from '../../projects/project-form/your-story/your-story.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ProjectFormRoutingModule,
    NgbModule,
    SharedModule.forChild(),
    CustomFormsModule,
  ],
  declarations: [
    YourStoryComponent,
    HowToComponent,
    TeamComponent,
    ProjectFormComponent,
    EntityReferenceNoNid,
  ],
  providers: [PendingChangesGuard],
})
export class ProjectFormModule {}
