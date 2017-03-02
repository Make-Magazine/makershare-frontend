import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation'
import { ViewService } from '../../../../d7services/view/view.service'
import { UserService } from '../../../../d7services/user/user.service'
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
})
export class TeamComponent implements OnInit {
  @Output() Team = new EventEmitter();
  @Input('TeamValues') TeamValues;
  TeamForm: FormGroup;
  TeamUsers = [];
  UsersDetails = [];
  SelectedUser=[];

    public continents = [{
      id: 1,
      name: 'Asia',
      population: '4,157,300,000'
    }, {
      id: 2,
      name: 'Africa',
      population: '1,030,400,000'
    }, {
      id: 3,
      name: 'Europe',
      population: '738,600, 000'
    }, {
      id: 4,
      name: 'North America',
      population: '461,114,000'
    }, {
      id: 5,
      name: 'South America',
      population: '390,700,000'
    }, {
      id: 6,
      name: 'Australia',
      population: '36,700,000'
    }, {
      id: 7,
      name: 'Antartica',
      population: 0
    }
    ];

  constructor(
    private fb: FormBuilder,
    private viewService:ViewService,
    private userService:UserService,
    private _sanitizer: DomSanitizer
  ) {}


  ngOnInit() {
    this.buildForm();
    // this.UsersDetails.forEach(element => {
    //     console.log(element);
    // });
    console.log(this.TeamForm.controls);
  }

  autocompleListFormatter = (data: any) : SafeHtml => {
    let html = `<span>${data.name}</span>`;
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }
  
  buildForm(): void {
    this.TeamForm = this.fb.group({
      'Team': this.fb.array([]),
      'continent': ''
    });
    this.AddRow('Team');
    
    this.userService.getStatus().subscribe(data => {  
      this.SetMember(data.user.uid,0);
      if(this.TeamValues){
        // console.log(this.TeamValues);
          var length = this.TeamValues.Team.length;
          // console.log(length);
          for(var i = 1 ;i < length; i++){
            this.AddRow('Team');
            this.SetMember( this.TeamValues.Team[i].uid,i);
            // this.SetMember(element.,index+1))
          }
        this.TeamForm.setValue(this.TeamValues);  
      } else {
        this.AddRow('Team');
      }
      this.TeamForm.valueChanges.subscribe(data => {
        this.TeamUsers = [];
        this.onValueChanged(this.TeamForm, this.formErrors,this.validationMessages);
        if(this.TeamForm.valid){
          this.Team.emit(this.TeamForm);
        }else{
          this.Team.emit(false);
        }
      });
    this.onValueChanged(this.TeamForm, this.formErrors, this.validationMessages);
  });
}

  AddRow(ControlName) {
    const control = <FormArray>this.TeamForm.controls[ControlName];
    let index = control.length + 1;
    const addrCtrl = this.InitRow(ControlName,index);
    control.push(addrCtrl); 
    this.formErrors[ControlName].push(this.GetErrorStructure(ControlName)); 
  }

  SetMember(uid,index){
    this.TeamUsers[index] = [];
    this.UsersDetails[index] = [];
    this.viewService.getView('maker_profile_card_data',[['uid',uid],]).subscribe(data => {
      this.SelectedUser[index] = data[0];
      // this.SelectedUser.forEach((element,key) => {
      //   var values =[];
      //   values = element;
        // for (let key of Object.keys(values)){
        //   console.log(key +'=>'+values[key])
        // }
      // });
    });

  // this.viewService.getView('maker_profile_card_data',[['uid',uid],]).subscribe(data => {
  //     this.SelectedUser[index] = data[0];
  //     // this.SelectedUser.forEach((element,key) => {
  //     //   var values =[];
  //     //   values = element;
  //       // for (let key of Object.keys(values)){
  //       //   console.log(key +'=>'+values[key])
  //       // }
  //     // });
  //   });

    this.TeamForm.controls['Team']['controls'][index]['controls'].uid.setValue(uid);
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

  InitRow(ControlName,index) {
    return this.fb.group({
      'SortOrder':[index,[CustomValidators.number, Validators.required, CustomValidators.min(1)]],
      'Name': ['', ],
      'Role': ['', Validators.required],
      'uid': [0, Validators.required],
    });
  }

  SortElements(ControlName){
    const control = <FormArray>this.TeamForm.controls[ControlName];
    var NewUsersDetails = [];
    control.controls.forEach((element, index) => {
      NewUsersDetails[index] = this.SelectedUser[element['controls']['SortOrder'].value - 1];
      element['controls']['SortOrder'].setValue(index + 1);
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
    this.SortElements(ControlName);
  }

  GetErrorStructure(ControlName?) : Object {
    return {'SortOrder':'', 'Name': '','Role': ''};
  }

  formErrors = {
    'Team': [],
  };

   /**
    * Validation messages object contains all error messages for each field
    * each field has multiple validations for each error
    * @see https://angular.io/docs/ts/latest/cookbook/form-validation.html
    */
  validationMessages = {
    'Team': {
      'SortOrder':{
        'number':'Sort order must be a number.',
        'required':'Sort order is required',
        'min':'Sort order must be at least 1.',
      },
      'Name':{
        'required':'Name is required',
      },       
      'Role':{
        'required':'Role is required',
      },
      'uid':{
        'required':'uid is required',
      },
    },
  };

}
