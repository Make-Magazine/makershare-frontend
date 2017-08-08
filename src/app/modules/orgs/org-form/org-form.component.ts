import { Component, OnInit } from '@angular/core';
import { Organization } from '../../../core/models';
import { FileService, NodeService } from '../../../core/d7services';

@Component({
  selector: 'app-org-form',
  templateUrl: './org-form.component.html'
})
export class OrgFormComponent implements OnInit {

  // Current active form tab, the default is Basic Info
  currentFormTab:string = 'Basic Info';
  organization: Organization = new Organization();
  
  constructor(private nodeService: NodeService, private fileService: FileService) {}

  ngOnInit() {
    this.fileService;
    // this.organization.title = 'new title';
    // let body = this.organization.getField("body");
  }

  // Fires when clicking on publish button
  publishButtonClick(){
    console.log(this.organization.title);
    this.nodeService.createNode(this.organization).subscribe(data => {
      console.log(data);
    });
  }
}
