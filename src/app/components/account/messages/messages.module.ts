import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InboxComponent } from './inbox/inbox.component';
import { MessagesRoutsModule } from './messages.routing.module';
import { ViewComponent } from './view/view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BlockedUsersComponent } from './blocked-users/blocked-users.component';


 
@NgModule({
  imports: [
    CommonModule,
    MessagesRoutsModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,

  ],
  declarations: [
    InboxComponent,
    ViewComponent,
    BlockedUsersComponent,

    ]
})
export class MessagesModule { }
export  {
  InboxComponent,
};
