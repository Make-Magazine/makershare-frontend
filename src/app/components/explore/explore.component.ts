import { Component, OnInit } from '@angular/core';
import { ViewService } from '../../d7services/view/view.service';
import { RouterModule, Router } from '@angular/router';


@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {
  projects = null;
  categories = null;

  constructor(
    private router: Router,
    private viewService: ViewService,
  ) { }

  ngOnInit() {

    // get the projects
    this.viewService.getView('browse_projects').subscribe(data => {
      // console.log(data);
      this.projects = data;
    }, err => {

    });

    // get the categories
    this.viewService.getView('maker_taxonomy_category/2', []).subscribe(data => {


      let arr = [];
      for(let key in data){
       if(data.hasOwnProperty(key)){
         arr.push(data[key]);
       }
      }
      this.categories = arr;
    }, err => {

    });

  }

  projectsById(event){
    var id = event.target.id;
    this.viewService.getView('browse_projects', [['category', id],]).subscribe(data => {
    
      this.projects = data;
      
    }, err => {

    });
  }
  
  ShowProjectDetails(nid){
    this.router.navigate(['/project/view', nid]);
    //console.log(nid)
  }

}
