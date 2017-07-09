import { Component, OnInit } from '@angular/core';
import { ViewService } from '../../../d7services';
import { LoaderService } from '../../shared/loader/loader.service';

@Component({
  selector: 'app-guidelines',
  templateUrl: './guidelines.component.html',
})
export class GuidelinesComponent implements OnInit {

  title = '';
  body = ''
  constructor(
    private viewService: ViewService,
    private loaderService: LoaderService,
  ) { }

  ngOnInit() {
    this.loaderService.display(true);
    this.viewService.getView('pages', [['nid', 1545]]).subscribe(data => {
      if(data[0]){
        this.title = data[0].title;
        this.body = data[0].body;
      }

      // this.meta.setTitle(`Maker Share | ${this.title}`);
      // this.meta.setTag('og:image', '/assets/logo.png');
      // this.meta.setTag('og:description', this.body);
      this.loaderService.display(false);
    }, err => {
      this.loaderService.display(false);
    });
  }

}
