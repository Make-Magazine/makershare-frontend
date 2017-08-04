import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomFormsModule } from 'ng2-validation';
import { ProjectFormRoutingModule } from 'app/modules/projects/project-form/project-form-routing.module';
import { SharedModule } from 'app/modules/shared/shared.module';
import { YourStoryComponent } from 'app/modules/projects/project-form/your-story/your-story.component';
import { HowToComponent } from 'app/modules/projects/project-form/how-to/how-to.component';
import { TeamComponent } from 'app/modules/projects/project-form/team/team.component';
import { ProjectFormComponent } from 'app/modules/projects/project-form/project-form/project-form.component';
import { EntityReferenceNoNid } from 'app/Angular/pipes/EntityReferenceWithoutNid';
import { PendingChangesGuard } from 'app/modules/projects/project-form/pending-changes.guard';

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
