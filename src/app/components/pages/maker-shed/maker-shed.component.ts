import { Component, OnInit } from '@angular/core';
import { ViewService } from '../../../d7services';
import { LoaderService } from '../../shared/loader/loader.service';

@Component({
  selector: 'app-maker-shed',
  template: `
      <section class="page-node">
        <div class="container">
          <h3 class="page-title" *ngIf="title" [innerHTML]="title"></h3>
          <div class="page-body" *ngIf="body" [innerHTML]="body"></div>
        </div>
      </section>  
  `,
})
export class MakerShedComponent implements OnInit {

  title = '';
  body = ''
  constructor(
    private viewService: ViewService,
    private loaderService: LoaderService,
  ) { }

  ngOnInit() {
    this.loaderService.display(true);
    this.viewService.getView('pages', [['nid', 1544]]).subscribe(data => {
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
