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
import { MessageModalComponent } from './message-modal/message-modal.component';
import { ProjectSearchCardComponent } from './search-cards/project-search-card/project-search-card.component';
import { ChallengeSearchCardComponent } from './search-cards/challenge-search-card/challenge-search-card.component';
import { ShowcaeSearchCardComponent } from './search-cards/showcase-search-card/showcase-search-card.component';
import { LearnSearchCardComponent } from './search-cards/learn-search-card/learn-search-card.component';
import { ReportUserComponent } from './report-user/report-user.component';
import { ResponsiveModule, ResponsiveConfig } from 'ng2-responsive';
import { ReportProjectComponent } from './report-project/report-project.component';
import { ProjectVoteComponent } from './project-vote/project-vote.component';
import { FileManagerComponent } from './file-manager/file-manager.component';
import { FileCardComponent } from './file-manager/file-card/file-card.component';
// custom directives
import { ValidateOnFocusoutDirective } from '../../directives/validate-focusout.directive';
import { ReportCommentComponent } from './report-comment/report-comment.component';

 
 let config = {
    breakPoints: {
        xs: {max: 575},
        sm: {min: 576, max: 767},
        md: {min: 768, max: 991},
        lg: {min: 992, max: 1199},
        xl: {min: 1200}
    },
    debounceTime: 100 // allow to debounce checking timer
  };



  export function ResponsiveDefinition(){ 
          return new ResponsiveConfig(config);
  };


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    ShareButtonsModule.forRoot(),

   ResponsiveModule,

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
    MessageModalComponent,
    ProjectSearchCardComponent,
    ChallengeSearchCardComponent,
    ShowcaeSearchCardComponent,
    LearnSearchCardComponent,
    ReportUserComponent,
    ReportProjectComponent,
    ProjectVoteComponent,
    FileManagerComponent,
    FileCardComponent,
    // directives
    ValidateOnFocusoutDirective,
    ReportCommentComponent,
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
    MessageModalComponent,
    MakerCardComponent,
    MakerSearchCardComponent,
    ProjectSearchCardComponent,
    ChallengeSearchCardComponent,
    ShowcaeSearchCardComponent,
    LearnSearchCardComponent,
    ReportUserComponent,
    ReportProjectComponent,
    ProjectVoteComponent,
    FileManagerComponent,
    FileCardComponent
  ],
  providers:[{
     provide: ResponsiveConfig, 
     useFactory: ResponsiveDefinition }]

  
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
export  { MessageModalComponent };
export { ShowcaseGeneralCardComponent };
export { VideoDisplayComponent };
export { MakerCardComponent };
export { MakerSearchCardComponent };
export { ProjectSearchCardComponent };
export { ChallengeSearchCardComponent };
export { ShowcaeSearchCardComponent };
export { LearnSearchCardComponent };
export { ReportUserComponent };
export { ReportProjectComponent };
export { ProjectVoteComponent };
