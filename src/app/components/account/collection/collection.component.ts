import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { ViewService } from '../../../d7services/view/view.service';
import * as globals from '../../../d7services/globals';
import { MainService } from '../../../d7services/main/main.service';
import { LoaderService } from '../../shared/loader/loader.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
})
export class CollectionComponent implements OnInit {
  activeTab;
  checkTab: boolean;
  countProjectBookmark:number;
  checkArray = {};
  /* checkArray = {
     "project": "0",
     "showcase": "1",
     "maker": "1",
     "challenge-follow": "0",
     "challenge-enter": "2"
   }*/
  constructor(
    private viewService: ViewService,
    private mainService: MainService,
    private loaderService: LoaderService,
  ) { }

  ngOnInit() {
  //  this.loaderService.display(true);
    this.getCollectionCount();

  }
  /* function to change tab*/
  changeTab(NewTab, e) {
    e.preventDefault();

    this.activeTab = NewTab;
  }
  /*  end function to change tab*/
  getCollectionCount() {
    this.mainService.post(globals.endpoint + '/maker_count_api/collections/', {}).map(res => res.json()).subscribe(res => {
      //console.log(res.bookmarked_projects);
      this.checkArray = res;
      this.countProjectBookmark=this.checkArray['bookmarked_projects']
      console.log(this.countProjectBookmark)
    console.log(this.checkArray)
      for (var key in this.checkArray) {
        if (this.checkArray.hasOwnProperty(key)) {
          if (this.checkArray[key] > 0) {
            console.log(this.checkArray[key])
            this.activeTab = key;
            this.checkTab = true;
            console.log(this.activeTab);
            break;

          }
          if (this.checkTab != true) {
            this.activeTab = 'bookmarked_projects';
          }
        }
      }
    //  this.loaderService.display(false);
    }, err => {
   //   this.loaderService.display(true);
    });


  }
}
