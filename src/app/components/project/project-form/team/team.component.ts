import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation'
import { ViewService } from '../../../../d7services/view/view.service'
import { UserService } from '../../../../d7services/user/user.service'
import { ProjectForm } from '../../../../models';
import { field_collection_item_member }  from '../../../../models';
import { Observable } from 'rxjs/Observable';
import { NodeHelper } from '../../../../models';
import { UserInvitations } from '../../../../models';

@Component({
  selector: 'app-project-form-team',
  templateUrl: './team.component.html',
})
export class TeamComponent implements OnInit {
  @Output() emitter = new EventEmitter();
  @Output() CanNavigate = new EventEmitter();
  @Input('project') project: ProjectForm;
  @Input('FormPrintableValues') FormPrintableValues;

  InvitationEmails:UserInvitations;
  TeamForm: FormGroup;
  SelectedUser = [];
  searchFailed = false;
  EmailValid = true;

  constructor(
    private fb: FormBuilder,
    private viewService:ViewService,
    private userService:UserService,
  ) {}


  search = (text$: Observable<string>) =>{
    return text$
      .debounceTime(300)
      .distinctUntilChanged()
      .do(() => this.searchFailed = false)
      .switchMap((term) => 
        {
          if(term.length > 1){
            return this.viewService.getView('maker_profile_search_data',[['email', term]])
            .map(result => {
              if(result.length == 0){
                this.searchFailed = true;
              }
              return result;
            })
          }
          return [];
        }
      )
  };

  ngOnInit() {
    this.InvitationEmails = this.FormPrintableValues.InvitationEmails;
    this.buildForm();
    let uid = NodeHelper.GetUserIDFromFieldReferenceAutoComplete(this.project.field_maker_memberships.und[0].field_team_member.und[0].target_id);
    this.InvitationEmails = new UserInvitations(uid, this.project.nid);
    setTimeout(function(){
       $("html,body").animate({scrollTop: 0}, "slow");
    }, 0);
  }
  
  buildForm(): void {
    this.TeamForm = this.fb.group({
      'field_maker_memberships': this.fb.array([]),
    });
    this.project.field_maker_memberships.und.forEach((member,index)=>{
      this.AddRow('field_maker_memberships',member);
      if(!NodeHelper.IsEmail(member.field_team_member.und[0].target_id)){
        let id = NodeHelper.GetUserIDFromFieldReferenceAutoComplete(member.field_team_member.und[0].target_id);
        this.SetMember(id,index);
      }else{
        this.SetMember(0,index,member.field_team_member.und[0].target_id);
      }
    });
    this.TeamForm.valueChanges.subscribe(data => {
      if(this.TeamForm.dirty && this.TeamForm.touched){
        this.CanNavigate.emit(false);
      }
      this.onValueChanged(this.TeamForm, this.formErrors,this.validationMessages);
      this.emitter.emit(this.InvitationEmails);
    });
    this.onValueChanged(this.TeamForm, this.formErrors, this.validationMessages);
  }

  AddRow(ControlName,data?) {
    const control = <FormArray>this.TeamForm.controls[ControlName];
    let index = control.length + 1;
    const addrCtrl = this.InitRow(ControlName,index,data);
    control.push(addrCtrl); 
    this.formErrors[ControlName].push(this.GetErrorStructure(ControlName)); 
  }

  SetMember(uid,index,email?){
    const control = this.TeamForm.controls['field_maker_memberships']['controls'][index];
    if(email){
      this.SelectedUser[index] = {invitation:true,email:email};
      control['controls'].uid.setValue(0);
      control['controls'].field_team_member.setValue(email);
      this.SetValueChangeSubscriber(index,control);
    }else{
      this.viewService.getView('maker_profile_card_data',[['uid',uid]]).subscribe(data => {
        data.uid = uid;
        this.SelectedUser[index] = data[0];
        control['controls'].uid.setValue(data.uid);
        control['controls'].field_team_member.setValue(data[0].username+' ('+data.uid+')');
        this.SetValueChangeSubscriber(index,control,data);
    });
  }
}

