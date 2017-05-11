import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowcasesCollectionComponent } from './showcase-collection/showcasesCollection.component';
import { SinglShowcaseComponent } from './single-showcase/SingleShowcase.component';
import { ShowcaseSortingComponent } from './showcaseSorting.component';
import { ShowcaseRoutingModule } from './showcase-routing.module'
import { SharedModule } from '../shared/shared.module';
import { ShowcaseProjectModule } from './showcase-project/showcase-project.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ShowcaseProjectComponent } from './showcase-project/showcase-project.component';
// import { ProjectHeaderComponent } from '../shared/project-header/project-header.component'
// import { ProjectStoryComponent } from '../shared/project-story/project-story.component'
// import { ProjectHowToComponent } from '../shared/project-how-to/project-how-to.component'
// import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  imports: [
    CommonModule,
    ShowcaseRoutingModule,
    SharedModule.forChild(),
    NgbModule,
    ShowcaseProjectModule,

  ],
  declarations: [
    ShowcasesCollectionComponent,
    SinglShowcaseComponent,
    ShowcaseSortingComponent,
    
  ],
      // providers: [NgbCarouselConfig] // add NgbCarouselConfig to the component providers
    //   providers:[ProjectHeaderComponent,
    // ProjectStoryComponent,
    // ProjectStoryComponent,]
})

export class ShowcaseModule { }
export  {ShowcasesCollectionComponent};
export  {SinglShowcaseComponent};
export  {ShowcaseSortingComponent};
