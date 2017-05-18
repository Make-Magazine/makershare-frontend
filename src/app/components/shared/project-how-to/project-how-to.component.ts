import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-project-how-to',
  templateUrl: './project-how-to.component.html',
})
export class ProjectHowToComponent implements OnInit {
  @Input() project;
  @Input() projectInfo;
  constructor(
    private sanitizer:DomSanitizer,
  ) { }

  ngOnInit() {
    // console.log(this.project.field_how_to);
    if(this.project.field_how_to){
      this.project.field_how_to.value = this.project.field_story.value = this.sanitizer.bypassSecurityTrustHtml(this.project.field_story.value);
    }
  }

}
