import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Singleton } from '../../core';
import { ViewService } from '../../core/d7services';
import { EntityGridSize, EntityType, SimpleOverviewEntity } from '../../core/models/cards';
import { Auth } from '../auth0/auth.service';
import { LoaderService } from '../shared/loader/loader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  homeCards = [];

  constructor(
    private viewService: ViewService,
    private loaderService: LoaderService,
    public auth: Auth,
    title: Title,
    meta: Meta,
  ) {
    title.setTitle('Maker Share | Make What You Love. Share What You Make.');
    meta.addTags([
      {
        name: 'og:description',
        content:
          'Where Makers come to show & tell what they can do. Create your Maker Portfolio and share your projects, participate in community missions, and learn new skills.',
      },
      {
        name: 'og:image',
        content:
          Singleton.Settings.appURL +
          'assets/images/logos/maker-share-logo-clr@2x-100.jpg.jpg',
      },
    ]);
  }

  ngOnInit() {
    this.load();
  }

  /**
   * load
   *
   * @param {boolean} showLoader
   */
  load(showLoader: boolean = true) {
    if (showLoader) {
      this.loaderService.display(true);
    }

    this.viewService.getView('maker_homepage_api').subscribe(
      data => {
        // Keep track of columns used on line
        let usedColumnsOnLine: number = 0;
        const columnsPerLine: number = 3;

        this.homeCards = data.reduce(
          (
            results: SimpleOverviewEntity[],
            card: SimpleOverviewEntity,
            i: number,
          ) => {
            let elementSize: EntityGridSize = EntityGridSize.TALL;

            // When type is missing, it's a maker
            if (!card.type) {
              if (card.entity_type === 'user') {
                card.type = EntityType.MAKER;
              }
            }

            // If type challenge and more than one column remaining on the line
            if (
              data[i].type === EntityType.CHALLENGE &&
              usedColumnsOnLine < 2
            ) {
              elementSize = EntityGridSize.WIDE;
            }

            card.size = elementSize;

            // Increment columns
            usedColumnsOnLine += elementSize === EntityGridSize.WIDE ? 2 : 1;

            if (usedColumnsOnLine === columnsPerLine) {
              usedColumnsOnLine = 0;
            }

            if (card.type && card.entity_id) {
              results.push(card);
            }
            return results;
          },
          [],
        );

        if (showLoader) {
          this.loaderService.display(false);
        }
      },
      err => {
        if (showLoader) {
          this.loaderService.display(true);
        }
      },
    );
  }

  UnFlagged(i: number) {
    var index = this.homeCards.indexOf(this.homeCards[i], 0);
    if (index > -1) {
      this.homeCards.splice(index, 1);
    }
  }
}
