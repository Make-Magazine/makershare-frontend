import { Component, OnInit } from '@angular/core';
import { ViewService } from '../../../d7services/view/view.service';
import { LoaderService } from '../../shared/loader/loader.service';

@Component({
  selector: 'app-makezine',
  templateUrl: './makezine.component.html',
})
export class MakezineComponent implements OnInit {
  title = '';
  body = ''
  constructor(
    private viewService: ViewService,
    private loaderService: LoaderService,    
  ) { }

  ngOnInit() {
    this.loaderService.display(true);
    this.viewService.getView('pages', [['nid', 797]]).subscribe(data => {
      this.title = data.title;
      this.body = data.body;
      this.loaderService.display(false);
    }, err => {
      console.log(err);
      this.loaderService.display(false);
    });
  }

}
