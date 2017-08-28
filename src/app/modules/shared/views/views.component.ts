import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-views',
  templateUrl: './views.component.html',
})
export class ViewsComponent {
  @Input() viewsCount: number;

  constructor(
  ) {
  }
}
