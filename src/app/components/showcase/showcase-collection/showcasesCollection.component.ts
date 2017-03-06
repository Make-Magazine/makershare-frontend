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
  hideloadmore=false;
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
    this.sort_by = "changed";
    this.showcasesCount();
    this.getShowCases();

  }

  ShowSingleShowcase(nid){
     this.router.navigate(['/single-showcase', nid]);
  }

  getShowCases(){

    var sort: string;
    // load the showcases
    this.viewService.getView('showcases',[['page',this.pageNumber],['sort_by',this.sort_by],['sort_order',this.sort_order]]).subscribe(data => {
      this.showcases = this.showcases.concat(data);

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
 if(this.showcases.length == this.showcaseCount){
    this.hideloadmore= true;
 }else{
    this.hideloadmore= false;
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

// get the count of showcases
  showcasesCount() {
      this.viewService.getView('maker_count_showcases',[]).subscribe(data => {
      this.showcaseCount=data;
      console.log(this.showcaseCount);
    });
  }

  
}
