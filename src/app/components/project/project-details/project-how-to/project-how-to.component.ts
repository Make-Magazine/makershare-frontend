import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-project-how-to',
  templateUrl: './project-how-to.component.html',
})
export class ProjectHowToComponent implements OnInit {
  @Input() project;
  @Input() projectInfo;
  constructor() { }

  ngOnInit() {
    //console.log(this.project.field_resources[0].resource_file)
  }

}
