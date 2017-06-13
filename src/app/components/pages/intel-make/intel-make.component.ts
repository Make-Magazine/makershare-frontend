import { Component, OnInit } from '@angular/core';
import { ViewService } from '../../../d7services';
import { LoaderService } from '../../shared/loader/loader.service';
import { MetaService } from '@nglibs/meta';

@Component({
  selector: 'app-about-badges',
  templateUrl: './intel-make.component.html'
})
export class IntelMakeComponent implements OnInit {
  title = '';
  body = '';
  video = '';
  constructor(
    private viewService: ViewService,
    private loaderService: LoaderService,
    private meta: MetaService    
  ) { }

  ngOnInit() {
    this.loaderService.display(true);
    this.viewService.getView('pages', [['nid', 1535]]).subscribe(data => {
      this.title = data[0].title;
      this.body = data[0].body;
      this.video = data[0].field_introductory_video;

      this.meta.setTitle(`Maker Share | ${this.title}`);
      this.meta.setTag('og:image', '/assets/logo.png');
      this.meta.setTag('og:description', this.body);
      this.loaderService.display(false);
    }, err => {
      this.loaderService.display(false);
    });
  }

}
