import { Component, OnInit,Input  } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { ViewService } from './../../../d7services/view/view.service';
import { ISorting } from '../../../models/challenge/sorting';

@Component({
  selector: 'app-showcases',
  templateUrl: './showcasesCollection.component.html',
})
export class ShowcasesCollectionComponent implements OnInit {
  showcases = [];
  pageNumber = 0;
  showcaseCount=0;
  hideloadmore=true;
  sortData:ISorting;
  sort_order:string;
  sort_by:string;

  @Input() sortType:ISorting;
  @Input() pageNo:number;

  constructor(
    private viewService: ViewService,
    private router: Router,
  ) { }

  ngOnInit() {

    this.sort_order = "DESC";
    this.sort_by = "created";

    this.getShowCases();

  }

  ShowSingleShowcase(nid){
     this.router.navigate(['/single-showcase', nid]);
  }

  getShowCases(){

    var sort: string;
    var page_arg = [];
     if(this.pageNumber >=0){
      page_arg = ['page', this.pageNumber];
    }
    // load the showcases
    this.viewService.getView('showcases',[['page',this.pageNumber],['sort_by',this.sort_by],['sort_order',this.sort_order]]).subscribe(data => {
      this.showcases = data;

      this.loadMoreVisibilty();
    }, err => {

    });
  }

  // get more click
loadmore(){
 this.pageNumber++;
 this.getShowCases();
}
// control load more button
loadMoreVisibilty(){
 // get the challenges array count
 var ch_arr_count = this.showcases.length;
 if(ch_arr_count > 1){
   this.hideloadmore = true;
 }else{
   this.hideloadmore = false;
 }

}

getSortType(event:any){
    this.sortData = event;
    this.sort_by=this.sortData.sort_by;
    this.sort_order = this.sortData.sort_order;
    this.getShowCases();
//console.log(this.getProjects);
}

getPageNumber(event:any){
this.pageNo = event
// console.log(this.pageNo);
}


}
