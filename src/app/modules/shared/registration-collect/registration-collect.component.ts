import { Component, OnInit, Input   } from '@angular/core';

@Component({
  selector: 'app-registration-collect',
  templateUrl: './registration-collect.component.html',
  styleUrls: ['./registration-collect.component.css']
})
export class RegistrationCollectComponent implements OnInit {
  showForm: boolean = false;
  @Input() registrationFormState: string;
  constructor(
  ) {
    
   }

  ngOnInit() {
    // console.log(this.registrationFormState);
    if(this.registrationFormState && this.registrationFormState.length > 0){
      this.showForm = true;
    }
    
  }
  
}
