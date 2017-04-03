import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, RouterModule, ActivatedRoute, Params } from '@angular/router';
import { ViewService } from '../../../../d7services/view/view.service';
@Component({
  selector: 'app-maker',
  templateUrl: './maker.component.html',
})
export class MakerComponent implements OnInit {
  users = [];
  constructor(private route: ActivatedRoute,
    private router: Router,
    private viewService: ViewService,

  ) { }
  ngOnInit() {
    this.getUserBookmark();
  }
  getUserBookmark() {
   
    // get users Has Bookmark from a view
    this.viewService.getView('maker-bookmark').subscribe(res => {
      this.users = res;
    }, err => {

    });
  }
}
