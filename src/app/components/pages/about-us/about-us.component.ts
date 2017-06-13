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
  makers = [];
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
    this.viewService.getView('makers', [['page', this.pages], ['sort_by', this.sort.sort_by], ['sort_order', this.sort.sort_order]]).subscribe(data=>{
      this.makers = this.makers.concat(data);
      this.loaderService.display(false);
    })
  }

}
