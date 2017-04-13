import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProjectCardPortfolio } from '../../../../../../models';
import { NodeService } from '../../../../../../d7services/node/node.service'
import { ViewService } from '../../../../../../d7services/view/view.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'project-card-portfolio',
  templateUrl: './project-card-portfolio.component.html',
})
export class ProjectCardPortfolioComponent implements OnInit {

  @Input() type:string;
  @Input() Project:ProjectCardPortfolio;
  @Input() Visibility:number;
  @Output() emitter = new EventEmitter();
  project
  constructor(
    private nodeService:NodeService,
    private viewService: ViewService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.viewService.getView('api-project-card', [['nid', this.Project.nid]]).subscribe(res => {
      this.project = res[0];
  });
  }

  DeleteProject(nid:number){
    this.nodeService.DeleteNode(nid).subscribe(data=>{
      this.emitter.emit();
    });
  }

  UpdateProjectVisibility(nid:number,NewVisibility:number){
    let project = {
      nid:nid,
      field_visibility2:{und:[NewVisibility]},
    }
    
    this.nodeService.UpdateNode(project).subscribe(data=>{
      this.emitter.emit();
    });
  }
  ShowProjectDetails(nid) {
    this.router.navigate(['/project/view/', nid]);
  }
}
