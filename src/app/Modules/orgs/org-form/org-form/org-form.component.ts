import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-org-form',
  templateUrl: './org-form.component.html'
})
export class OrgFormComponent implements OnInit {

  // Current active form tab, the default is Basic Info
  CurrentFormTab:string = 'Basic Info';

  constructor() { }

  ngOnInit() {
  }

  // Fires when clicking on publish button
  PublishButtonPressed(){
    console.log("saving org");
  }

}
