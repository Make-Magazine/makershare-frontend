import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from '../collection/project/project.component';
import { ShowcaseComponent } from '../collection/showcase/showcase.component';
import { MakerComponent } from '../collection/maker/maker.component';
import { ChallengeFollowComponent } from '../collection/challenge-follow/challenge-follow.component';
import { ChallengeEnterComponent } from '../collection/challenge-enter/challenge-enter.component';
import { CollectionRoutingModule } from './collection-routing.module'
import {CollectionComponent}from "./collection.component"
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    CollectionRoutingModule,
    FormsModule
  ],
  declarations: [
    ProjectComponent,
    ShowcaseComponent, 
    MakerComponent, 
    ChallengeFollowComponent, 
    ChallengeEnterComponent,
    CollectionComponent
    ],
      exports: [
   ProjectComponent,
    ShowcaseComponent, 
    MakerComponent, 
    ChallengeFollowComponent, 
    ChallengeEnterComponent,
    CollectionComponent
  ]
})
export class CollectionModule { }
export { ProjectComponent };
export { ShowcaseComponent };
export { MakerComponent };
export { ChallengeFollowComponent };
export { ChallengeEnterComponent };
export { CollectionComponent };

