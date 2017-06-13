import { Component, OnInit } from '@angular/core';
import { ViewService } from '../../../d7services';
import { LoaderService } from '../../shared/loader/loader.service';
import { MetaService } from '@nglibs/meta';
import { ISorting } from '../../../models/makers/sorting';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styles: [`
    
  `]
})
export class AboutUsComponent implements OnInit {
  title = '';
  body = '';
  communityManagers = [];
  makeIntel = [];
  partners = [];
  pages: number = 0;
  sort: ISorting = {
    sort_by: "random",
    sort_order: "ASC",
    pageNo: 0
  };
  constructor(
    private viewService: ViewService,
    private loaderService: LoaderService,
    private meta: MetaService    
  ) { }

  ngOnInit() {
    this.getMakers();
  }

   getMakers() {
    // if (this.pages >= 0) {
    //   this.page_arg = ['page', this.pages];
    // }
    this.loaderService.display(true);

    // get community managers
    this.viewService.getView('about-comunnity-managers').subscribe( users => {
      this.communityManagers = users;
    });

    this.viewService.getView('about-make-intel').subscribe( users => {
      this.makeIntel = users;
      this.loaderService.display(false);
    });

    this.viewService.getView('about-partners').subscribe( users => {
      this.partners = users;
    });

  }

}
