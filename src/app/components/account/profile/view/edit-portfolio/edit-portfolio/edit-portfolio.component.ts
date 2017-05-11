import { Component, OnInit,ViewChild, Input } from '@angular/core';
import { UserService,ViewService } from '../../../../../../d7services';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-edit-portfolio',
  templateUrl: './edit-portfolio.component.html',
})
export class EditPortfolioComponent implements OnInit {
  defaultTabObs: Observable<string>;
  defaultTab: string;
  CurrentTab:string;
  DefaultView:string;
  constructor(
    private viewService:ViewService,
    private userService:UserService,
    private route: ActivatedRoute,
  ) { }
  @Input('projectsCount') projectsCount;

  ngOnInit() {
    this.CurrentTab = 'public';
    // set default tab according to url parameter "tab"
    this.defaultTabObs = this.route.queryParams.map(params => params['tab'] || 'None');
    this.defaultTabObs.subscribe(tab => {
      if(tab != undefined || tab != ''){
          this.CurrentTab = tab;
      }
      if(tab == 'None'){
        this.CurrentTab = 'public';
      }
    });

    
    this.userService.getUser(localStorage.getItem("user_id")).subscribe(userdata=>{
      this.DefaultView = "grid";
      if(userdata.projects_view){
        this.DefaultView = userdata.projects_view;
      }
    });
  }

  ChangeDefaultView(NewView:string){
    let user = {
      uid:localStorage.getItem("user_id"),
      field_project_view:{und:NewView},
    };
    this.userService.updateUser(user).subscribe(data=>{
      this.DefaultView = NewView;
    });
  }
}
