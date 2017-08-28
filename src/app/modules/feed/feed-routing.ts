import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../auth0/auth-guard.service';
import { FeedComponent } from '../feed/feed.component';

const feedRouts: Routes = [
  { path: '', component: FeedComponent, canActivate: [AuthGuardService] },
];

@NgModule({
  imports: [RouterModule.forChild(feedRouts)],
  exports: [RouterModule],
})
export class FeedRoutingModule {}
