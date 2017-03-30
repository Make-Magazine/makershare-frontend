import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InboxComponent } from './inbox/inbox.component';
import { ViewComponent } from './view/view.component';
import { BlockedUsersComponent } from './blocked-users/blocked-users.component';




const MessagesRouts: Routes = [
  { path: 'inbox',  component:  InboxComponent},
   { path: 'view/:thread_id', component:  ViewComponent},
   { path: 'blocked', component:  BlockedUsersComponent}
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
