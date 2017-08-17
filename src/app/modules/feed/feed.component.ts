import { Component, OnInit } from '@angular/core';
import { ViewService } from '../../core/d7services';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html'
})
export class FeedComponent implements OnInit {
  projects = [];
  pages: number = 0;
  noFeed = false;
  hideloadmoreproject = true;
  constructor(
    private viewService: ViewService,
  ) { }

  ngOnInit() {
    this.getFeed(false);
  }
  getFeed(more?: boolean) {
    if (more) {
      this.pages++;
    }
    this.viewService.getView('feed', [['page', this.pages]]).subscribe(data => {
      if (data) {
        if (data['seen'].length >= 1) {
          this.projects = this.projects.concat(data['seen']);
          this.hideloadmoreproject = (data['count'] <= this.projects.length) ? true : false;
          this.noFeed = true;
        }
      }
    })
  }
}
