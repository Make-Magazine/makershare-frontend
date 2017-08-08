import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../shared/shared.module';
import { BlockedUsersComponent } from './blocked-users/blocked-users.component';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { InboxNotificationsComponent } from './inbox-notifications/inbox-notifications.component';
import { InboxComponent } from './inbox/inbox.component';
import { MessagesRoutsModule } from './messages.routing.module';
import { NotificationsListComponent } from './notifications/notifications-list.component';
import { SentComponent } from './sent/sent.component';
import { ViewComponent } from './view/view.component';

@NgModule({
  imports: [
    CommonModule,
    MessagesRoutsModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    SharedModule.forChild(),
  ],
  declarations: [
    InboxComponent,
    ViewComponent,
    BlockedUsersComponent,
    DeleteModalComponent,
    InboxNotificationsComponent,
    NotificationsListComponent,
    SentComponent,
  ],
  exports: [
    InboxComponent,
    ViewComponent,
    BlockedUsersComponent,
    InboxNotificationsComponent,
    NotificationsListComponent,
    SentComponent,
  ],
})
export class MessagesModule {}
export { ViewComponent };
export { InboxComponent };
export { BlockedUsersComponent };
export { InboxNotificationsComponent };
export { NotificationsListComponent };
export { SentComponent };
