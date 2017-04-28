import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, RouterModule, ActivatedRoute, Params } from '@angular/router';
import { ViewService } from '../../../../d7services/view/view.service';
import { FlagService } from '../../../../d7services/flag/flag.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
//import { LoaderComponentService } from '../../../shared/loader-component/loader-component.service';

@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html',
})
export class ShowcaseComponent implements OnInit {
  type = 'showcase';
  userId;
  showcases = [];
  deletedArr = [];
  pages: number = 0;
  hideloadmoreshowcase = true;
  page_arg;
  @Input() countShowcase;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private viewService: ViewService,
    private flagService: FlagService,
    private _location: Location,
 //   private loaderComponentService: LoaderComponentService,
  ) { }

  ngOnInit() {
    this.userId = localStorage.getItem('user_id');
    this.getShowcaseBookmark();

  }
  getShowcaseBookmark() {
    if (this.pages >= 0) {
      this.page_arg =
        ['page', this.pages];
    }
    if (this.pages == 0) {
      this.showcases = [];
    }
    var args =
      ['type', this.type];
    // get project Has Bookmark from a view
    this.viewService.getView('bookmark', [args, this.page_arg]).subscribe(res => {
      this.showcases = this.showcases.concat(res);
         // console.log(this.showcases.length)
            //  console.log(this.countShowcase)

      this.loadMoreVisibilty();
    }, err => {
    });
  }
  deleteMessage(i) {


    this.flagService.unflag(this.showcases[i]['nid'], this.userId, 'node_bookmark').subscribe(response => {
      this.getShowcaseBookmark();
    }, err => {
      //this.notificationBarService.create({ message: 'Sorry, somthing went wrong, try again later.', type: NotificationType.Error});
    });
    // console.log(this.projects[i]['nid']);

  }
  valueChanged(mid, event) {
    // add to deletedArr
    if (event.target.checked === true) {
      this.deletedArr.push(mid);

      // console.log(this.deletedArr)
    } else {
      // remove from deletedArr
      var index = this.deletedArr.indexOf(mid, 0);
      if (index > -1) {
        this.deletedArr.splice(index, 1);
      }
    }
  }
  /**
* delete selected messages
*/
  deleteMessages() {

    for (var i = 0; i < this.deletedArr.length; i++) {
      this.flagService.unflag(this.deletedArr[i], this.userId, 'node_bookmark').subscribe(response => {
        this.getShowcaseBookmark();
      }, err => {
        //this.notificationBarService.create({ message: 'Sorry, somthing went wrong, try again later.', type: NotificationType.Error});
      });
    }
  }


  checkAll(ev) {
    this.showcases.forEach(x => x.state = ev.target.checked)
    for (var _i = 0; _i < this.showcases.length; _i++) {
      if (ev.target.checked === true) {
        this.deletedArr.push(this.showcases[_i].nid);

      } else {
        var index = this.deletedArr.indexOf(this.showcases[_i].nid, 0);
        if (index > -1) {
          this.deletedArr.splice(index, 1);
        }
      }
    }
  }
  isAllChecked() {

    return this.showcases.every(_ => _.state);
  }
  /* function load more  */
  loadMoreshowcase() {
    this.pages++;
    this.getShowcaseBookmark();
  }
  /* end function load more  */
  // Function to control load more button
  loadMoreVisibilty() {
    // get the challenges array count
    if (this.countShowcase == this.showcases.length) {

      this.hideloadmoreshowcase = true;

    } else if (this.countShowcase > this.showcases.length) {
      this.hideloadmoreshowcase = false;
    }
  }
  /* END FUNCTION loadMoreVisibilty */
}
