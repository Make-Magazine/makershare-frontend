import { Component, OnInit } from '@angular/core';
import { ViewService } from '../../../../d7services/view/view.service';

@Component({
  selector: 'profile-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})

export class ProjectsComponent implements OnInit {

  constructor(private viewService: ViewService) { }
  profile_projects = [];
  ngOnInit() {
    var args = [
      ['uid', 1],
    ];
    this.viewService.getView('profile_projects_grid', args).subscribe( res=> {
      this.profile_projects = res;
    }, err => {

    });
  }

}
