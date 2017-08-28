import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FeedRoutingModule } from './feed-routing';
import { FeedComponent } from './feed.component';

@NgModule({
  imports: [CommonModule, SharedModule.forChild(), FeedRoutingModule],
  declarations: [FeedComponent],
})
export class FeedModule {}
