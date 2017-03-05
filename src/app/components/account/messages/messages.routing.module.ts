import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InboxComponent } from './inbox/inbox.component';
import { ViewComponent } from './view/view.component';




const MessagesRouts: Routes = [
  { path: 'inbox',  component:  InboxComponent},
   { path: 'view',  component:  ViewComponent}
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
