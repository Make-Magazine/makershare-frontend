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
import { NotificationsComponent } from './notifications/notifications.component';
import { InboxNotificationsComponent } from './inbox-notifications/inbox-notifications.component';
import { SingleNotificationComponent } from './notifications/single-notification/single-notification.component';


 
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
    NotificationsComponent,
    InboxNotificationsComponent,
    SingleNotificationComponent,

    ]
})
export class MessagesModule { }
export  {
  InboxComponent,
  InboxNotificationsComponent,
};
