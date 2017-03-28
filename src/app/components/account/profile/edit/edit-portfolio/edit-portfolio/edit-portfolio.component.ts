import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-portfolio',
  templateUrl: './edit-portfolio.component.html',
})
export class EditPortfolioComponent implements OnInit {
  CurrentTab:string;
  
  constructor() { }

  ngOnInit() {
    this.CurrentTab = 'public';
  }

}
