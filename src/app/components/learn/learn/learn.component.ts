import { Component, OnInit } from '@angular/core';
import { ViewService } from '../../../d7services';
import { Router } from '@angular/router';
import { LoaderService } from '../../shared/loader/loader.service';
import { Meta, Title } from '@angular/platform-browser';
import * as globals from '../../../d7services/globals';


@Component({
  selector: 'app-learn',
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.css']
})
export class LearnComponent implements OnInit {
  learns = [];
  categories = null;
  workshop;
  pages: number = 0;
  page_arg;
  countWorkshop = 0;
  hideloadmoreworkshop = true;


  constructor(
    private router: Router,
    private viewService: ViewService,
    private loaderService: LoaderService,
    private title: Title,
    private meta: Meta,
  ) { }

  ngOnInit() {
    this.getWorkshop();
    this.getCountWorkshop();
    this.title.setTitle('Learn | Maker Share');
    this.meta.addTags([
      {
        name: 'description', content: 'Learn with us'
      },
      {
        name: 'image', content: globals.appURL + '/assets/images/logos/maker-share-logo-clr@2x-100.jpg.jpg'
      }
    ])

    // this.meta.setTitle(`Maker Share | Learning`);
    // this.meta.setTag('og:image', '/assets/logo.png');
    // this.meta.setTag('og:description', 'Learning Learning Learning Learning Learning Learning Learning Learning ');
  }
  getWorkshop() {
    this.loaderService.display(true);
    var args = [
      ['page', this.pages],
    ];
    // get workshop main page from a view
    this.viewService.getView('learn', args).subscribe(res => {
      this.learns = this.learns.concat(res);
      this.loadMoreVisibilty();
      this.loaderService.display(false);
    }, err => {
      this.loaderService.display(false);
    });
  }
  /* function to get count projects */
  getCountWorkshop() {
    this.viewService.getView('maker_count_all_workshops/').subscribe(data => {
      this.countWorkshop = data[0];
    }, err => {

    });
  }
  /* end count function */
  WorkshopDetails(nid) {
    this.router.navigate(['/workshops', nid]);
  }
  loadMoreWorkshop() {
    this.pages++;
    this.getWorkshop();

  }
  // Function to control load more button
  loadMoreVisibilty() {
    // get the challenges array count
    this.getCountWorkshop();
    // console.log(this.countWorkshop)
    if (this.countWorkshop == this.learns.length) {
      this.hideloadmoreworkshop = true;

    } else if (this.countWorkshop < this.learns.length) {
      // setTimeout(10000);

      this.hideloadmoreworkshop = false;
    }
  }
  /* END FUNCTION loadMoreVisibilty */

}

