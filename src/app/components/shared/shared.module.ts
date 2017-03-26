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
import { ImageCropperComponent } from 'ng2-img-cropper';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
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
    ImageCropperComponent
  ],
  exports: [
    CommentComponent,
    FollowComponent,
    BookmarkComponent,
    LikeComponent,
    ForkComponent,
    UserCardComponent,
    ProjectCardComponent,
    ImageCropperComponent
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
export {ImageCropperComponent};
