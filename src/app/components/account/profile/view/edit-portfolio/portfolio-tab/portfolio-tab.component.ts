import { Component, OnInit,Input } from '@angular/core';
import { ViewService } from '../../../../../../d7services/view/view.service';
import { ProjectCardPortfolio } from '../../../../../../models';
import { UserService } from '../../../../../../d7services/user/user.service';
import { MainService } from '../../../../../../d7services/main/main.service';
import { Observable } from "rxjs";
import { Router } from '@angular/router';

@Component({
  selector: 'portfolio-tab',
  templateUrl: './portfolio-tab.component.html',
})
export class PortfolioTabComponent implements OnInit {
  @Input() status:number;
  @Input() DefaultView:string;

  //grid/showcase
  Projects:ProjectCardPortfolio[] = [];

  constructor(
    private viewService:ViewService,
    private userService:UserService,
    private mainService:MainService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.UpdateProjects()
  }

  UpdateProjects(){
    let uid = localStorage.getItem('user_id');
    this.viewService.getView('portfolio-projects',[['status',this.status], ['uid',uid], ['member_id',uid]]).subscribe((projects:ProjectCardPortfolio[])=>{
      this.Projects = projects;
    });
  }

  SaveProjectsOrder(){
    this.mainService.post('/api/maker_sort_project_api/sort',this.Projects.map(project=>project.nid)).subscribe((data)=>{
      
    },err=>{
    },()=>{
      this.UpdateProjects();
    });
  }

}
