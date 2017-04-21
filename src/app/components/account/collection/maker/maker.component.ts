import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, RouterModule, ActivatedRoute, Params } from '@angular/router';
import { ViewService } from '../../../../d7services/view/view.service';
import { FlagService } from '../../../../d7services/flag/flag.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-maker',
  templateUrl: './maker.component.html',
})
export class MakerComponent implements OnInit {
  @Input()countMaker;
  users = [];
  deletedArr = [];
  userId;
  pages: number = 0;
  hideloadmoremaker = false;
  page_arg;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private viewService: ViewService,
    private flagService: FlagService,
    private _location: Location,
  ) { }
  ngOnInit() {
    this.userId = localStorage.getItem('user_id');
    this.getUserBookmark();
  }
  getUserBookmark() {
       if (this.pages >= 0) {
      this.page_arg =
        ['page', this.pages]
        ;
    }
    if (this.pages == 0) {
      this.users = [];
    }
    // get users Has Bookmark from a view
    this.viewService.getView('maker-bookmark',[this.page_arg]).subscribe(res => {
      this.users = this.users.concat(res);
      this.loadMoreVisibilty();
    }, err => {
    });
  }
  deleteMessage(i) {
    this.flagService.unflag(this.users[i]['uid'], this.userId, 'maker_bookmark').subscribe(response => {
      this.getUserBookmark();
    }, err => {
      //this.notificationBarService.create({ message: 'Sorry, somthing went wrong, try again later.', type: NotificationType.Error});
    });
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
      this.flagService.unflag(this.deletedArr[i], this.userId, 'maker_bookmark').subscribe(response => {
        this.getUserBookmark();
      }, err => {
        //this.notificationBarService.create({ message: 'Sorry, somthing went wrong, try again later.', type: NotificationType.Error});
      });
    }
  }

  checkAll(ev) {
    this.users.forEach(x => x.state = ev.target.checked)
    for (var _i = 0; _i < this.users.length; _i++) {
      if (ev.target.checked === true) {
        this.deletedArr.push(this.users[_i].nid);
        
      } else {
        var index = this.deletedArr.indexOf(this.users[_i].nid, 0);
        if (index > -1) {
          this.deletedArr.splice(index, 1);
        }
      }
    }
  }
  isAllChecked() {
    return this.users.every(_ => _.state);
  }
    /* function load more  */
  loadMoreMaker() {
    this.pages++;
    this.getUserBookmark();
  }
  /* end function load more  */
  // Function to control load more button
  loadMoreVisibilty() {
    // get the challenges array count
    if (this.countMaker == this.users.length) {

      this.hideloadmoremaker = true;

    } else if (this.countMaker > this.users.length) {
      this.hideloadmoremaker = false;
    }
  }
  /* END FUNCTION loadMoreVisibilty */
}
