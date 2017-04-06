import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ViewService } from '../../../d7services/view/view.service';
import { DomSanitizer } from '@angular/platform-browser';
import { FlagService } from '../../../d7services/flag/flag.service';
import { UserService } from '../../../d7services/user/user.service';
import { Http } from '@angular/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-video-display',
  templateUrl: './video-display.component.html',

})
export class VideoDisplayComponent implements OnInit {
  customTitle: string;
  customDescription: string;
  customImage: string;
  objects;
  nid;
  uid;
  page: number = 1;
  links = [];
  sanitizethis;
  newLink: Object ;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private flagService: FlagService,
    private viewService: ViewService,
    private sanitizer: DomSanitizer,
    private http: Http,
    private modalService: NgbModal,
  ) { }
  @Input() link;

  ngOnInit() {
    console.log(this.link)
    if (this.youtube_parser(this.link)) {
       console.log (this.youtube_parser(this.link))
      this.sanitizethis = '<iframe src="https://www.youtube.com/embed/' + this.youtube_parser(this.link) + ' "frameborder="0" style="width:480px; height:270px;"></iframe>';
      this.newLink['link'] = this.sanitizer.bypassSecurityTrustHtml(this.sanitizethis);
      this.newLink['Pic'] = "https://img.youtube.com/vi/" + this.youtube_parser(this.link) + "/hqdefault.jpg";
      console.log (this.sanitizer.bypassSecurityTrustHtml(this.sanitizethis))
      console.log (this.newLink['Pic'])
    }
    else if (this.vimeo_parser(this.link)) {
      this.sanitizethis = "https://vimeo.com/api/oembed.json?url=" + this.link;
      this.http.get(this.sanitizethis).map(res => res.json()).subscribe(data => {
        this.link.link = this.sanitizer.bypassSecurityTrustHtml(data.html);
        this.link.Image = data.thumbnail_url_with_play_button;
      });
    }
  }

  youtube_parser(url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    return (match && match[7].length == 11) ? match[7] : '';
  }
  vimeo_parser(url) {
    var regExp = /^.*(vimeo\.com\/)((channels\/[A-z]+\/)|(groups\/[A-z]+\/videos\/))?([0-9]+)/;
    var match = url.match(regExp);
    return match[5];

  }

  // youtube_checker(link) {
  //   this.youtube_parser(link);

  //   this.sanitizethis = '<iframe src="https://www.youtube.com/embed/' + this.youtube_parser(link) + ' "frameborder="0" style="width:480px; height:270px;"></iframe>';
  //   this.link.videolink = this.sanitizer.bypassSecurityTrustHtml(this.sanitizethis);
  //   console.log(this.link.videolink)
  //   this.link.videoPic = "https://img.youtube.com/vi/" + this.youtube_parser(link) + "/hqdefault.jpg";
  // }

}
