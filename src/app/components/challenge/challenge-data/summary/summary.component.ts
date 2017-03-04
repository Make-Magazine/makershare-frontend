import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html'
})
export class SummaryComponent implements OnInit {
@Input() projects; 
  constructor() { }

  ngOnInit() {
  }

}
