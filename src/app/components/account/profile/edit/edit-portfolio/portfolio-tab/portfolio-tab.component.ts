import { Component, OnInit,Input } from '@angular/core';
import { ViewService } from '../../../../../../d7services/view/view.service';
import { ProjectCardPortfolio } from '../../../../../../models/project/project-form/project';
import { UserService } from '../../../../../../d7services/user/user.service';

@Component({
  selector: 'portfolio-tab',
  templateUrl: './portfolio-tab.component.html',
})
export class PortfolioTabComponent implements OnInit {
  @Input() status:number;

  //grid/showcase
  DefaultView:string;
  Projects:ProjectCardPortfolio[] = [];

  constructor(
    private viewService:ViewService,
    private userService:UserService,
  ) { }

  ngOnInit() {
    //get user grid type
    this.DefaultView = "grid";
    this.UpdateProjects();
  }

  UpdateProjects(){
    this.viewService.getView('portfolio-projects',[['status',this.status]]).subscribe((projects:ProjectCardPortfolio[])=>{
      this.Projects = projects;
    })
  }

  ChangeDefaultView(NewView:string){
    // this.userService.updateUser()
  }

}
