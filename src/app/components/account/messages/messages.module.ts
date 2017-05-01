import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InboxComponent } from './inbox/inbox.component';
import { MessagesRoutsModule } from './messages.routing.module';
import { ViewComponent } from './view/view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BlockedUsersComponent } from './blocked-users/blocked-users.component';
import { SharedModule } from '../../shared/shared.module';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { InboxNotificationsComponent } from './inbox-notifications/inbox-notifications.component';
import { NotificationsListComponent } from './notifications/notifications-list.component';
import { SentComponent } from './sent/sent.component';

 
@NgModule({
  imports: [
    CommonModule,
    MessagesRoutsModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    SharedModule,

  ],
  declarations: [
    InboxComponent,
    ViewComponent,
    BlockedUsersComponent,
    DeleteModalComponent,
    InboxNotificationsComponent,
    NotificationsListComponent,
    SentComponent
  ],
  exports: [
    InboxComponent,
    ViewComponent,
    BlockedUsersComponent,
    InboxNotificationsComponent,
    NotificationsListComponent,
    SentComponent
  ]
})
export class MessagesModule { };
export { ViewComponent };
export { InboxComponent };
export { BlockedUsersComponent };
export { InboxNotificationsComponent };
export { NotificationsListComponent };
export { SentComponent };


