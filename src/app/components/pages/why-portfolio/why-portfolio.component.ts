import { Component, OnInit } from '@angular/core';
import { ViewService } from '../../../d7services';
import { LoaderService } from '../../shared/loader/loader.service';
import { MetaService } from '@nglibs/meta';
import { Auth } from '../../../auth0/auth.service';

@Component({
  selector: 'app-why-portfolio',
  templateUrl: './why-portfolio.component.html',
})
export class WhyPortfolioComponent implements OnInit {

  title = '';
  body = ''
  constructor(
    private viewService: ViewService,
    private loaderService: LoaderService,
    private meta: MetaService,
    public auth: Auth,
  ) { }

  ngOnInit() {
    this.loaderService.display(true);
    this.viewService.getView('pages', [['nid', 1546]]).subscribe(data => {
      this.title = data[0].title;
      this.body = data[0].body;

      this.meta.setTitle(`Maker Share | ${this.title}`);
      this.meta.setTag('og:image', '/assets/logo.png');
      this.meta.setTag('og:description', this.body);
      this.loaderService.display(false);
    }, err => {
      this.loaderService.display(false);
    });
  }

}
