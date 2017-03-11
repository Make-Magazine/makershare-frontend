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
  showcaseCount=0;
  hideloadmore=false;
  loadFlag=false;
  sortData:ISorting;
  sort_order:string;
  sort_by:string;
  limit=3;

  @Input() sortType:ISorting;

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
    // load the showcases
      if(this.loadFlag){
      this.limit+=3;
    }
      this.viewService.getView('views/showcases',[['display_id','services_1'],['limit',this.limit],['sort_by',this.sort_by],['sort_order',this.sort_order]]).subscribe(data => {
      this.showcases = data;
      this.loadMoreVisibilty();
    }, err => {

    });
    this.loadFlag=false;
  }

  // get more click
loadmore(){
 this.loadFlag = true;
 this.getShowCases();
}
// control load more button
loadMoreVisibilty(){
 // get the challenges array count

 if(this.showcases.length >= this.showcaseCount){
   console.log("flage");
    this.hideloadmore= true;
    console.log(this.hideloadmore);
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


// get the count of showcases
  showcasesCount() {
      this.viewService.getView('maker_count_showcases',[]).subscribe(data => {
      this.showcaseCount=data[0];
      console.log(this.showcaseCount);
    });
  }

  
}
