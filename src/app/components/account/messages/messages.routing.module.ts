import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InboxComponent } from './inbox/inbox.component';
import { ViewComponent } from './view/view.component';




const MessagesRouts: Routes = [
  { path: 'inbox',  component:  InboxComponent},
   { path: 'view/:thread_id', component:  ViewComponent}
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
