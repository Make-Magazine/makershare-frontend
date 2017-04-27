import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InboxComponent } from './inbox/inbox.component';
import { ViewComponent } from './view/view.component';
import { BlockedUsersComponent } from './blocked-users/blocked-users.component';
import { AuthGuardService } from '../../../auth0/auth-guard.service';
import { AccessDeniedComponent } from '../../../auth0/access-denied/access-denied.component';
import { Four04Component } from '../../../auth0/four04/four04.component';
import { InboxNotificationsComponent } from './inbox-notifications/inbox-notifications.component';



const MessagesRouts: Routes = [
  { path : 'inbox-notifications',component: InboxNotificationsComponent,  canActivate: [AuthGuardService]},
  // { path: 'inbox',  component:  InboxComponent,  canActivate: [AuthGuardService]},
  { path: 'view/:thread_id', component:  ViewComponent,  canActivate: [AuthGuardService]},
  { path: 'blocked', component:  BlockedUsersComponent,  canActivate: [AuthGuardService]}
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
