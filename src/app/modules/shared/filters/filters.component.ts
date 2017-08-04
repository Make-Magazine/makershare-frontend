import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html'
})
export class Filters implements OnInit {
  @Input() data;
  @Input() type; //string switch
  @Input() ref;
  constructor(

  ) {}
  ngOnInit() {
    // nothing to see here
  }
}