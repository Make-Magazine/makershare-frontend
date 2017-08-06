import { Component, OnInit } from '@angular/core';
import { ViewService } from 'app/CORE/d7services';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html'
})
export class FeedComponent implements OnInit {
  projects;
  noFeed = false;
  constructor(
    private viewService: ViewService,
  ) { }

  ngOnInit() {
    this.getFeed();
  }
  getFeed() {
    this.viewService.getView('feed').subscribe(data => {
      if (data.length >= 1) {
        this.projects = data;
      } else {
        this.noFeed = true;
      }
    })
  }
}