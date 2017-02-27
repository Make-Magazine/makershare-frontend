import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ViewService } from '../../../d7services/view/view.service'

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
})
export class ProjectDetailsComponent implements OnInit {

  project;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private viewService: ViewService,
  ) { }

  ngOnInit() {
    this.route.params
    // (+) converts string 'id' to a number
    .switchMap((nid) => this.viewService.getView('maker_project_api/'+nid['nid']))
    .subscribe(data =>{
      console.log(data)
      this.project = data;
    });
  }

}
