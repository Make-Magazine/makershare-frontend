import { NgModule } from '@angular/core';
import { SortOrder } from 'app/Angular/pipes/sort-order';

@NgModule({
  imports: [],
  declarations: [SortOrder],
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
