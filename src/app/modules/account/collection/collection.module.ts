import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChallengeEnterComponent } from '../collection/challenge-enter/challenge-enter.component';
import { ChallengeFollowComponent } from '../collection/challenge-follow/challenge-follow.component';
import { MakerComponent } from '../collection/maker/maker.component';
import { ProjectComponent } from '../collection/project/project.component';
import { ShowcaseComponent } from '../collection/showcase/showcase.component';
import { CollectionRoutingModule } from './collection-routing.module';
import { CollectionComponent } from './collection.component';

@NgModule({
  imports: [CommonModule, CollectionRoutingModule, FormsModule],
  declarations: [
    ProjectComponent,
    ShowcaseComponent,
    MakerComponent,
    ChallengeFollowComponent,
    ChallengeEnterComponent,
    CollectionComponent,
  ],
  exports: [
    ProjectComponent,
    ShowcaseComponent,
    MakerComponent,
    ChallengeFollowComponent,
    ChallengeEnterComponent,
    CollectionComponent,
  ],
})
export class CollectionModule {}
