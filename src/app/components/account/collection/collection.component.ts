import { Component, OnInit } from '@angular/core';
import { ViewService } from '../../../d7services/view/view.service';
import * as globals from '../../../d7services/globals';
import { MainService } from '../../../d7services/main/main.service';


@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
})
export class CollectionComponent implements OnInit {
  activeTab;
  checkTab: boolean;
  checkArray={};
 /* checkArray = {
    "project": "0",
    "showcase": "1",
    "maker": "1",
    "challenge-follow": "0",
    "challenge-enter": "2"
  }*/
  constructor(private viewService: ViewService,
    private mainService: MainService,
  ) { }

  ngOnInit() {
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
      this.checkArray=res;
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
      }
    }
     });
     

  }
}
