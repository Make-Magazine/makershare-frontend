import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { FieldCollectionItemMember, NodeHelper, ProjectForm, UserInvitations } from '../../../../core';
import { ViewService } from '../../../../core/d7services';

@Component({
  selector: 'app-project-form-team',
  templateUrl: './team.component.html',
})
export class TeamComponent implements OnInit {
  @Output() emitter = new EventEmitter();
  @Output() CanNavigate = new EventEmitter();
  @Input('project') project: ProjectForm;
  @Input('FormPrintableValues') FormPrintableValues;

  InvitationEmails: UserInvitations;
  TeamForm: FormGroup;
  SelectedUser = [];
  searchFailed = false;
  EmailValid = true;
  ValidEmailAddress: boolean;

  sidebarText = {
    team: {
      title: 'Your Team:',
      guide:
        'Enter any members of the community who worked on this project with you. This project will also appear in their portfolios. Everyone’s roles on the project can be detailed as much as desired. The Admin is the only team member allowed to add additional members to the team.',
    },
  };

  formErrors = {
    field_maker_memberships: [],
  };

  /**
   * Validation messages object contains all error messages for each field
   * each field has multiple validations for each error
   * @see https://angular.io/docs/ts/latest/cookbook/form-validation.html
   */
  validationMessages = {
    field_maker_memberships: {
      field_team_member: {
        required: 'Name is required',
        email: 'Email address is not valid',
        inarray: 'Email already invited',
      },
      uid: {
        required: 'uid is required',
      },
      field_membership_role: {
        maxlength: 'Max length error',
      },
    },
  };

  constructor(private fb: FormBuilder, private viewService: ViewService) {}

