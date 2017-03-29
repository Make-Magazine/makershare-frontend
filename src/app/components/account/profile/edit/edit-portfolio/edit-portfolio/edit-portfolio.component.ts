import { Component, OnInit,ViewChild } from '@angular/core';

@Component({
  selector: 'app-edit-portfolio',
  templateUrl: './edit-portfolio.component.html',
})
export class EditPortfolioComponent implements OnInit {
  @ViewChild('tab') Tab; 
  CurrentTab:string;
  
  constructor() { }

  ngOnInit() {
    this.CurrentTab = 'public';
  }
}
