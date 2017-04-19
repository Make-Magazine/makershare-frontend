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
  selector: 'app-project',
  templateUrl: './project.component.html',
})
export class ProjectComponent implements OnInit {
  @Input() countProject;
  projects = [];
  deletedArr = [];
  pages: number = 0;
  //countProject :any;
  hideloadmoreproject = false;
  page_arg;


  userId
  type = 'project';
  checkState = false;
  check = false;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private viewService: ViewService,
    private flagService: FlagService,
    private _location: Location,
  ) { }
  ngOnInit() {
    this.getProjectBookmark();
    this.userId = localStorage.getItem('user_id');


  }
  getProjectBookmark() {
    // get the projects
    if (this.pages >= 0) {
      this.page_arg =
        ['page', this.pages]
        ;
    }
    if (this.pages == 0) {
      this.projects = [];
    }
    var args =
      ['type', this.type];

    // get project Has Bookmark from a view
    this.viewService.getView('bookmark', [args, this.page_arg]).subscribe(res => {
      //this.projects = res;
      this.projects = this.projects.concat(res);
      this.loadMoreVisibilty();

    }, err => {

    });
  }
  deleteMessage(i) {
    this.flagService.unflag(this.projects[i]['nid'], this.userId, 'node_bookmark').subscribe(response => {
      this.getProjectBookmark();
    }, err => {
    });
  }
  valueChanged(mid, event) {
    // add to deletedArr
    if (event.target.checked === true) {
      this.deletedArr.push(mid);

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
        this.getProjectBookmark();
      }, err => {
      });
    }
  }


  checkAll(ev) {
    this.projects.forEach(x => x.state = ev.target.checked)
    for (var _i = 0; _i < this.projects.length; _i++) {
      if (ev.target.checked === true) {
        this.deletedArr.push(this.projects[_i].nid);

      } else {
        var index = this.deletedArr.indexOf(this.projects[_i].nid, 0);
        if (index > -1) {
          this.deletedArr.splice(index, 1);
        }
      }
    }
  }
  isAllChecked() {

    return this.projects.every(_ => _.state);
  }
  /* function load more  */
  loadMoreProject() {
    this.pages++;
    this.getProjectBookmark();
  }
  /* end function load more  */
  // Function to control load more button
  loadMoreVisibilty() {
    // get the challenges array count
    if (this.countProject == this.projects.length) {

      this.hideloadmoreproject = true;

    } else if (this.countProject > this.projects.length) {
      this.hideloadmoreproject = false;
    }
  }
  /* END FUNCTION loadMoreVisibilty */
}
