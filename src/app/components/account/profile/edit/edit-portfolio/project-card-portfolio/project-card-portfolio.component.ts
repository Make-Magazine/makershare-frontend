import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProjectCardPortfolio } from '../../../../../../models/project/project-form/project';
import { NodeService } from '../../../../../../d7services/node/node.service'

@Component({
  selector: 'project-card-portfolio',
  templateUrl: './project-card-portfolio.component.html',
})
export class ProjectCardPortfolioComponent implements OnInit {

  @Input() type:string;
  @Input() Project:ProjectCardPortfolio;
  @Input() Visibility:number;
  @Output() emitter = new EventEmitter();

  constructor(
    private nodeService:NodeService
  ) { }

  ngOnInit() {
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

}
