import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'app/modules/auth0/auth-guard.service';
import { FeedComponent } from 'app/modules/feed/feed.component';

const feedRouts: Routes = [
  { path: '', component: FeedComponent, canActivate: [AuthGuardService] },
];

@NgModule({
  imports: [RouterModule.forChild(feedRouts)],
  exports: [RouterModule],
})
export class FeedRoutingModule {}
