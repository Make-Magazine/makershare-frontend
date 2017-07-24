import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectDetailsRoutingModule } from './project-details-routing.module'
import { ReactiveFormsModule } from '@angular/forms';
import { ProjectDetailsComponent } from './project-details.component';
import { SharedModule } from '../../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProjectHeaderComponent } from './project-header/project-header.component';
import { ProjectStoryComponent } from './project-story/project-story.component';
import { ProjectHowToComponent } from './project-how-to/project-how-to.component';
//import { MetaModule } from '@nglibs/meta';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProjectDetailsRoutingModule,
    SharedModule.forChild(),
    NgbModule,
    //MetaModule.forRoot()
  ],
  declarations: [
    ProjectDetailsComponent,
    ProjectHeaderComponent,
    ProjectStoryComponent,
    ProjectHowToComponent
  ]
})
export class ProjectDetailsModule { }
