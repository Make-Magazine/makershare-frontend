import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommentComponent } from './comments/comment.component';
import { CommentsComponent } from './comments/comments/comments.component';
import { CommentFormComponent } from './comments/comments/comment-form.component';
import { FollowComponent } from './follow/follow.component';
import { BookmarkComponent } from './bookmark/bookmark.component';
import { LikeComponent } from './like/like.component';
import { ForkComponent } from './fork/fork.component';
import { UserCardComponent } from './user-card/user-card.component';
import { ProjectCardComponent } from './project-card/project-card.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ShareButtonsModule } from "ng2-sharebuttons";
import { SharedButtonsComponent } from './shared-buttons/shared-buttons.component';
import { FeedbackComponent } from './feedback/feedback.component';
//import { Ng2DeviceDetector} from 'ng2-device-detector';
import { ChallengeCardComponent } from './challenge-card/challenge-card.component';
import { ProjectHeaderComponent } from './project-header/project-header.component';
import { ProjectStoryComponent } from './project-story/project-story.component';
import { ProjectHowToComponent } from './project-how-to/project-how-to.component';
import { ShowcaseCardComponent } from './showcase-card/showcase-card.component';
import { LearnCardComponent } from './learn-card/learn-card.component';
import { UserCardSmallComponent } from './user-card-small/user-card-small.component';
import { LearnUserCardComponent } from './learn-user-card/learn-user-card.component';
import { ShowcaseGeneralCardComponent } from './showcase-general-card/showcase-general-card.component';
import { MakerCardComponent } from './maker-card/maker-card.component';
import { VideoDisplayComponent } from './video-display/video-display.component';
import { MakerSearchCardComponent } from './search-cards/maker-search-card/maker-search-card.component';
import { ProjectSearchCardComponent } from './search-cards/project-search-card/project-search-card.component';
import { ChallengeSearchCardComponent } from './search-cards/challenge-search-card/challenge-search-card.component';
import { ShowcaeSearchCardComponent } from './search-cards/showcase-search-card/showcase-search-card.component';
import { LearnSearchCardComponent } from './search-cards/learn-search-card/learn-search-card.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    ShareButtonsModule.forRoot(),
//Ng2DeviceDetector,
  ],
  declarations: [
    CommentComponent,
    CommentsComponent,
    CommentFormComponent,
    FollowComponent,
    BookmarkComponent,
    LikeComponent,
    ForkComponent,
    UserCardComponent,
    ProjectCardComponent,
    SharedButtonsComponent,
    FeedbackComponent,
    ChallengeCardComponent,
    ProjectHeaderComponent,
    ProjectStoryComponent,
    ProjectHowToComponent,
    ShowcaseCardComponent,
    LearnCardComponent,
    UserCardSmallComponent,
    LearnUserCardComponent,
    ShowcaseGeneralCardComponent,
    MakerCardComponent,
    VideoDisplayComponent,
    MakerSearchCardComponent,
    ProjectSearchCardComponent,
    ChallengeSearchCardComponent,
    ShowcaeSearchCardComponent,
    LearnSearchCardComponent,
  ],
  exports: [
    CommentComponent,
    FollowComponent,
    BookmarkComponent,
    LikeComponent,
    ForkComponent,
    UserCardComponent,
    ProjectCardComponent,
    SharedButtonsComponent,
    FeedbackComponent,
    ChallengeCardComponent,
    ProjectHeaderComponent,
    ProjectStoryComponent,
    ProjectHowToComponent,
    ShowcaseCardComponent,
    LearnCardComponent,
    UserCardSmallComponent,
    LearnUserCardComponent,
    ShowcaseGeneralCardComponent,
    VideoDisplayComponent,

    MakerCardComponent,
    MakerSearchCardComponent,
    ProjectSearchCardComponent,
    ChallengeSearchCardComponent,
    ShowcaeSearchCardComponent,
    LearnSearchCardComponent,
  ]
  
})
export class SharedModule { }
export {CommentComponent};
export {FollowComponent};
export {BookmarkComponent};
export {LikeComponent};
export {ForkComponent};
export {UserCardComponent};
export {ProjectCardComponent};
export {SharedButtonsComponent};
export {FeedbackComponent};
export { ChallengeCardComponent };
export { ProjectHeaderComponent };
export { ProjectStoryComponent };
export { ProjectHowToComponent };
export { ShowcaseCardComponent };
export { LearnCardComponent }; 
export { UserCardSmallComponent };

export { LearnUserCardComponent };

export { ShowcaseGeneralCardComponent };
export { VideoDisplayComponent };
export { MakerCardComponent };
export { MakerSearchCardComponent };
export { ProjectSearchCardComponent };
export { ChallengeSearchCardComponent };
export { ShowcaeSearchCardComponent };
export { LearnSearchCardComponent };
