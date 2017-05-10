import { Component, OnInit, Input } from '@angular/core';
import { ViewService } from '../../../../../d7services/view/view.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../../../../d7services/user/user.service';
import { MetaService } from '@nglibs/meta';

@Component({
  selector: 'profile-projects',
  templateUrl: './projects.component.html',
})

export class ProjectsComponent implements OnInit {

  constructor(
    private router: Router,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private viewService: ViewService,
    private meta: MetaService
  ) { }
  pages: number = 0;
  userName;
  @Input('uid') uid;
  @Input('view') view;
  @Input('userFullName') userFullName;
  page_arg;
  countProject = 0;
  hideloadmoreproject = false;

  userPic = false;
  profile_projects = [];
  ngOnInit() {
    // check if user is logged in or not
    //  this.loaderService.display(true);
    this.userService.getStatus().subscribe(data => {
      if (data.user.uid > 0) {
        // logged in 
        this.activatedRoute.params.subscribe((params: Params) => {
          this.userName = params['user_name'];
        });
        this.userService.getIdFromUrl(this.userName).subscribe(data => {
          // console.log(this.userName)
          this.uid = data.uid;
          this.getProjects();
          this.getCountProject();

        }, err => {

        });
      } else {
        this.getProjects();
        this.getCountProject();
      }
    }, err => {
    });

  }
  addProject(event: Event) {
    event.preventDefault();
    this.router.navigate(['/project/create']);
  }
  getProjects() {
    var args = [
      ['uid', this.uid],
      ['member_id', this.uid],
      ['page', this.pages],
    ];
    this.viewService.getView('profile_projects_grid', args).subscribe(res => {
      this.profile_projects = this.profile_projects.concat(res);  
      // console.log(this.profile_projects);
      this.meta.setTitle(`Maker Share | Projects`);
      this.meta.setTag('og:image', '/assets/logo.png');
      this.meta.setTag('og:description', 'Projects Projects Projects Projects Projects Projects Projects Projects Projects ');
      this.loadMoreVisibilty();

    }, err => {

    });
  }
  /* function to get count projects */
  getCountProject() {
    this.viewService.getView('maker_count_all_projects/' + this.uid).subscribe(data => {
      this.countProject = data[0];
    }, err => {

    });
  }
  /* end count function */
  loadMoreProject() {
    this.pages++;
    this.getProjects();
  }
  // Function to control load more button
  loadMoreVisibilty() {
    // get the challenges array count
    this.getCountProject();
    if (this.countProject == this.profile_projects.length) {
      this.hideloadmoreproject = true;

    } else if (this.countProject > this.profile_projects.length) {
      setTimeout(10000);

      this.hideloadmoreproject = false;
    }
  }
  /* END FUNCTION loadMoreVisibilty */

}
