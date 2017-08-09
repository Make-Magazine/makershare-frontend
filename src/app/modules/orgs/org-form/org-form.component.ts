import { Component, OnInit } from '@angular/core';
import { Organization, EntityProxy, FieldText } from '../../../core/models';
import { FileService, NodeService } from '../../../core/d7services';

@Component({
  selector: 'app-org-form',
  templateUrl: './org-form.component.html'
})
export class OrgFormComponent implements OnInit {

  // Current active form tab, the default is Basic Info
  currentFormTab:string = 'Basic Info';
  organizationProxy = new EntityProxy(new Organization());
  
  constructor(private nodeService: NodeService, private fileService: FileService) {}

  ngOnInit() {
    this.fileService;
    this.organizationProxy.title = 'test change0';
    this.organizationProxy.body.value = "new value";
    let text = new FieldText("formated_html");
    text.value = "my new value";
    this.organizationProxy.body = text;
  }

  // Fires when clicking on publish button
  publishButtonClick(){
    console.log(this.organizationProxy);
    this.nodeService.createNode(this.organizationProxy.entity).subscribe(data => {
      console.log(data);
    });
  }
}
