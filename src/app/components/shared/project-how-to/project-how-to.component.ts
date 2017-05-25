import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-project-how-to',
  templateUrl: './project-how-to.component.html',
})
export class ProjectHowToComponent implements OnInit {
  @Input() project;
  @Input() projectInfo;
  howto = false;
  trustedLink;
  constructor(
    private sanitizer:DomSanitizer,
  ) { }

  ngOnInit() {
    if(this.project.field_how_to){
      this.howto = true;
      let link = this.project.field_how_to.value;
      this.trustedLink = this.sanitizer.bypassSecurityTrustHtml(link);
    }
  }

}
