import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-orgs-about-us',
  templateUrl: './orgs-about-us.component.html'
})
export class OrgsAboutUsComponent implements OnInit {

  @Input() description;
  trustedLink
  test:boolean  = false
  constructor(
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit() {
    // console.log(this.description)
    if (this.description) {
      this.test = true
        let link = this.description;
        this.trustedLink = this.sanitizer.bypassSecurityTrustHtml(link);
        // console.log(this.description)
    }
  }
}