import { Component, Input, OnInit } from '@angular/core';
import { FlagService, ViewService } from '../../../../core/d7services';

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
  hideloadmoreproject = true;
  page_arg;


  userId
  type = 'project';
  checkState = false;
  check = false;
  constructor(
    private viewService: ViewService,
    private flagService: FlagService,
  ) { }
  ngOnInit() {
    this.getProjectBookmark();
    this.userId = localStorage.getItem('user_id');
  }
  loadProject(project) {
    this.viewService.getView('maker_project_api/' + project.nid)
      .subscribe(data => {
        project.sant_image = data.field_cover_photo.styled_url;
        this.projects.push(project);
        console.log(data);
      })
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
      for (let project of res) {
        this.loadProject(project);
      }
      // this.projects = this.projects.concat(res);
      // console.log(res);
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
this.countProject--;
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
    if (this.countProject >= this.projects.length) {

      this.hideloadmoreproject = true;

    } else if (this.countProject > this.projects.length) {
      this.hideloadmoreproject = false;
    }
  }
  /* END FUNCTION loadMoreVisibilty */
}
