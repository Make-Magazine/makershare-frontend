import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Organization, EntityProxy, NodeHelper } from '../../../../core';
import { ViewService } from '../../../../core/d7services/view/view.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-org-form-about-us',
  templateUrl: './about-us.component.html'
})
export class AboutUsComponent implements OnInit {

  @Input() organizationForm: FormGroup;
  @Input() organizationProxy: EntityProxy;
  team: {
    usernameOrUID: string | number,
    anonymous: boolean
  }[] = [];
  selectedUser;
  searchFailed: boolean = false;
  fixFormReady: boolean = false;

  constructor(
    private viewService: ViewService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    const field_maker_memberships = <FormArray>this.organizationForm.controls.field_maker_memberships;
    if(field_maker_memberships.length == 0) {
      const organization = <Organization>this.organizationProxy.entity;
      const members = organization.getField("field_maker_memberships", null, true);
      members.forEach(element => {
        this.addRow(element);
      });
      this.addRow();
    }
    this.setSelectedUsers();
  }

  search = (text$: Observable<string>) => {
    return text$
      .debounceTime(300)
      .distinctUntilChanged()
      .do(() => (this.searchFailed = false))
      .switchMap(term => {
        if (term.length > 1) {
          return this.viewService
            .getView('maker_profile_search_data', [
              ['combine', term],
              ['mail', term],
              ['field_last_name_value', term],
              ['field_full_name_value', term],
            ])
            .map(result => {
              if (result.length == 0) {
                this.searchFailed = true;
              }
              return result;
            });
        }
        return [];
      });
  };

  formatter = x => {
    if (x.username) {
      return x.username;
    }
    return x;
  };

  setSelectedUsers() {
    const field_maker_memberships = this.organizationForm.value.field_maker_memberships;
    field_maker_memberships.forEach((member, index) => {
      if(NodeHelper.isEmpty(member)) {
        return;
      }
      this.addSelectedUser(member);
    });
  }

  addSelectedUser(user) {
    var usernameOrUID;
    var anonymous = false;
    if(user.field_anonymous_member_name) {
      usernameOrUID = user.field_anonymous_member_name;
      anonymous = true;
    } else {
      usernameOrUID = NodeHelper.GetUserIDFromFieldReferenceAutoComplete(user.field_team_member);
    }
    let member = {
      usernameOrUID: usernameOrUID,
      anonymous: anonymous,
    };
    this.team.push(member);
  }

  addRow(data?) {
    const self = this;
    this.fixFormReady = false;
    this.searchFailed = false;
    delete this.selectedUser;
    const control = <FormArray>this.organizationForm.controls['field_maker_memberships'];
    const addrCtrl = this.initRow(data);
    control.push(addrCtrl);
    setTimeout(function() {
      self.fixFormReady = true;
    }, 0);
  }

  setMember() {
    const field_maker_memberships = <FormArray>this.organizationForm.controls['field_maker_memberships'];
    let lastIndex = field_maker_memberships.length - 1;
    let nameWithID = this.selectedUser.username + ' (' + this.selectedUser.uid + ')';
    const lastControl = <FormGroup>field_maker_memberships.controls[lastIndex];
    lastControl.controls.field_team_member.setValue(nameWithID);
    this.addSelectedUser(lastControl.value);
    this.addRow();
  }

  setAnonymous(name) {
    const field_maker_memberships = <FormArray>this.organizationForm.controls['field_maker_memberships'];
    let lastIndex = field_maker_memberships.length - 1;
    const lastControl = <FormGroup>field_maker_memberships.controls[lastIndex];
    lastControl.controls.field_anonymous_member_name.setValue(name);
    this.addSelectedUser(lastControl.value);
    this.addRow();
  }

  initRow(data?) {
    return this.formBuilder.group({
      field_anonymous_member_name: [data? data.getField('field_anonymous_member_name').value: '', ],
      field_team_member: [data? data.getField('field_team_member').target_id: '', ],
      field_membership_role: [data? data.getField('field_membership_role').value: '', Validators.maxLength(140)],
    });
  }

  removeRow(i: number, controlName: string) {
    const control = <FormArray>this.organizationForm.controls[controlName];
    control.removeAt(i);
    this.team.splice(i, 1);
  }

}
