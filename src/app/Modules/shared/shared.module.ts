import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommentComponent } from './comments/comment.component';
import { CommentsComponent } from './comments/comments/comments.component';
import { CommentFormComponent } from './comments/comments/comment-form.component';
import { FollowComponent } from './follow/follow.component';
import { BookmarkComponent } from './bookmark/bookmark.component';
import { LikesComponent } from './likes/likes.component';
import { ViewsComponent } from './views/views.component';
import { ForkComponent } from './fork/fork.component';
import { UserCardComponent } from './user-card/user-card.component';
import { ProjectCardComponent } from './project-card/project-card.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FeedbackComponent } from './feedback/feedback.component';
import { ShareButtonsModule } from "ngx-sharebuttons";
import { ChallengeCardComponent } from './challenge-card/challenge-card.component';
import { ShowcaseCardComponent } from './showcase-card/showcase-card.component';
import { LearnCardComponent } from './learn-card/learn-card.component';
import { UserCardSmallComponent } from './user-card-small/user-card-small.component';
import { LearnUserCardComponent } from './learn-user-card/learn-user-card.component';
import { ShowcaseGeneralCardComponent } from './showcase-general-card/showcase-general-card.component';
import { MakerCardComponent } from './maker-card/maker-card.component';
import { CardBadges } from './card-badges/card-badges.component';
import { Filters } from './filters/filters.component';
import { MakerPhoto } from './maker-photo/maker-photo.component';
import { MakerSearchCardComponent } from './search-cards/maker-search-card/maker-search-card.component';
import { MessageModalComponent } from './message-modal/message-modal.component';
import { ProjectSearchCardComponent } from './search-cards/project-search-card/project-search-card.component';
import { ChallengeSearchCardComponent } from './search-cards/challenge-search-card/challenge-search-card.component';
import { ShowcaeSearchCardComponent } from './search-cards/showcase-search-card/showcase-search-card.component';
import { LearnSearchCardComponent } from './search-cards/learn-search-card/learn-search-card.component';
import { ReportUserComponent } from './report-user/report-user.component';
import { ReportProjectComponent } from './report-project/report-project.component';
import { ProjectVoteComponent } from './project-vote/project-vote.component';
import { FileBrowserComponent } from './file-browser/file-browser.component'
import { ReportCommentComponent } from './report-comment/report-comment.component';
import { VideoViewerComponent } from './video-viewer/video-viewer.component';
import { NotificationTemplateComponent } from './notification-template/notification-template.component';
import { SharedButtonsComponent } from './shared-buttons/shared-buttons.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { ImageCropperModule, ImageCropperComponent } from 'ng2-img-cropper';
// import { Ng2FileDropModule,Ng2FileDropDirective } from 'ng2-file-drop';
import { SocialStats } from './social-stats/social-stats.component';


// custom directives
import { ValidateOnFocusoutDirective } from '../../Angular/directives/validate-focusout.directive';
import { UserCardMsgsComponent } from './user-card-msgs/user-card-msgs.component';
import { NotificationPanelComponent } from './notification-panel/notification-panel.component';
import { AddProtocolDirective } from '../../Angular/directives/add-protocol.directive';
import { RegistrationCollectComponent } from './registration-collect/registration-collect.component';

// pipes
import { ReverseArray } from '../../Angular/pipes/reverse-array';

/**
 * Providers
 */
// drupal 7 services
import { D7ServicesForRoot } from '../../CORE/d7services';
// shared services
import { NotificationBarService } from 'ngx-notification-bar/release';
import { AuthGuardService } from '../auth0/auth-guard.service';
import { Auth } from '../auth0/auth.service';
import { LoaderService } from './loader/loader.service';
import { ProfilePictureService } from './profile-picture/profile-picture.service';
import { MakerCkeditorComponent } from './maker-ckeditor/maker-ckeditor.component';
import { AccessRestrictedComponent } from './access-restricted/access-restricted.component';
import { FollowUserComponent } from './follow-user/follow-user.component';

import { FeatureComponent } from './feature/feature.component';
import { CompanyCardComponent } from './company-card/company-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule,
    ShareButtonsModule,
    CKEditorModule,
    ImageCropperModule,
    // Ng2FileDropModule
  ],
  declarations: [
    CommentComponent,
    CommentsComponent,
    CommentFormComponent,
    FollowComponent,
    BookmarkComponent,
    LikesComponent,
    ForkComponent,
    ViewsComponent,
    UserCardComponent,
    ProjectCardComponent,
    FeedbackComponent,
    ChallengeCardComponent,
    ShowcaseCardComponent,
    LearnCardComponent,
    UserCardSmallComponent,
    LearnUserCardComponent,
    ShowcaseGeneralCardComponent,
    MakerCardComponent,
    CardBadges,
    Filters,
    MakerPhoto,
    SocialStats,
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
    FollowUserComponent,
    // directives
    ValidateOnFocusoutDirective,
    AddProtocolDirective,
    RegistrationCollectComponent,
    MakerCkeditorComponent,
    AccessRestrictedComponent,
    // pipes
    ReverseArray,
    FeatureComponent,
    CompanyCardComponent,
  ],
  exports: [
    CommentComponent,
    FollowComponent,
    FollowUserComponent,
    BookmarkComponent,
    LikesComponent,
    ForkComponent,
    ViewsComponent,
    UserCardComponent,
    ProjectCardComponent,
    FeedbackComponent,
    ChallengeCardComponent,
    ShowcaseCardComponent,
    LearnCardComponent,
    UserCardSmallComponent,
    LearnUserCardComponent,
    ShowcaseGeneralCardComponent,
    MessageModalComponent,
    MakerCardComponent,
    CompanyCardComponent,
    CardBadges,
    Filters,
    MakerSearchCardComponent,
    ProjectSearchCardComponent,
    SocialStats,
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
    RegistrationCollectComponent,
    MakerCkeditorComponent,
    ImageCropperComponent,
    // Ng2FileDropDirective,
    ReverseArray,
    FeatureComponent
  ],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        D7ServicesForRoot,
        NotificationBarService,
        AuthGuardService,
        Auth,
        ProfilePictureService,
        LoaderService,
      ]
    };
  }
  static forChild(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
    };
  }
}
