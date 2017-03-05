import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InboxComponent } from './inbox/inbox.component';




const MessagesRouts: Routes = [
  { path: 'inbox',  component:  InboxComponent}
 // { path: 'project/view/:nid', component: ProjectDetailsComponent }
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
