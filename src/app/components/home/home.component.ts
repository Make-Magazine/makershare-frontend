import { Component, OnInit } from '@angular/core';
import { Auth } from '../../auth0/auth.service';
import { LoaderService } from '../shared/loader/loader.service';
import { ViewService } from './../../d7services';
import { Meta, Title } from '@angular/platform-browser';
import * as globals from '../../d7services/globals';
import {
  SimpleOverviewEntity,
  EntityType,
  EntityGridSize,
} from '../../models/cards';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  private homeCards;

  constructor(
    private viewService: ViewService,
    private loaderService: LoaderService,
    public auth: Auth,
    title: Title,
    meta: Meta,
  ) {
    title.setTitle(' Maker Share | Create. Connect. Learn. | By Make: + Intel');
    meta.addTags([
      {
        name: 'og:description',
        content: 'test description in home page with og description',
      },
      {
        name: 'og:image',
        content:
          globals.appURL +
            '/assets/images/logos/maker-share-logo-clr@2x-100.jpg.jpg',
      },
    ]);
  }

  ngOnInit() {
    this.loaderService.display(true);
    this.viewService
      .getView<SimpleOverviewEntity[]>('maker_homepage_api')
      .subscribe(
        data => {
          // Keep track of columns used on line
          let usedColumnsOnLine: number = 0;
          const columnsPerLine: number = 3;

          this.homeCards = data.map((card: SimpleOverviewEntity, i: number) => {
            // let forcedNarrow: boolean = false;
            let elementSize: EntityGridSize = EntityGridSize.TALL;

            // When type is missing, it's a maker
            if (!card.type) {
              if (card.entity_type === 'user') {
                card.type = EntityType.MAKER;
              }
            }

            // If type challenge and more than one column remaining on the line
            // if (i > 0) {
            if (
              data[i].type === EntityType.CHALLENGE &&
              usedColumnsOnLine < 2
            ) {
              elementSize = EntityGridSize.WIDE;
            }
            // }

            card.size = elementSize;

            // Increment columns
            usedColumnsOnLine += elementSize === EntityGridSize.WIDE ? 2 : 1;

            if (usedColumnsOnLine === columnsPerLine) {
              usedColumnsOnLine = 0;
            }

            return card;
          });

          // this.meta.setTitle(` Maker Share | Create. Connect. Learn. | By Make: + Intel`);
          // this.meta.setTag('og:image', '/assets/logo.png');
          // this.meta.setTag('og:description', 'Where Makers come to show & tell what they can do. Create your Maker Portfolio and share your projects, participate in community missions, and learn new skills.');
          this.loaderService.display(false);
          // for (let r of data)
          // if(r.type=="project"){
          //   //console.log(r)
          // }
          // console.log(data)
        },
        err => {
          this.loaderService.display(true);
        },
      );
  }
}
