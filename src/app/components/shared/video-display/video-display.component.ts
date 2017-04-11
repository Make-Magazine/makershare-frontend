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
   introlink= false; 


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
    // console.log(this.link)
     this.introlink= true; 

     if (this.link) {
          if (this.youtube_parser(this.link)) {
            // console.log(this.youtube_parser(this.link));
            this.sanitizethis = '<iframe src="https://www.youtube.com/embed/' + this.youtube_parser(this.link) +' "frameborder="0" style="width:100%; height:270px;" ></iframe>';
            this.link = this.sanitizer.bypassSecurityTrustHtml(this.sanitizethis);
            // this.sanitizethis = "https://www.youtube.com/oembed?url=" + this.workshop.introductory_video;
            // this.http.get(this.sanitizethis).map(res => res.json()).subscribe(data => {
            //   this.workshop.introductory_video = this.sanitizer.bypassSecurityTrustHtml(data.html);
            // });

          }
          else if (this.vimeo_parser(this.link)) {
            this.sanitizethis = "https://vimeo.com/api/oembed.json?url=" + this.link;
            this.http.get(this.sanitizethis).map(res => res.json()).subscribe(data => {
             this.link = this.sanitizer.bypassSecurityTrustHtml(data.html);
            });
          }
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


}
