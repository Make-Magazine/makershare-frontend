import { Component, OnInit } from '@angular/core';
import { ViewService } from '../../../d7services/view/view.service';

@Component({
  selector: 'app-learn',
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.css']
})
export class LearnComponent implements OnInit {
 learns = null;
categories = null;

  constructor(private viewService: ViewService) {}

  ngOnInit() {

    // get workshop main page from a view
    this.viewService.getView('learn', []).subscribe(data => {
      console.log(data);
      this.learns = data;
    }, err => {

    });

  }

}
