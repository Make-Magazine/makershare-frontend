import { Component, OnInit } from '@angular/core';
import { ViewService } from '../../d7services/view/view.service';
import { RouterModule, Router } from '@angular/router';


@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
})
export class ExploreComponent implements OnInit {
  projects = [];
  categories = null;
  view = 'grid';
  pages: number = 0;
  countProject=0;
  hideloadmoreproject = false;

  page_arg;
  constructor(
    private router: Router,
    private viewService: ViewService,
  ) { }

  ngOnInit() {

    this.getProjects();
    this.getCountProject();
    // get the categories
    // this.viewService.getView('maker_taxonomy_category/2', []).subscribe(data => {


    //   let arr = [];
    //   for(let key in data){
    //    if(data.hasOwnProperty(key)){
    //      arr.push(data[key]);
    //    }
    //   }
    //   this.categories = arr;
    // }, err => {

    // });

  }

getProjects(){
    // get the projects
     if (this.pages >= 0) {
      this.page_arg = ['page', this.pages];
    }
    this.viewService.getView('browse_projects', [['page', this.pages]]).subscribe(data => {
      // console.log(data);
      this.projects = this.projects.concat(data);
      console.log(this.projects);
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
  /* function to get count projects */
  getCountProject(){
     this.viewService.getView('maker_count_all_projects').subscribe(data => {
      this.countProject = data[0];
      console.log(this.countProject);
    }, err => {

    });
  }
  /* end count function */
  /* function load more  */
  loadMoreProject() {
    this.pages++;
    console.log(this.pages);
    this.getProjects();
  }
  /* end function load more  */
  // Function to control load more button
  loadMoreVisibilty() {
    // get the challenges array count
    this.getCountProject();
    // this.getSortType(event);
    if (this.countProject == this.projects.length) {
      this.hideloadmoreproject = true;

      // console.log(this.projects.length);
      //console.log(this.countProjects);
    } else if (this.countProject > this.projects.length) {
      setTimeout(10000);
      this.hideloadmoreproject = false;
    }
  }
  /* END FUNCTION loadMoreVisibilty */
 

}
