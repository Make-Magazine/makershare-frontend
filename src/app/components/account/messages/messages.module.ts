import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InboxComponent } from './inbox/inbox.component';
import { MessagesRoutsModule } from './messages.routing.module';
import { ViewComponent } from './view/view.component';

 
@NgModule({
  imports: [
    CommonModule,
    MessagesRoutsModule
  ],
  declarations: [
    InboxComponent,
    ViewComponent
    ]
})
export class MessagesModule { }
export  {InboxComponent};
