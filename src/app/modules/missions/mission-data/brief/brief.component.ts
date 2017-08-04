import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-brief',
  templateUrl: './brief.component.html',
})
export class BriefComponent implements OnInit {
  @Input() projects;
  @Input() challenge;
  briefContent;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.briefContent = this.sanitizer.bypassSecurityTrustHtml(
      this.challenge.brief,
    );
  }
}
