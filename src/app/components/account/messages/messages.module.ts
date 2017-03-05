import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InboxComponent } from './inbox/inbox.component';
import { MessagesRoutsModule } from './messages.routing.module';

 
@NgModule({
  imports: [
    CommonModule,
    MessagesRoutsModule
  ],
  declarations: [
    InboxComponent
    ]
})
export class MessagesModule { }
export  {InboxComponent};
