import { Component, OnInit } from '@angular/core';
import { Organization, EntityProxy } from '../../../core/models';
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
    this.organizationProxy.body.value = 'new value';
    this.organizationProxy.field_breif_info.value = 'test';
    this.organizationProxy.field_orgs_logo.fid = 3617;
    this.organizationProxy.field_orgs_cover_photo.fid = 3618;
    this.organizationProxy.field_orgs_contact.email = 'example@bla.com';
    this.organizationProxy.field_minimum_number_of_follower.value = 4987;
  }

  // Fires when clicking on publish button
  publishButtonClick(){
    console.log(this.organizationProxy);
    this.nodeService.createNode(this.organizationProxy.entity).subscribe(data => {
      console.log(data);
    });
  }
}
