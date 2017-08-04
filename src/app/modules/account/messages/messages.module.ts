import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BlockedUsersComponent } from 'app/modules/account/messages/blocked-users/blocked-users.component';
import { DeleteModalComponent } from 'app/modules/account/messages/delete-modal/delete-modal.component';
import { InboxNotificationsComponent } from 'app/modules/account/messages/inbox-notifications/inbox-notifications.component';
import { InboxComponent } from 'app/modules/account/messages/inbox/inbox.component';
import { MessagesRoutsModule } from 'app/modules/account/messages/messages.routing.module';
import { NotificationsListComponent } from 'app/modules/account/messages/notifications/notifications-list.component';
import { SentComponent } from 'app/modules/account/messages/sent/sent.component';
import { ViewComponent } from 'app/modules/account/messages/view/view.component';
import { SharedModule } from 'app/modules/shared/shared.module';

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
