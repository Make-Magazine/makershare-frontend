import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InboxComponent } from './inbox/inbox.component';
import { ViewComponent } from './view/view.component';
import { BlockedUsersComponent } from './blocked-users/blocked-users.component';
import { AuthGuardService } from '../../auth0/auth-guard.service';
import { InboxNotificationsComponent } from './inbox-notifications/inbox-notifications.component';
import { SentComponent } from './sent/sent.component';

const MessagesRouts: Routes = [

      { path: 'inbox-notifications', component: InboxNotificationsComponent,  canActivate: [AuthGuardService]},
      { path: 'inbox', component: InboxComponent,  canActivate: [AuthGuardService]},
      { path: 'view/:thread_id', component: ViewComponent,  canActivate: [AuthGuardService]},
      { path: 'blocked', component: BlockedUsersComponent,  canActivate: [AuthGuardService]},
      { path: 'sent', component: SentComponent,  canActivate: [AuthGuardService]},
      
];

@NgModule({
  imports: [
    RouterModule.forChild(MessagesRouts),
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})

export class MessagesRoutsModule { }
