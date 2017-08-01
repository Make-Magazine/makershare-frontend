import { Component, OnInit } from '@angular/core';
import { MainService } from '../../../CORE/d7services';
import { LoaderService } from '../../shared/loader/loader.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
})
export class CollectionComponent implements OnInit {
  activeTab;
  checkTab: boolean;
  countProjectBookmark:number;
  countShowcaseBookmark:number;
  countChallengeFollow:number;
  countChallengeEntered:number;
  countMakerBookmark:number;

  checkArray = {};
  /* checkArray = {
     "project": "0",
     "showcase": "1",
     "maker": "1",
     "challenge-follow": "0",
     "challenge-enter": "2"
   }*/
  constructor(
    private mainService: MainService,
    private loaderService: LoaderService,
  ) { }

  ngOnInit() {
    this.loaderService.display(true);
    this.getCollectionCount();

  }
  /* function to change tab*/
  changeTab(NewTab, e) {
    e.preventDefault();

    this.activeTab = NewTab;
  }
  /*  end function to change tab*/
  getCollectionCount() {
    this.mainService.post('maker_count_api/collections/', {}).map(res => res.json()).subscribe(res => {
      //console.log(res.bookmarked_projects);
      this.checkArray = res;
      this.countProjectBookmark=this.checkArray['bookmarked_projects']
      this.countShowcaseBookmark=this.checkArray['bookmarked_showcases']
      this.countChallengeFollow=this.checkArray['followed_projects']
      this.countChallengeEntered=this.checkArray['challenge_entries']
      this.countMakerBookmark=this.checkArray['maker_bookmark']
      for (var key in this.checkArray) {
        if (this.checkArray.hasOwnProperty(key)) {
          if (this.checkArray[key] > 0) {
            this.activeTab = key;
            this.checkTab = true;
            break;

          }
          if (this.checkTab != true) {
            this.activeTab = 'bookmarked_projects';
          }
        }
      }
     this.loaderService.display(false);
    }, err => {
     this.loaderService.display(true);
    });


  }
}
