import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlockedUsersComponent } from 'app/modules/account/messages/blocked-users/blocked-users.component';
import { InboxNotificationsComponent } from 'app/modules/account/messages/inbox-notifications/inbox-notifications.component';
import { InboxComponent } from 'app/modules/account/messages/inbox/inbox.component';
import { SentComponent } from 'app/modules/account/messages/sent/sent.component';
import { ViewComponent } from 'app/modules/account/messages/view/view.component';
import { AuthGuardService } from 'app/modules/auth0/auth-guard.service';

const MessagesRouts: Routes = [
  {
    path: 'inbox-notifications',
    component: InboxNotificationsComponent,
    canActivate: [AuthGuardService],
  },
  { path: 'inbox', component: InboxComponent, canActivate: [AuthGuardService] },
  {
    path: 'view/:thread_id',
    component: ViewComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'blocked',
    component: BlockedUsersComponent,
    canActivate: [AuthGuardService],
  },
  { path: 'sent', component: SentComponent, canActivate: [AuthGuardService] },
];

@NgModule({
  imports: [RouterModule.forChild(MessagesRouts)],
  exports: [RouterModule],
  declarations: [],
})
export class MessagesRoutsModule {}