  formatter = x => {
    if (x.username) {
      return x.username;
    }
    return x;
  };

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
                if (NodeHelper.IsEmail(term)) {
                  this.ValidEmailAddress = true;
                } else {
                  // false;
                }
              }
              return result;
            });
        }
        return [];
      });
  };

  ngOnInit() {
    this.InvitationEmails = this.FormPrintableValues.InvitationEmails;
    this.buildForm();
    const uid = NodeHelper.GetUserIDFromFieldReferenceAutoComplete(
      this.project.field_maker_memberships.und[0].field_team_member.und[0]
        .target_id,
    );
    this.InvitationEmails = new UserInvitations(
      uid,
      this.project.GetField('nid'),
    );
    setTimeout(function() {
      //  $("html,body").animate({scrollTop: 0}, "slow");
    }, 0);
  }

  buildForm(): void {
    this.TeamForm = this.fb.group({
      field_maker_memberships: this.fb.array([]),
    });
    this.project.field_maker_memberships.und.forEach((member, index) => {
      this.AddRow('field_maker_memberships', member);
      if (
        member.field_anonymous_member_name &&
        member.field_anonymous_member_name.und &&
        member.field_anonymous_member_name.und[0].value
      ) {
        this.SetAnonymous(
          member.field_anonymous_member_name.und[0].value,
          index,
        );
      } else {
        if (!NodeHelper.IsEmail(member.field_team_member.und[0].target_id)) {
          const id = NodeHelper.GetUserIDFromFieldReferenceAutoComplete(
            member.field_team_member.und[0].target_id,
          );
          this.SetMember(id, index);
        } else {
          this.SetMember(0, index, member.field_team_member.und[0].target_id);
        }
      }
    });
    this.TeamForm.valueChanges.subscribe(data => {
      if (this.TeamForm.dirty && this.TeamForm.touched) {
        this.CanNavigate.emit(false);
      }
      this.onValueChanged(
        this.TeamForm,
        this.formErrors,
        this.validationMessages,
      );
      this.emitter.emit(this.InvitationEmails);
    });
    this.onValueChanged(
      this.TeamForm,
      this.formErrors,
      this.validationMessages,
    );
  }

  AddRow(ControlName, data?) {
    const control = <FormArray>this.TeamForm.controls[ControlName];
    const index = control.length + 1;
    const addrCtrl = this.InitRow(ControlName, index, data);
    control.push(addrCtrl);
    this.formErrors[ControlName].push(this.GetErrorStructure(ControlName));
  }

  SetMember(uid, index, email?) {
    const control = this.TeamForm.controls['field_maker_memberships'][
      'controls'
    ][index];
    if (email) {
      this.SelectedUser[index] = { invitation: true, email: email };
      control['controls'].uid.setValue(0);
      control['controls'].field_team_member.setValue(email);
      this.SetValueChangeSubscriber(index, control);
    } else {
      this.viewService
        .getView('maker_profile_card_data', [['uid', uid]])
        .subscribe(data => {
          data.uid = uid;
          this.SelectedUser[index] = data[0];
          control['controls'].uid.setValue(data.uid);
          control['controls'].field_team_member.setValue(
            data[0].username + ' (' + data.uid + ')',
          );
          this.SetValueChangeSubscriber(index, control, data);
        });
    }
  }

  SetAnonymous(name, index) {
    const control = this.TeamForm.controls['field_maker_memberships'][
      'controls'
    ][index];
    this.SelectedUser[index] = { anonymous: true, name: name };
    control['controls'].uid.setValue(0);
    control['controls'].field_anonymous_member_name.setValue(name);
    this.SetValueChangeSubscriber(index, control);
    this.searchFailed = false;
  }

  SetValueChangeSubscriber(index, control, data?) {
    const member: FieldCollectionItemMember = {
      field_anonymous_member_name: {
        und: [{ value: control['controls'].field_anonymous_member_name.value }],
      },
      field_membership_role: {
        und: [{ value: control['controls'].field_membership_role.value }],
      },
      field_team_member: {
        und: [{ target_id: control['controls'].field_team_member.value }],
      },
    };
    // console.log(member);
    if (!this.project.field_maker_memberships.und[index]) {
      this.project.field_maker_memberships.und.push(member);
    }
    control.valueChanges.subscribe(values => {
      this.project.field_maker_memberships.und[
        index
      ].field_membership_role.und[0] = { value: values.field_membership_role };
    });
  }

  InitRow(ControlName, index, data?) {
    return this.fb.group({
      field_anonymous_member_name: [''],
      field_team_member: ['', Validators.required],
      field_membership_role: [
        data && data.field_membership_role && data.field_membership_role.und
          ? data.field_membership_role.und[0].value
          : '',
        Validators.maxLength(140),
      ],
      uid: [],
    });
  }

  onValueChanged(form, formErrors, validationMessages) {
    for (const field in formErrors) {
      if (typeof formErrors[field] === 'string') {
        formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = validationMessages[field];
          for (const key in control.errors) {
            formErrors[field] += messages[key] + ' ';
          }
        }
      } else {
        form.get(field).controls.forEach((element, index) => {
          this.onValueChanged(
            element,
            formErrors[field][index],
            validationMessages[field],
          );
        });
      }
    }
  }

  RemoveRow(i: number, ControlName) {
    const control = <FormArray>this.TeamForm.controls[ControlName];
    const email = control.value[i].field_team_member;
    if (NodeHelper.IsEmail(email)) {
      this.InvitationEmails.mails.splice(
        this.InvitationEmails.mails.indexOf(email),
        1,
      );
    }
    control.removeAt(i);
    this.formErrors[ControlName].splice(i, 1);
    this.project[ControlName].und.splice(i, 1);
    this.SelectedUser.splice(i, 1);
  }

  GetErrorStructure(ControlName?): Object {
    return { field_team_member: '', uid: '', field_membership_role: '' };
  }

  /**
   * Invite new users to join the project
   * @param input the input email html element
   * @param index current field collection index
   */
  InviteUser(input: HTMLInputElement, index) {
    if (NodeHelper.IsEmail(input.value)) {
      if (this.InvitationEmails.mails.indexOf(input.value) !== -1) {
        this.formErrors.field_maker_memberships[
          index
        ].field_team_member = this.validationMessages.field_maker_memberships.field_team_member.inarray;
        this.EmailValid = false;
      } else {
        this.InvitationEmails.mails.push(input.value);
        this.formErrors.field_maker_memberships[index].field_team_member = '';
        this.EmailValid = true; // check
        this.SetMember(0, index, input.value);
      }
    } else {
      this.EmailValid = false;
      this.formErrors.field_maker_memberships[
        index
      ].field_team_member = this.validationMessages.field_maker_memberships.field_team_member.email;
    }
  }
}
