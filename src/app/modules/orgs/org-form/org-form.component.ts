import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  organizationReady:boolean = false;

  organizationForm:FormGroup;
  
  constructor(
    private nodeService: NodeService,
    private fileService: FileService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit() {
    this.fileService;
    this.nodeService;

    this.organizationProxy.title = 'test change0';
    this.organizationProxy.body.value = 'new value';
    this.organizationProxy.field_breif_info.value = 'test';
    this.organizationProxy.field_orgs_logo.fid = 3617;
    this.organizationProxy.field_orgs_cover_photo.fid = 3618;
    this.organizationProxy.field_orgs_contact.email = 'example@bla.com';
    this.organizationProxy.field_minimum_number_of_follower.value = 4987;
    this.buildForm();
    this.organizationReady = true;
  }

  buildForm() {
    this.organizationForm = this.formBuilder.group({
      title: [this.organizationProxy.title, [Validators.required, Validators.maxLength(50)]],
      field_orgs_type: [this.organizationProxy.field_orgs_type, [Validators.required]],
      field_orgs_logo: [this.organizationProxy.field_orgs_logo, [Validators.required]],
      field_orgs_cover_photo: [this.organizationProxy.field_orgs_cover_photo, [Validators.required]],
      field_orgs_contact: [this.organizationProxy.field_orgs_contact.email, [Validators.required, Validators.email]],
      field_orgs_phone: [this.organizationProxy.field_orgs_phone.value, []],
      field_founder_name: [this.organizationProxy.field_founder_name.value, []],
      field_founded_date: [this.organizationProxy.field_founded_date, []],
      field_type_of_business: [this.organizationProxy.field_type_of_business.value, []],
      field_social_accounts: [this.formBuilder.array([])],
      field_website_blog: [this.organizationProxy.field_website_blog.value, []],
      field_orgs_address: [this.organizationProxy.field_orgs_address, []],
      field_minimum_number_of_follower: [this.organizationProxy.field_minimum_number_of_follower.value, []],
      field_breif_info: [this.organizationProxy.field_breif_info.value, []],
      body: [this.organizationProxy.body.value, []],
      field_maker_memberships: this.formBuilder.array([]),
      field_orgs_projects: [this.organizationProxy.field_orgs_projects],
    });
  }

  // Fires when clicking on publish button
  publishButtonClick() {
    console.log(this.organizationForm.value);
    // console.log(this.organizationProxy);
    // this.nodeService.createNode(this.organizationProxy.entity).subscribe(data => {
    //   console.log(data);
    // });
  }
}
