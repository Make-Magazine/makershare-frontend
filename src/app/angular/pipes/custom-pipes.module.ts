// not used

import { NgModule } from '@angular/core';
import { SortOrder } from './sort-order';
import { TimeagoPipe } from './timeago';

@NgModule({
  imports: [],
  declarations: [SortOrder, TimeagoPipe],
  exports: [SortOrder],
})
export class PipeModule {
  static forRoot() {
    return {
      ngModule: PipeModule,
      providers: [],
    };
  }
}
