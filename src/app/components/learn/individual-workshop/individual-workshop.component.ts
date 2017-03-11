import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ViewService } from '../../../d7services/view/view.service';
import { DomSanitizer } from '@angular/platform-browser';
import { FlagService } from '../../../d7services/flag/flag.service';
import { UserService } from '../../../d7services/user/user.service';
import { Http } from '@angular/http';
import { BookComponent } from '../book/book.component';

@Component({
  selector: 'app-individual-workshop',
  templateUrl: './individual-workshop.component.html',
  styleUrls: ['./individual-workshop.component.css']
})
export class IndividualWorkshopComponent implements OnInit {

  workshop;
  objects;
  lessons;
  nid;
  videoURl;
  previewPdf;
  page: number = 1;
  links = []
  sanitizethis;
  popupPreview;
  leaders = [];
  check;
  currentuser;
  isLiked = true;
  isBookmarked;
  Flags = ['like', 'node_bookmark'];
  FlagStates = [];
  epubFile = false;
  epubLink;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private flagService: FlagService,
    private viewService: ViewService,
    private sanitizer: DomSanitizer,
    private http: Http,
  ) { }

  ngOnInit() {
    this.route.params
      // (+) converts string 'id' to a number
      .switchMap((nid) => this.viewService.getView('individual-workshop', [['nid', nid['nid']]]))
      .subscribe(data => {
        this.workshop = data[0];
        //  console.log(this.workshop.uid)

        if (this.workshop.video) {
          // console.log(this.workshop[object].video)
          if (this.youtube_parser(this.workshop.video)) {
            this.sanitizethis = "https://www.youtube.com/oembed?url=" + this.workshop.video;
            this.http.get(this.sanitizethis).map(res => res.json()).subscribe(data => {
              console.log(data.html);
              this.workshop.video = this.sanitizer.bypassSecurityTrustHtml(data.html);
            });
          }
          else if (this.vimeo_parser(this.workshop.video)) {
            this.sanitizethis = "https://vimeo.com/api/oembed.json?url=" + this.workshop.video;

            this.http.get(this.sanitizethis).map(res => res.json()).subscribe(data => {

              this.workshop.video = this.sanitizer.bypassSecurityTrustHtml(data.html);
            });
          }
        }

        this.viewService.getView('maker_profile_search_data', [['uid', this.workshop.uid],]).subscribe(res => {
          this.leaders = res;
          if (res == '') {
            this.check = false;
          } else {
            this.check = true;
          }
        });

      });
    //  console.log(this.route.params);
    this.route.params
      // (+) converts string 'id' to a number
      .switchMap((nid) => this.viewService.getView('individual-workshop-object', [['nid', nid['nid']]]))
      .subscribe(data => {
        this.objects = data;
        console.log(data);
        for (let object in this.objects) {
          var i = 0
          if (this.objects[object].video && this.objects[object].video !== '') {
            // console.log(this.objects[object].video)
            if (this.youtube_parser(this.objects[object].video)) {
              this.sanitizethis = "https://www.youtube.com/oembed?url=" + this.objects[object].video;
              this.http.get(this.sanitizethis).map(res => res.json()).subscribe(data => {
                console.log(data.html);
                this.objects[object].videolink = this.sanitizer.bypassSecurityTrustHtml(data.html);
              });
            }
            else if (this.vimeo_parser(this.objects[object].video)) {
              this.sanitizethis = "https://vimeo.com/api/oembed.json?url=" + this.objects[object].video;

              this.http.get(this.sanitizethis).map(res => res.json()).subscribe(data => {

                this.objects[object].videolink = this.sanitizer.bypassSecurityTrustHtml(data.html);
              });
            }

          }
        }
      });

    this.getCurrentUser();
    this.userService.getStatus().subscribe(data => {
      this.currentuser = data;
      this.flagService.isFlagged(this.workshop.nid, this.currentuser.user.uid, 'like').subscribe(data => {
        this.isLiked = data[0];
      })
      this.flagService.isFlagged(this.workshop.nid, this.currentuser.user.uid, 'bookmark').subscribe(data => {
        this.isBookmarked = data[0];
      })

    });

    this.route.params
      // (+) converts string 'id' to a number
      .switchMap((nid) => this.viewService.getView('more-lessons', [['nid', nid['nid']]]))
      .subscribe(data => {
        this.lessons = data;
        console.log(data);
      });
  }
  preview(i) {
    if (this.objects[i].pdf) {
      this.sanitizethis = '<iframe src="http://docs.google.com/gview?url=' + this.objects[i].pdf + '&embedded=true" frameborder="0" style="width:400px; height:550px;"></iframe>';
      //  if (i == 0)
      //  this.sanitizethis =  '<iframe src="http://docs.google.com/gview?url=' + 'http://infolab.stanford.edu/pub/papers/google.pdf' + '&embedded=true" frameborder="0" style="width:400px; height:550px;"></iframe>';
      //  if(i == 1)
      //   this.sanitizethis =  '<iframe src="http://docs.google.com/gview?url=' + 'https://docs.google.com/file/d/0BwEdalEj4DpeUmNaYmE0MFNyUlU/edit?pli=1' + '&embedded=true" frameborder="0" style="width:400px; height:550px;"></iframe>';

      this.popupPreview = this.sanitizer.bypassSecurityTrustHtml(this.sanitizethis);
    } else if (this.objects[i].book) {
      if (this.objects[i].book.endsWith('.epub')) {
      this.epubFile = true;
        this.sanitizethis = this.objects[i].book;
        // this.sanitizethis = 'http://futurepress.github.io/epub.js/reader/#epubcfi(/6/260[xchapter_124]!4/2/2/2/1:0)';
        this.epubLink = this.sanitizer.bypassSecurityTrustHtml(this.sanitizethis);
      } else {
        this.sanitizethis = '<iframe src="http://docs.google.com/gview?url=' + this.objects[i].book + '&embedded=true" frameborder="0" style="width:400px; height:550px;"></iframe>';
        this.popupPreview = this.sanitizer.bypassSecurityTrustHtml(this.sanitizethis);
      }
    }
    //else{
    //   this.sanitizethis =  '<iframe src="http://docs.google.com/gview?url=http://makerdev.orangestudio.com:8080/sites/default/files/learning-object/book/2017/03/os_drupal_developer_guide.docx&embedded=true" frameborder="0" style="width:400px; height:550px;"></iframe>';
    //     this.popupPreview = this.sanitizer.bypassSecurityTrustHtml (this.sanitizethis);
    // }
  }
  overlay(object) {
    if (this.objects[object].videolink) {
      this.popupPreview = this.objects[object].videolink;
    }
  }


  youtube_parser(url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    //console.log(match[7])
    return (match && match[7].length == 11) ? match[7] : false;
  }
  vimeo_parser(url) {
    var regExp = /^.*(vimeo\.com\/)((channels\/[A-z]+\/)|(groups\/[A-z]+\/videos\/))?([0-9]+)/;
    var match = url.match(regExp);
    return match[5];
  }
  /* function get current user */
  getCurrentUser() {
    this.userService.getStatus().subscribe(data => {
      this.currentuser = data;
    });
  }
  /* end function get user*/

  likeThis(e: Event) {
    this.getCurrentUser();
    console.log(this.currentuser.user.uid)
    console.log(this.workshop.nid)
    e.preventDefault();
    if (this.isLiked) {
      this.flagService.unflag(this.workshop.nid, this.currentuser.user.uid, 'like').subscribe(response => {
        this.isLiked = false;

      });
    } else {
      this.flagService.flag(this.workshop.nid, this.currentuser.user.uid, 'like').subscribe(response => {
        this.isLiked = true;
      });

    }
  }
  bookmarkThis(e: Event) {
    this.getCurrentUser();
    console.log(this.currentuser.user.uid)
    console.log(this.workshop.nid)
    e.preventDefault();
    if (this.isBookmarked) {
      this.flagService.unflag(this.workshop.nid, this.currentuser.user.uid, 'node_bookmark').subscribe(response => {
        this.isBookmarked = false;
      });
    } else {
      this.flagService.flag(this.workshop.nid, this.currentuser.user.uid, 'node_bookmark').subscribe(response => {
        this.isBookmarked = true;
      });
    }
  }

}
