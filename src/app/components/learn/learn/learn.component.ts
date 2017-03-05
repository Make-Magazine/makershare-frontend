import { Component, OnInit } from '@angular/core';
import { ViewService } from '../../../d7services/view/view.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-learn',
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.css']
})
export class LearnComponent implements OnInit {
 learns = null;
 categories = null;
 workshop;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private viewService: ViewService,
  ) { }

  ngOnInit() {

    // get workshop main page from a view
    this.viewService.getView('learn', []).subscribe(data => {
      console.log(data);
      this.learns = data;
    }, err => {

    });
  }
    WorkshopDetails(nid) {
    this.router.navigate(['/workshop', nid]);
    console.log(nid)
  }

}
