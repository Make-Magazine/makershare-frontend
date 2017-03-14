import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
})
export class ProjectCardComponent implements OnInit {
@Input() projectCard;
  constructor() { }

  ngOnInit() {
  }

}
