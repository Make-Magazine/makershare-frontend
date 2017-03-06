import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
})
export class RulesComponent implements OnInit {
@Input() projects; 
@Input() challenge;

  constructor() { }

  ngOnInit() {
  }

}
