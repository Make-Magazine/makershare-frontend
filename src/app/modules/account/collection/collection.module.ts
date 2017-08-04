import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChallengeEnterComponent } from 'app/modules/account/collection/challenge-enter/challenge-enter.component';
import { ChallengeFollowComponent } from 'app/modules/account/collection/challenge-follow/challenge-follow.component';
import { CollectionRoutingModule } from 'app/modules/account/collection/collection-routing.module';
import { CollectionComponent } from 'app/modules/account/collection/collection.component';
import { MakerComponent } from 'app/modules/account/collection/maker/maker.component';
import { ProjectComponent } from 'app/modules/account/collection/project/project.component';
import { ShowcaseComponent } from 'app/modules/account/collection/showcase/showcase.component';

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
