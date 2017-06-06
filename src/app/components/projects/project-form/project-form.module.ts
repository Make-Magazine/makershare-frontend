import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectFormComponent } from './project-form/project-form.component';
import { RouterModule, Routes } from '@angular/router';
import { ProjectFormRoutingModule } from './project-form-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { YourStoryComponent } from './your-story/your-story.component';
import { HowToComponent } from './how-to/how-to.component';
import { TeamComponent } from './team/team.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../shared/shared.module';
import { PendingChangesGuard } from './pending-changes.guard';
import { EntityReferenceNoNid } from '../../../pipes/EntityReferenceWithoutNid';
import { CustomFormsModule } from 'ng2-validation';

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
  providers:[PendingChangesGuard]
})

export class ProjectFormModule { };


