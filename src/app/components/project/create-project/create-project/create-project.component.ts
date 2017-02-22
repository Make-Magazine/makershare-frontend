import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators , FormControl , FormControlDirective , FormGroup} from '@angular/forms';


@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {
  
  current_active_tab;

  constructor() {}

  ngOnInit(): void {
    this.current_active_tab = 'Your Story';
  }

  FormUpdateHandler (event, Component){
    if(event){
      console.log(event);
    }
  }
}
