import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import {ISorting} from '../../../../models/challenge/sorting';
@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html'
})
export class SummaryComponent implements OnInit {
@Input() projects; 
@Output() sortType = new EventEmitter<ISorting>();
@Output() pageNumber = new EventEmitter<number>();
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
this.sort.sort_by="created"
this.sortType.emit(this.sort);
 this.ActionName = "Most Recent"
 console.log(this.sort);
}
oldest(sort:string){
this.sort.sort_order= "ASC";
this.sort.sort_by="created"
this.sortType.emit(this.sort);
 this.ActionName = "Oldest"
 console.log(this.sort);
}

mostLiked(sort:string){
this.sort.sort_order= "DESC";
this.sort.sort_by="count"
this.sortType.emit(this.sort);
 this.ActionName = "Most Liked"
 console.log(this.sort);

}
mostForked(sort:string){
this.sort.sort_order= "DESC";
this.sort.sort_by="field_total_forks_value";
this.sortType.emit(this.sort);
 this.ActionName = "Most Forked"
 console.log(this.sort);
}
loadmore(){
  this.pages++;
  this.pageNumber.emit(this.pages);
  console.log(this.pages);
}
}
