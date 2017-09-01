import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CKEditorModule } from 'ng2-ckeditor';
import { ImageCropperComponent, ImageCropperModule } from 'ng2-img-cropper';
// shared services
import { NotificationBarService } from 'ngx-notification-bar/release';
import { ShareButtonsModule } from 'ngx-sharebuttons';
import { AddProtocolDirective } from '../../angular/directives/add-protocol.directive';
// custom directives
import { ValidateOnFocusoutDirective } from '../../angular/directives/validate-focusout.directive';
// pipes
import { ReverseArray } from '../../angular/pipes/reverse-array';
/**
 * Providers
 */
// drupal 7 services
import { D7ServicesForRoot } from '../../core/d7services';
import { AuthGuardService } from '../auth0/auth-guard.service';
import { Auth } from '../auth0/auth.service';
import { AccessRestrictedComponent } from './access-restricted/access-restricted.component';
import { BookmarkComponent } from './bookmark/bookmark.component';
import { BtnFollowComponent } from './btn-follow/btn-follow.component';
import { BtnShareComponent } from './btn-share/btn-share.component';
import { CardBadges } from './card-badges/card-badges.component';
import { CommentComponent } from './comments/comment.component';
import { CommentFormComponent } from './comments/comments/comment-form.component';
import { CommentsComponent } from './comments/comments/comments.component';
import { CompanyCardComponent } from './company-card/company-card.component';

import { FeatureComponent } from './feature/feature.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { FileBrowserComponent } from './file-browser/file-browser.component';
import { Filters } from './filters/filters.component';
import { FollowUserComponent } from './follow-user/follow-user.component';
import { ForkComponent } from './fork/fork.component';
import { LearnCardComponent } from './learn-card/learn-card.component';
import { LearnUserCardComponent } from './learn-user-card/learn-user-card.component';
import { LikesComponent } from './likes/likes.component';
import { LoaderService } from './loader/loader.service';
import { MakerCardComponent } from './maker-card/maker-card.component';
import { MakerCkeditorComponent } from './maker-ckeditor/maker-ckeditor.component';
import { MakerPhoto } from './maker-photo/maker-photo.component';
import { MessageModalComponent } from './message-modal/message-modal.component';
import { MissionCardComponent } from './mission-card/mission-card.component';
import { NotificationPanelComponent } from './notification-panel/notification-panel.component';
import { NotificationTemplateComponent } from './notification-template/notification-template.component';
import { ProfilePictureService } from './profile-picture/profile-picture.service';
import { ProjectCardComponent } from './project-card/project-card.component';
import { ProjectVoteComponent } from './project-vote/project-vote.component';
import { RegistrationCollectComponent } from './registration-collect/registration-collect.component';

import { ChallengeSearchCardComponent } from './search-cards/challenge-search-card/challenge-search-card.component';
import { LearnSearchCardComponent } from './search-cards/learn-search-card/learn-search-card.component';
import { MakerSearchCardComponent } from './search-cards/maker-search-card/maker-search-card.component';
import { ProjectSearchCardComponent } from './search-cards/project-search-card/project-search-card.component';
import { ShowcaeSearchCardComponent } from './search-cards/showcase-search-card/showcase-search-card.component';
import { ShowcaseCardComponent } from './showcase-card/showcase-card.component';
import { ShowcaseGeneralCardComponent } from './showcase-general-card/showcase-general-card.component';
// import { Ng2FileDropModule,Ng2FileDropDirective } from 'ng2-file-drop';
import { SocialStatsComponent } from './social-stats/social-stats.component';
import { UserCardMsgsComponent } from './user-card-msgs/user-card-msgs.component';
import { UserCardSmallComponent } from './user-card-small/user-card-small.component';
import { UserCardComponent } from './user-card/user-card.component';
import { VideoViewerComponent } from './video-viewer/video-viewer.component';
import { ViewsComponent } from './views/views.component';
import { ReportComponent } from './report/report.component';
import { FollowOrgsComponent } from './follow-orgs/follow-orgs.component';


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
    ProjectVoteComponent,
    FileBrowserComponent,
    VideoViewerComponent,
    UserCardMsgsComponent,
    NotificationPanelComponent,
    NotificationTemplateComponent,

    FollowUserComponent,
    FeatureComponent,
    CompanyCardComponent,
    ReportComponent,
    // directives
    ValidateOnFocusoutDirective,
    AddProtocolDirective,
    RegistrationCollectComponent,
    MakerCkeditorComponent,
    AccessRestrictedComponent,
    // pipes
    ReverseArray,
    FollowOrgsComponent,

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
    ProjectVoteComponent,
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

    ReportComponent,
    FollowOrgsComponent,
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