  SetValueChangeSubscriber(index,control,data?){
    let member:field_collection_item_member = {
      field_team_member:{und:[{target_id:control['controls'].field_team_member.value}]},
      field_membership_role:{und:[{value:control['controls'].field_membership_role.value}]}
    };
    if(!this.project.field_maker_memberships.und[index]){
      this.project.field_maker_memberships.und.push(member);
    }
    // control.valueChanges.subscribe(values => {
    //   if(this.project.field_maker_memberships.und[values.field_sort_order - 1].field_membership_role.und){
    //     this.project.field_maker_memberships.und[values.field_sort_order - 1].field_membership_role.und[0].value = values.field_membership_role;
    //   }else{
    //     this.project.field_maker_memberships.und[values.field_sort_order - 1].field_membership_role = {und:[{value:''}]};
    //   }
    // });
  }
  InitRow(ControlName,index,data?) {
    return this.fb.group({
      'field_team_member': ['', Validators.required],
      'field_membership_role': [data && data.field_membership_role && data.field_membership_role.und? data.field_membership_role.und[0].value:'',
      Validators.maxLength(140)],
      'uid': [, Validators.required],
    });
  }
  onValueChanged(form, formErrors, validationMessages) {
    for (const field in formErrors) {
      if(typeof formErrors[field] === 'string'){
        formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = validationMessages[field];
          for (const key in control.errors) {
            formErrors[field] += messages[key] + ' ';
          }
        }
      }else{
        form.get(field).controls.forEach((element, index) => {
          this.onValueChanged(element,formErrors[field][index] ,validationMessages[field]);
        });
      }
    }
  }
  RemoveRow(i: number,ControlName) {
    const control = <FormArray>this.TeamForm.controls[ControlName];
    let email = control.value[i].field_team_member;
    if(NodeHelper.IsEmail(email)){
      this.InvitationEmails.mails.splice(this.InvitationEmails.mails.indexOf(email) ,1)
    }
    control.removeAt(i);
    this.formErrors[ControlName].splice(i, 1);
    this.project[ControlName].und.splice(i, 1);
    this.SelectedUser.splice(i,1);
  }
  GetErrorStructure(ControlName?) : Object {
    return {'field_team_member': '','uid': '','field_membership_role':''};
  }
  formErrors = {
    'field_maker_memberships': [],
  };
   /**
    * Validation messages object contains all error messages for each field
    * each field has multiple validations for each error
    * @see https://angular.io/docs/ts/latest/cookbook/form-validation.html
    */
  validationMessages = {
    'field_maker_memberships': {
      'field_team_member':{
        'required':'Name is required',
        'email':'Email address is not valid',
        'inarray':'Email already invited',
      },       
      'uid':{
        'required':'uid is required',
      },
      'field_membership_role':{
        'maxlength': 'Max length error'
      }
    },
  };

  /**
   * Invite new users to join the project
   * @param input the input email html element
   * @param index current field collection index
   */
  InviteUser(input:HTMLInputElement,index){
    if(NodeHelper.IsEmail(input.value)){
      if(this.InvitationEmails.mails.indexOf(input.value) !== -1){
        this.formErrors.field_maker_memberships[index].field_team_member = this.validationMessages.field_maker_memberships.field_team_member.inarray;
        this.EmailValid = false;
      }else{
        this.InvitationEmails.mails.push(input.value);
        this.formErrors.field_maker_memberships[index].field_team_member = '';
        this.EmailValid = true;// check
        this.SetMember(0,index,input.value);
      }
    }else{
      this.EmailValid = false;
      this.formErrors.field_maker_memberships[index].field_team_member = this.validationMessages.field_maker_memberships.field_team_member.email;
    }
  }

    sidebarText = {
    'team': {
      'title': 'Your Team:',
      'guide': 'If you worked on this project with other members of the community, this is the place to let everyone know. By putting their information here, this project will be shared across all of your portfolios. What to take ownership of your portion of the project, add that information to the Story of the project.'
      }
    }
}