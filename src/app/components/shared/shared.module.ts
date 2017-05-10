import { NgModule,ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
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
import { FeedbackComponent } from './feedback/feedback.component';
import { ShareButtonsModule } from "ng2-sharebuttons";
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
import { FileBrowserComponent } from './file-browser/file-browser.component'
import { ReportCommentComponent } from './report-comment/report-comment.component';
import { VideoViewerComponent } from './video-viewer/video-viewer.component';
import { MessagesModule } from '../account/messages/messages.module';
import { NotificationTemplateComponent } from './notification-template/notification-template.component';
import { SharedButtonsComponent } from './shared-buttons/shared-buttons.component';

// custom directives
import { ValidateOnFocusoutDirective } from '../../directives/validate-focusout.directive';
import { UserCardMsgsComponent } from './user-card-msgs/user-card-msgs.component';
import { NotificationPanelComponent } from './notification-panel/notification-panel.component';
import { AddProtocolDirective } from '../../directives/add-protocol.directive';
import { RegistrationCollectComponent } from './registration-collect/registration-collect.component';

//providers
import { NodeService } from '../../d7services/node/node.service';
import { MainService } from '../../d7services/main/main.service';
import { UserService } from '../../d7services/user/user.service';
import { ViewService } from '../../d7services/view/view.service';
import { FlagService } from '../../d7services/flag/flag.service';
import { ProfileService } from '../../d7services/profile/profile.service';
import { PmService } from '../../d7services/pm/pm.service';
import { FileService } from '../../d7services/file/file.service';
import { TaxonomyService } from '../../d7services/taxonomy/taxonomy.service';
import { NotificationBarService } from 'angular2-notification-bar/release';
import { AuthGuardService } from '../../auth0/auth-guard.service';
import { CookieService } from 'angular2-cookie/services/cookies.service';

let config = {
  breakPoints: {
    xs: { max: 575 },
    sm: { min: 576, max: 767 },
    md: { min: 768, max: 991 },
    lg: { min: 992, max: 1199 },
    xl: { min: 1200 }
  },
  debounceTime: 100 // allow to debounce checking timer
};



export function ResponsiveDefinition() {
  return new ResponsiveConfig(config);
};


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule,
    ResponsiveModule,
    ShareButtonsModule
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
    MakerSearchCardComponent,
    MessageModalComponent,
    ProjectSearchCardComponent,
    ChallengeSearchCardComponent,
    ShowcaeSearchCardComponent,
    LearnSearchCardComponent,
    ReportUserComponent,
    ReportProjectComponent,
    ProjectVoteComponent,
    FileBrowserComponent,
    ReportCommentComponent,
    VideoViewerComponent,
    UserCardMsgsComponent,
    NotificationPanelComponent,
    NotificationTemplateComponent,
    SharedButtonsComponent,
    // directives
    ValidateOnFocusoutDirective,
    AddProtocolDirective,
    RegistrationCollectComponent,
  ],
  exports: [
    CommentComponent,
    FollowComponent,
    BookmarkComponent,
    LikeComponent,
    ForkComponent,
    UserCardComponent,
    ProjectCardComponent,
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
    ReportCommentComponent,
    FileBrowserComponent,
    VideoViewerComponent,
    UserCardMsgsComponent,
    NotificationPanelComponent,
    NotificationTemplateComponent,
    SharedButtonsComponent,
    AddProtocolDirective,
    ValidateOnFocusoutDirective,
    RegistrationCollectComponent
  ],
  providers: []
})
<<<<<<< HEAD
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        TaxonomyService,
        FileService,
        MainService,
        UserService,
        NodeService,
        ViewService,
        FlagService,
        ProfileService,
        PmService,
        NotificationBarService,
        AuthGuardService,
        {provide: ResponsiveConfig,useFactory: ResponsiveDefinition},
        CookieService,
      ]
    };
  }
  static forChild(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
    };
  }
}
=======
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
export { MakerCardComponent };
export { MakerSearchCardComponent };
export { ProjectSearchCardComponent };
export { ChallengeSearchCardComponent };
export { ShowcaeSearchCardComponent };
export { LearnSearchCardComponent };
export { ReportUserComponent };
export { ReportProjectComponent };
export { ProjectVoteComponent };
export { ReportCommentComponent };
export { UserCardMsgsComponent };
export { NotificationPanelComponent };
export { RegistrationCollectComponent };

>>>>>>> 40e75fdfb382398c155c62451bf416344941e9fa

