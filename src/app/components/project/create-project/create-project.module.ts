import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateProjectComponent } from './create-project/create-project.component';
import { YourStoryComponent } from './your-story/your-story.component';
import { HowToComponent } from './how-to/how-to.component';
import { TeamComponent } from './team/team.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TagInputModule } from 'ng2-tag-input';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TagInputModule,
  ],
  declarations: [CreateProjectComponent, YourStoryComponent, HowToComponent, TeamComponent]
})
export class CreateProjectModule { }
