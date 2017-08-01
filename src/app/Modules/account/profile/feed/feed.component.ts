import { Component, OnInit } from '@angular/core';
import { ViewService } from '../../../../CORE/d7services';


@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html'
})
export class FeedComponent implements OnInit {
  
  projects;
  constructor(
    private viewService: ViewService,
  ) { }

  ngOnInit() {
    this.getFeed();
  }
  getFeed() {
    this.viewService.getView('feed').subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        this.projects = data
      }
    })
  }

}
