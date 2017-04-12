import { Component, OnInit,Input } from '@angular/core';
import { ViewService } from '../../../../../../d7services/view/view.service';
import { ProjectCardPortfolio } from '../../../../../../models';
import { UserService } from '../../../../../../d7services/user/user.service';
import { NodeService } from '../../../../../../d7services/node/node.service';
import { Observable } from "rxjs";
import { Router } from '@angular/router';

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
    private nodeService:NodeService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.userService.getUser(localStorage.getItem("user_id")).subscribe(userdata=>{
      this.DefaultView = "grid";
      if(userdata.projects_view){
        this.DefaultView = userdata.projects_view;
      }
      this.UpdateProjects();
    });
  }

  UpdateProjects(){
    this.viewService.getView('portfolio-projects',[['status',this.status]]).subscribe((projects:ProjectCardPortfolio[])=>{
      this.Projects = projects;
    })
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

  SaveProjectsOrder(){
    var tasks=[];
    this.Projects.forEach((project:ProjectCardPortfolio,index:number)=>{
      let ProjectwithOrder = {
        nid:project.nid,
        field_sort_order:{und:[{value:index + 1}]},
      };
      tasks.push(this.nodeService.UpdateNode(ProjectwithOrder).timeout(50000));
    });
    let source = Observable.forkJoin(tasks).timeout(50000);
    source.subscribe(
      (x) => {},(err) => {console.log(err);},
      () => {
        
      }
    );
  }

}
