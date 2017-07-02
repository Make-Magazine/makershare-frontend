import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ISorting } from '../../models/challenge/sorting';
// import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import { MetaService } from '@nglibs/meta';


@Component({
  selector: 'showcase-sorting',
  template: `
       <div ngbDropdown class="d-inline-block sorting-filter dropdown">
          <button class="btn btn-transparent dropdown-toggle" id="dropdownMenu1" ngbDropdownToggle>{{ActionName}} <i class="fa fa-lg fa-angle-down"></i></button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenu1">
            <button class="dropdown-item" (click)="mostRecent($event)">Most recent</button>
            <button class="dropdown-item" (click)="oldest($event)">Oldest</button>
            <button class="dropdown-item" (click)="sortAsc($event)">Title A-Z</button>
            <button class="dropdown-item" (click)="sortDesc($event)">Title Z-A</button>
            <button class="dropdown-item" (click)="mostLiked($event)">Most liked</button>
            <button class="dropdown-item" (click)="mostViewed($event)">Most viewed</button>
           
          </div>
        </div>
  `,
  // providers: [NgbDropdownConfig] // add NgbDropdownConfig to the component providers


})
export class ShowcaseSortingComponent implements OnInit {

  @Output() sortType = new EventEmitter<ISorting>();
  ActionName: string;
  pages: number = 0;
  sort: ISorting = {
    sort_by: "",
    sort_order: "",
    pageNo: 0
  };
  constructor(private meta: MetaService) { }

  ngOnInit() {
    this.ActionName = "Most Recent"
    this.meta.setTitle(`Showcases | Awe-inspiring Projects and Makers | Maker Share`);
    this.meta.setTag('og:image', '/assets/logo.png');
    this.meta.setTag('og:description', 'Curated collections of projects and portfolios. Find your inspiration here for own projects. Maker Share is a project by Make: + Intel.');

  }

  sortAsc(sort: ISorting) {
    this.sort.sort_order = "ASC";
    this.sort.sort_by = "title"
    this.sortType.emit(this.sort);
    this.ActionName = "Title A-z"
    // console.log(this.sort);
  }

  sortDesc(sort: string) {
    this.sort.sort_order = "DESC";
    this.sort.sort_by = "title"
    this.sortType.emit(this.sort);
    this.ActionName = "Title Z-A"
    // console.log(this.sort);
  }

  mostRecent(sort: string) {
    this.sort.sort_order = "DESC"
    this.sort.sort_by = "changed"
    this.sortType.emit(this.sort);
    this.ActionName = "Most recent"
    //  console.log(this.sort);
  }
  oldest(sort: string) {
    this.sort.sort_order = "ASC";
    this.sort.sort_by = "changed"
    this.sortType.emit(this.sort);
    this.ActionName = "Oldest"
    //  console.log(this.sort);
  }

  mostLiked(sort: string) {
    this.sort.sort_order = "DESC";
    this.sort.sort_by = "count"
    this.sortType.emit(this.sort);
    this.ActionName = "Most liked"
  }
    mostViewed(sort: string) {
    this.sort.sort_order = "DESC";
    this.sort.sort_by = "php"
    this.sortType.emit(this.sort);
    this.ActionName = "Most Viewed"
  }
  // mostViewed(sort: string) {
  //   this.sort.sort_order = "DESC";
  //   this.sort.sort_by = "php"
  //   this.sortType.emit(this.sort);
  //   this.ActionName = "Most viewed"
  // }

}
