import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, RouterModule, ActivatedRoute, Params } from '@angular/router';
import { ViewService } from '../../../../d7services/view/view.service';
import { FlagService } from '../../../../d7services/flag/flag.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
})
export class ProjectComponent implements OnInit {
  projects = [];
  userId
  type = 'project';
  constructor(private route: ActivatedRoute,
    private router: Router,
    private viewService: ViewService,
        private flagService: FlagService,


  ) { }
  ngOnInit() {
    this.getProjectBookmark();
    this.userId = localStorage.getItem('user_id');

  }
  getProjectBookmark() {
    var args = [
      ['type', this.type],
    ];
    // get project Has Bookmark from a view
    this.viewService.getView('bookmark', args).subscribe(res => {
      this.projects = res;
    }, err => {

    });
  }
    deleteMessage(i) {

       
      this.flagService.unflag(this.projects[i]['nid'], this.userId, 'node_bookmark').subscribe(response => {
     this.getProjectBookmark(); 
     }, err => {
        //this.notificationBarService.create({ message: 'Sorry, somthing went wrong, try again later.', type: NotificationType.Error});
      });
     // console.log(this.projects[i]['nid']);
    
  }

}
