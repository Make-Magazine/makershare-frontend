import { Component, OnInit, Input } from '@angular/core';
import { Router, RouterModule, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-share-buttons',
  templateUrl: './share-buttons.component.html'
})
export class ShareButtonsComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
  }

}
