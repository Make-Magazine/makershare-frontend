import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators , FormControl , FormControlDirective , FormGroup} from '@angular/forms';


@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
})
export class CreateProjectComponent implements OnInit {
  
  current_active_tab;
  CreateProjectComponentValues = [];

  constructor() {}

  ngOnInit(): void {
    this.current_active_tab = 'Team';
  }

  FormUpdateHandler (event, Component){
    if(event){
      this.CreateProjectComponentValues[Component] =  {};
      this.CreateProjectComponentValues[Component] = event.value;
    }
     console.log(this.CreateProjectComponentValues);
  }
}
