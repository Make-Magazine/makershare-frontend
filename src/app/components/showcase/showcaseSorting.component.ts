import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import {ISorting} from '../../models/challenge/sorting';
@Component({
  selector: 'showcase-sorting',
  template: `
       <div class="sorting-filter col-md-3 col-md-offset-5">
          <button class="btn btn-transparent dropdown-toggle" type="button" data-toggle="dropdown">{{ActionName}}
          <span class="caret" ></span></button>
          <ul class="dropdown-menu"  >

            <li><a (click)="mostRecent($event)" class="btn">Most  recent</a></li>
            <li><a (click)="oldest($event)" class="btn">Oldest</a></li>
            <li><a (click)="sortAsc($event)" class="btn">Title A-Z</a></li>
            <li><a (click)="sortDesc($event)"class="btn">Title Z-A</a></li>
          </ul>
        </div>
  `,
})
export class ShowcaseSortingComponent implements OnInit {

@Output() sortType = new EventEmitter<ISorting>();

ActionName:string;
pages:number = 0;
sort:ISorting={
  sort_by : "",
  sort_order:"",
  pageNo:0
};
  constructor() { }

  ngOnInit() {
    this.ActionName = "Most Recent"
    
  }

sortAsc(sort:ISorting){
  this.sort.sort_order= "ASC";
  this.sort.sort_by="title"
  this.sortType.emit(this.sort);
  this.ActionName = "Title A-z"
  console.log(this.sort);
}

sortDesc(sort:string){
  this.sort.sort_order= "DESC";
  this.sort.sort_by="title"
  this.sortType.emit(this.sort);
   this.ActionName = "Title Z-A"
  console.log(this.sort);
}

mostRecent(sort:string){
this.sort.sort_order="DESC"
this.sort.sort_by="changed"
this.sortType.emit(this.sort);
 this.ActionName = "Most Recent"
 console.log(this.sort);
}
oldest(sort:string){
this.sort.sort_order= "ASC";
this.sort.sort_by="changed"
this.sortType.emit(this.sort);
 this.ActionName = "Oldest"
 console.log(this.sort);
}

}
