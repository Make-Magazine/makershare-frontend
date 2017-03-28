import { Component, OnInit,Input } from '@angular/core';
import { ViewService } from '../../../../../../d7services/view/view.service';
import { ProjectCardPortfolio } from '../../../../../../models/project/project-form/project';
import { UserService } from '../../../../../../d7services/user/user.service';
import { NodeService } from '../../../../../../d7services/node/node.service';
import { Observable } from "rxjs";

@Component({
  selector: 'portfolio-tab',
  templateUrl: './portfolio-tab.component.html',
})
export class PortfolioTabComponent implements OnInit {
  @Input() status:number;

  //grid/showcase
  DefaultView:string;
  Projects:ProjectCardPortfolio[] = [];
  uid:number;

  constructor(
    private viewService:ViewService,
    private userService:UserService,
    private nodeService:NodeService,
  ) { }

  ngOnInit() {
    this.userService.getStatus().subscribe(user=>{
      this.uid = user.user.uid;
      this.userService.getUser(user.user.uid).subscribe(userdata=>{
        this.DefaultView = "grid";
        console.log(userdata);
        if(userdata.projects_view){
          this.DefaultView = userdata.projects_view;
        }
        this.UpdateProjects();
      });
    });
  }

  UpdateProjects(){
    this.viewService.getView('portfolio-projects',[['status',this.status]]).subscribe((projects:ProjectCardPortfolio[])=>{
      this.Projects = projects;
    })
  }

  ChangeDefaultView(NewView:string){
    let user = {
      uid:this.uid,
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
      tasks.push(this.nodeService.UpdateNode(ProjectwithOrder));
    });
    let source = Observable.forkJoin(tasks);
    source.subscribe(
      (x) => {},(err) => {console.log('Error: %s', err);},
      () => {
        console.log("saved");
      }
    );
  }

}
