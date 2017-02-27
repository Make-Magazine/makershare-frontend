import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators , FormControl , FormControlDirective , FormGroup} from '@angular/forms';
import { NodeService } from '../../../../d7services/node/node.service'


@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
})
export class CreateProjectComponent implements OnInit {
  
  current_active_tab;
  CreateProjectComponentValues = [];
  isvalid = [];

  constructor(
    private nodeService:NodeService,
  ) {}

  ngOnInit(): void {
    this.current_active_tab = 'Your Story';
  }

  CheckFormValidationAndNavigate(NewTab){
    if(this.isvalid[this.current_active_tab]){
      this.current_active_tab = NewTab;
    }else{
      this.current_active_tab = NewTab;
    }
  }

  FormUpdateHandler (event, Component){
    this.isvalid[Component] = event.valid;
    this.CreateProjectComponentValues[Component] =  {};
    this.CreateProjectComponentValues[Component] = event.value;
    if(!event.valid){
      this.CheckFormValidations(event,Component);
    }
  }

  CheckFormValidations(event,Component){
    let Tempevent = event.controls;
    for(let index in Tempevent){
      let element = Tempevent[index];
      console.log(element);
      if(!element.valid){
        this.CreateProjectComponentValues[Component][index].setValue();
      }
    }
  }

  SaveProjectClick(Visibility,Status){
    if(this.ValidProjectReady()){
      // var project = this.GettingProjectReady(Visibility,Status);
      // this.SaveProject(project);
    }else{
      console.log("Project Not Ready to save");
    }
  }

  // GettingProjectReady(Visibility,Status): Project{
    
   // return project;
  // }

  ValidProjectReady():Boolean{
    if(!this.isvalid['Your Story'] || !this.isvalid['How To'] || !this.isvalid['Team']){
      return false;
    }
    for(let page in this.isvalid){
      if(!this.isvalid[page]){
        return false;
      }
    }
    return true;
  }

  SaveProject(project){

  }
}
