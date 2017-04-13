import { Component, OnInit,ViewChild } from '@angular/core';
import { UserService } from '../../../../../../d7services/user/user.service';
import { ViewService } from '../../../../../../d7services/view/view.service';

@Component({
  selector: 'app-edit-portfolio',
  templateUrl: './edit-portfolio.component.html',
})
export class EditPortfolioComponent implements OnInit {
  CurrentTab:string;
  DefaultView:string;
  
  constructor(
    private viewService:ViewService,
    private userService:UserService,
  ) { }

  ngOnInit() {
    this.CurrentTab = 'public';
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
