import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import {
  NodeHelper,
  Organization,
  EntityProxy,
  FC_MakerMembership,
} from '../../../../core';
import { ViewService } from '../../../../core/d7services/view/view.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-org-form-about-us',
  templateUrl: './about-us.component.html',
})
export class AboutUsComponent implements OnInit {
  @Input() organizationForm: FormGroup;
  @Input() organizationProxy: EntityProxy;
  team: number[];
  selectedUser;
  searchFailed: boolean = false;

  constructor(
    private viewService: ViewService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit() {
    this.initFormArray('field_maker_memberships');
    this.setOrganizationOwner();
    this.setUserIDs();
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

  setUserIDs() {
    this.team = [];
    const users = this.organizationForm.value.field_maker_memberships;
    users.forEach(element => {
      if (!element.field_team_member) {
        return;
      }
      let uid = NodeHelper.GetUserIDFromFieldReferenceAutoComplete(
        element.field_team_member,
      );
      this.team.push(uid);
    });
  }

  // setAnonymous(name: string) {
  //   const formArray = <FormArray>this.organizationForm.controls['field_maker_memberships'];
  //   let usernameWithID = name;
  //   let currentUser = {
  //     field_team_member: usernameWithID,
  //     field_anonymous_member_name: '',
  //     field_membership_role: formArray.value[formArray.length-1].field_membership_role,
  //   };
  //   formArray.push(this.initGroup('field_maker_memberships', currentUser));
  // }

  addMember() {
    const formArray = <FormArray>this.organizationForm.controls[
      'field_maker_memberships'
    ];
    let usernameWithID =
      this.selectedUser.username + ' (' + this.selectedUser.uid + ')';
    let currentUser = {
      field_team_member: usernameWithID,
      field_anonymous_member_name: '',
      field_membership_role:
        formArray.value[formArray.length - 1].field_membership_role,
    };
    formArray.push(this.initGroup('field_maker_memberships', currentUser));
    this.setUserIDs();
    this.selectedUser = {};
  }

  initFormArray(fieldName: string) {
    const formArray = <FormArray>this.organizationForm.controls[fieldName];
    const entity = <Organization>this.organizationProxy.entity;
    entity
      .getField(fieldName, null, true)
      .forEach((element: FC_MakerMembership, index: number) => {
        formArray.push(this.initGroup(fieldName, element));
      });
  }

  setOrganizationOwner() {
    if (!this.organizationProxy.nid) {
      let usernameWithID =
        localStorage.getItem('user_name') +
        ' (' +
        localStorage.getItem('user_id') +
        ')';
      let currentUser = {
        field_team_member: usernameWithID,
        field_anonymous_member_name: '',
        field_membership_role: 'Admin',
      };
      const field_membership = <FormArray>this.organizationForm.controls
        .field_maker_memberships;
      field_membership.controls[0].patchValue(currentUser);
    }
    const formArray = <FormArray>this.organizationForm.controls[
      'field_maker_memberships'
    ];
    formArray.push(this.initGroup('field_maker_memberships'));
  }

  initGroup(fieldName: string, value?): FormGroup {
    switch (fieldName) {
      case 'field_maker_memberships':
        return this.formBuilder.group({
          field_team_member: [
            value ? value.getField('field_team_member').target_id : '',
            Validators.required,
          ],
          field_anonymous_member_name: [
            value ? value.getField('field_anonymous_member_name').value : '',
          ],
          field_membership_role: [
            value ? value.getField('field_membership_role').value : '',
          ],
        });
      default:
        return this.formBuilder.group({});
    }
  }

  removeMember(index: number) {
    const formArray = <FormArray>this.organizationForm.controls[
      'field_maker_memberships'
    ];
    formArray.removeAt(index);
  }
}
