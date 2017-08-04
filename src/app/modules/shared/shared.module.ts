import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddProtocolDirective } from 'app/Angular/directives/add-protocol.directive';
import { ValidateOnFocusoutDirective } from 'app/Angular/directives/validate-focusout.directive';
import { ReverseArray } from 'app/Angular/pipes/reverse-array';
import { D7ServicesForRoot } from 'app/CORE/d7services';
import { AuthGuardService } from 'app/modules/auth0/auth-guard.service';
import { Auth } from 'app/modules/auth0/auth.service';
/**
 * Providers
 */
import { AccessRestrictedComponent } from 'app/modules/shared/access-restricted/access-restricted.component';
import { BookmarkComponent } from 'app/modules/shared/bookmark/bookmark.component';
import { BtnFollowComponent } from 'app/modules/shared/btn-follow/btn-follow.component';
import { BtnShareComponent } from 'app/modules/shared/btn-share/btn-share.component';
import { CardBadges } from 'app/modules/shared/card-badges/card-badges.component';
import { CommentComponent } from 'app/modules/shared/comments/comment.component';
import { CommentFormComponent } from 'app/modules/shared/comments/comments/comment-form.component';
import { CommentsComponent } from 'app/modules/shared/comments/comments/comments.component';
import { CompanyCardComponent } from 'app/modules/shared/company-card/company-card.component';
import { FeatureComponent } from 'app/modules/shared/feature/feature.component';
import { FeedbackComponent } from 'app/modules/shared/feedback/feedback.component';
import { FileBrowserComponent } from 'app/modules/shared/file-browser/file-browser.component';
import { Filters } from 'app/modules/shared/filters/filters.component';
import { FollowUserComponent } from 'app/modules/shared/follow-user/follow-user.component';
import { ForkComponent } from 'app/modules/shared/fork/fork.component';
import { LearnCardComponent } from 'app/modules/shared/learn-card/learn-card.component';
import { LearnUserCardComponent } from 'app/modules/shared/learn-user-card/learn-user-card.component';
import { LikesComponent } from 'app/modules/shared/likes/likes.component';
import { LoaderService } from 'app/modules/shared/loader/loader.service';
import { MakerCardComponent } from 'app/modules/shared/maker-card/maker-card.component';
import { MakerCkeditorComponent } from 'app/modules/shared/maker-ckeditor/maker-ckeditor.component';
import { MakerPhoto } from 'app/modules/shared/maker-photo/maker-photo.component';
import { MessageModalComponent } from 'app/modules/shared/message-modal/message-modal.component';
import { MissionCardComponent } from 'app/modules/shared/mission-card/mission-card.component';
import { NotificationPanelComponent } from 'app/modules/shared/notification-panel/notification-panel.component';
import { NotificationTemplateComponent } from 'app/modules/shared/notification-template/notification-template.component';
import { ProfilePictureService } from 'app/modules/shared/profile-picture/profile-picture.service';
import { ProjectCardComponent } from 'app/modules/shared/project-card/project-card.component';
import { ProjectVoteComponent } from 'app/modules/shared/project-vote/project-vote.component';
import { RegistrationCollectComponent } from 'app/modules/shared/registration-collect/registration-collect.component';
import { ReportCommentComponent } from 'app/modules/shared/report-comment/report-comment.component';

import { ReportOrgsComponent } from 'app/modules/shared/report-orgs/report-orgs.component';
import { ReportProjectComponent } from 'app/modules/shared/report-project/report-project.component';
import { ReportUserComponent } from 'app/modules/shared/report-user/report-user.component';
import { ChallengeSearchCardComponent } from 'app/modules/shared/search-cards/challenge-search-card/challenge-search-card.component';
import { LearnSearchCardComponent } from 'app/modules/shared/search-cards/learn-search-card/learn-search-card.component';
import { MakerSearchCardComponent } from 'app/modules/shared/search-cards/maker-search-card/maker-search-card.component';
import { ProjectSearchCardComponent } from 'app/modules/shared/search-cards/project-search-card/project-search-card.component';
import { ShowcaeSearchCardComponent } from 'app/modules/shared/search-cards/showcase-search-card/showcase-search-card.component';
import { ShowcaseCardComponent } from 'app/modules/shared/showcase-card/showcase-card.component';
import { ShowcaseGeneralCardComponent } from 'app/modules/shared/showcase-general-card/showcase-general-card.component';
import { SocialStatsComponent } from 'app/modules/shared/social-stats/social-stats.component';
import { UserCardMsgsComponent } from 'app/modules/shared/user-card-msgs/user-card-msgs.component';
import { UserCardSmallComponent } from 'app/modules/shared/user-card-small/user-card-small.component';
import { UserCardComponent } from 'app/modules/shared/user-card/user-card.component';
import { VideoViewerComponent } from 'app/modules/shared/video-viewer/video-viewer.component';
import { ViewsComponent } from 'app/modules/shared/views/views.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { ImageCropperComponent, ImageCropperModule } from 'ng2-img-cropper';
// shared services
import { NotificationBarService } from 'ngx-notification-bar/release';
import { ShareButtonsModule } from 'ngx-sharebuttons';

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
    BtnFollowComponent,
    BtnShareComponent,
    BookmarkComponent,
    CommentComponent,
    CommentsComponent,
    CommentFormComponent,
    LikesComponent,
    ForkComponent,
    ViewsComponent,
    UserCardComponent,
    ProjectCardComponent,
    FeedbackComponent,
    MissionCardComponent,
    ShowcaseCardComponent,
    LearnCardComponent,
    UserCardSmallComponent,
    LearnUserCardComponent,
    ShowcaseGeneralCardComponent,
    MakerCardComponent,
    CardBadges,
    Filters,
    MakerPhoto,
    SocialStatsComponent,
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

    FollowUserComponent,
    FeatureComponent,
    CompanyCardComponent,
    ReportOrgsComponent,
    // directives
    ValidateOnFocusoutDirective,
    AddProtocolDirective,
    RegistrationCollectComponent,
    MakerCkeditorComponent,
    AccessRestrictedComponent,
    // pipes
    ReverseArray,
  ],
  exports: [
    CommentComponent,
    BtnFollowComponent,
    BtnShareComponent,
    FollowUserComponent,
    BookmarkComponent,
    LikesComponent,
    ForkComponent,
    ViewsComponent,
    UserCardComponent,
    ProjectCardComponent,
    FeedbackComponent,
    MissionCardComponent,
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
    SocialStatsComponent,
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
    AddProtocolDirective,
    ValidateOnFocusoutDirective,
    RegistrationCollectComponent,
    MakerCkeditorComponent,
    ImageCropperComponent,
    // Ng2FileDropDirective,
    ReverseArray,
    FeatureComponent,
    ReportOrgsComponent,
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
      ],
    };
  }
  static forChild(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
    };
  }
}
