import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation'
import { ViewService } from '../../../../d7services/view/view.service'
import { UserService } from '../../../../d7services/user/user.service'
import { Project } from '../../../../models/project/create-project/project';
import { field_collection_item_member }  from '../../../../models/project/create-project/field_collection_item';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
})
export class TeamComponent implements OnInit {
  @Input('project') project: Project;
  @Input('FormPrintableValues') FormPrintableValues;

  TeamForm: FormGroup;
  TeamUsers = [];
  UsersDetails = [];
  SelectedUser = [];

  constructor(
    private fb: FormBuilder,
    private viewService:ViewService,
    private userService:UserService,
  ) {}
  ngOnInit() {
    this.buildForm();
  }
  
  buildForm(): void {
    this.TeamForm = this.fb.group({
      'field_maker_memberships': this.fb.array([]),
    });
    this.project.field_maker_memberships.und.forEach((member,index)=>{
      this.AddRow('field_maker_memberships',member);
      let id = this.GetUserIDFromFieldReferenceAutoComplete(member.field_team_member.und[0].target_id);
      this.SetMember(id,index);
    });
    this.TeamForm.valueChanges.subscribe(data => {
      this.TeamUsers = [];
      this.onValueChanged(this.TeamForm, this.formErrors,this.validationMessages);
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

  GetUserIDFromFieldReferenceAutoComplete(UsernameAndId:string){
    return UsernameAndId.match(/\(([^)]+)\)/)[1];
  }

  SetMember(uid,index){
    this.TeamUsers[index] = [];
    this.UsersDetails[index] = [];
    const control = this.TeamForm.controls['field_maker_memberships']['controls'][index];
    this.viewService.getView('maker_profile_card_data',[['uid',uid],]).subscribe(data => {
      this.SelectedUser[index] = data[0];
      control['controls'].uid.setValue(uid);
      control['controls'].field_team_member.setValue(data[0].username+' ('+uid+')');
      control['controls'].field_sort_order.setValue(index+1);
      let member:field_collection_item_member = {
        field_team_member:{und:[{target_id:data[0].username+' ('+uid+')'}]},
        field_sort_order:{und:[{value:index+1}]},
        field_membership_role:{und:[{value:control['controls'].field_membership_role.value}]}
      };
      if(!this.project.field_maker_memberships.und[index]){
        this.project.field_maker_memberships.und.push(member);
      }
      control.valueChanges.subscribe(values => {
        this.project.field_maker_memberships.und[values.field_sort_order - 1].field_membership_role.und[0].value = values.field_membership_role;
        this.project.field_maker_memberships.und[values.field_sort_order - 1].field_sort_order.und[0].value = values.field_sort_order;
      });
    });
  }
  RefreshUsers(index,value){
    this.TeamUsers[index] = [];
    if(value.length > 1){
      this.viewService.getView('maker_profile_search_data',[['search', value]]).subscribe(data => {
        this.TeamUsers[index] = data;
        var TempUsers = [];
        for(let index in data){
          var found = false;
          let element = data[index]; 
          this.SelectedUser.forEach(addeduser => {
            if(addeduser.uid === element.uid){
              found = true;
              return;
            }
          });
           if (!found){
             TempUsers.push(element);
           }
        }
        this.TeamUsers[index] = TempUsers;
      });
    }
  }
  InitRow(ControlName,index,data?) {
    return this.fb.group({
      'field_sort_order':[index,[CustomValidators.number, Validators.required, CustomValidators.min(1)]],
      'field_team_member': ['', Validators.required],
      'field_membership_role': [data? data.field_membership_role.und[0].value:''],
      'uid': [, Validators.required],
    });
  }
  SortElements(ControlName){
    const control = <FormArray>this.TeamForm.controls[ControlName];
    var NewUsersDetails = [];
    control.controls.forEach((element, index) => {
      NewUsersDetails[index] = this.SelectedUser[element['controls']['field_sort_order'].value - 1];
      element['controls']['field_sort_order'].setValue(index + 1);
    });
    this.SelectedUser = NewUsersDetails;
  }
  onValueChanged(form, formErrors, validationMessages) {
    // console.log(this.TeamForm)
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
  ChangeOrder(CurrentIndex, NewIndex, ControlName){
    const control = <FormArray>this.TeamForm.controls[ControlName];
    let currentrow = control.at(CurrentIndex);
    let newrow = control.at(NewIndex);
    control.setControl(CurrentIndex,newrow);
    control.setControl(NewIndex,currentrow);
    this.SortElements(ControlName);
  }
  RemoveRow(i: number,ControlName) {
    const control = <FormArray>this.TeamForm.controls[ControlName];
    control.removeAt(i);
    this.formErrors[ControlName].splice(i, 1);
    this.project[ControlName].und.splice(i, 1);
    this.SortElements(ControlName);
  }
  GetErrorStructure(ControlName?) : Object {
    return {'field_sort_order':'', 'field_team_member': ''};
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
      'field_sort_order':{
        'number':'Sort order must be a number.',
        'required':'Sort order is required',
        'min':'Sort order must be at least 1.',
      },
      'field_team_member':{
        'required':'Name is required',
      },       
      'uid':{
        'required':'uid is required',
      },
    },
  };
}