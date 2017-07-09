import { Component, OnInit } from '@angular/core';
import { ViewService } from '../../../d7services';
import { LoaderService } from '../../shared/loader/loader.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',

})
export class AboutUsComponent implements OnInit {
  communityManagers = [];
  makeIntel = [];
  partners = [];
  constructor(
    private viewService: ViewService,
    private loaderService: LoaderService,
  ) { }

  ngOnInit() {
    this.getMakers();
  }

   getMakers() {
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
