import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateProjectComponent } from './create-project/create-project.component';
import { YourStoryComponent } from './your-story/your-story.component';
import { HowToComponent } from './how-to/how-to.component';
import { TeamComponent } from './team/team.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TagInputModule } from 'ng2-tag-input';
import { CKEditorModule } from 'ng2-ckeditor';
import { DndModule } from 'ng2-dnd';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import { Ng2CompleterModule } from "ng2-completer";
import { kpxAutocompleteModule } from 'angular2-kpx-autocomplete/kpx-autocomplete';
@NgModule({
  imports: [
    CommonModule,
    Ng2AutoCompleteModule,
    Ng2CompleterModule,
    kpxAutocompleteModule,
    ReactiveFormsModule,
    TagInputModule,
    CKEditorModule,
    FormsModule,
    DndModule.forRoot(),
  ],
  declarations: [CreateProjectComponent, YourStoryComponent, HowToComponent, TeamComponent],
  exports:[CreateProjectComponent]
})

export class CreateProjectModule { };
export {CreateProjectComponent};


