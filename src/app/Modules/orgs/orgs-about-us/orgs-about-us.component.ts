import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-orgs-about-us',
  templateUrl: './orgs-about-us.component.html'
})
export class OrgsAboutUsComponent implements OnInit {

  @Input() description;
  trustedLink
  constructor(
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit() {
    // console.log(this.description)
    if (this.description) {
      for (let i = 0; i < this.description.videos.length; i++) {
        let link = this.description.videos[i].video;
        this.trustedLink = this.sanitizer.bypassSecurityTrustHtml(link);
        // console.log(this.trustedLink)
      }
    }
  }
}
