import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FeedRoutingModule } from 'app/modules/feed/feed-routing';
import { FeedComponent } from 'app/modules/feed/feed.component';
import { SharedModule } from 'app/modules/shared/shared.module';

@NgModule({
  imports: [CommonModule, SharedModule.forChild(), FeedRoutingModule],
  declarations: [FeedComponent],
})
export class FeedModule {}
