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
  links = [];
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
  utubelink;

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
    this.getCurrentUser();
    let userId = localStorage.getItem('user_id');
    console.log(userId);
    // setTimeout(1000)
    this.nid = this.route.params['value'].nid
      this.viewService.getView('individual-workshop', [['nid', this.nid]])
        .subscribe(data => {
          this.workshop = data[0];
          //  console.log(this.workshop.uid)

          if (this.workshop.introductory_video) {
            // console.log (this.workshop.introductory_video)

            if (this.youtube_parser(this.workshop.introductory_video)) {
            this.sanitizethis = '<iframe src="https://www.youtube.com/embed/' + this.youtube_parser(this.workshop.introductory_video) +' "frameborder="0" style="width:640px; height:274px;"></iframe>';
            this.workshop.introductory_video = this.sanitizer.bypassSecurityTrustHtml(this.sanitizethis);
            }
            else if (this.vimeo_parser(this.workshop.introductory_video)) {
              console.log(this.workshop.introductory_video)
              this.sanitizethis = "https://vimeo.com/api/oembed.json?url=" + this.workshop.introductory_video;

              this.http.get(this.sanitizethis).map(res => res.json()).subscribe(data => {

                this.workshop.introductory_video = this.sanitizer.bypassSecurityTrustHtml(data.html);
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
      this.viewService.getView('individual-workshop-object1', [['nid', this.nid]])
        .subscribe(data => {
          this.objects = data;
           console.log(data);
          for (let object in this.objects) {

            if (this.objects[object].video && this.objects[object].video !== '') {
              // console.log(this.objects[object].video)
                  // console.log(data.html);
             
              if (this.youtube_parser(this.objects[object].video)) {
                //  console.log (this.youtube_parser(this.objects[object].video))
                this.sanitizethis = '<iframe src="https://www.youtube.com/embed/' + this.youtube_parser(this.objects[object].video) +' "frameborder="0" style="width:480px; height:270px;"></iframe>';
                this.objects[object].videolink = this.sanitizer.bypassSecurityTrustHtml(this.sanitizethis);
                // console.log(this.objects[object].videolink)
                
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


      this.viewService.getView('more-lessons', [['nid', this.nid]])
        .subscribe(data => {
          this.lessons = data;
        });
    this.userService.getStatus().subscribe(data => {
    this.currentuser = data;
   
  });
}
    
  preview(i) {
    delete this.popupPreview;
    this.epubFile = null;
    if (this.objects[i].pdf && this.objects[i].pdf !== '') {
      this.sanitizethis = '<iframe src="http://docs.google.com/gview?url=' + this.objects[i].pdf + '&embedded=true" frameborder="0" style="width:100%; height:750px;"></iframe>';
      //  if (i == 0)
      //  this.sanitizethis =  '<iframe src="http://docs.google.com/gview?url=' + 'http://infolab.stanford.edu/pub/papers/google.pdf' + '&embedded=true" frameborder="0" style="width:400px; height:550px;"></iframe>';
      //  if(i == 1)
      //   this.sanitizethis =  '<iframe src="http://docs.google.com/gview?url=' + 'https://docs.google.com/file/d/0BwEdalEj4DpeUmNaYmE0MFNyUlU/edit?pli=1' + '&embedded=true" frameborder="0" style="width:400px; height:550px;"></iframe>';

      this.popupPreview = this.sanitizer.bypassSecurityTrustHtml(this.sanitizethis);
    } else if (this.objects[i].book && this.objects[i].book !== '') {
      if (this.objects[i].book.endsWith('.epub')) {
        this.epubFile = true;
        delete this.popupPreview;
        console.log(this.objects[i]);
         //this.sanitizethis = this.objects[i].book;        
         this.epubLink = this.objects[i].book;
         //this.epubLink = this.sanitizer.bypassSecurityTrustResourceUrl(this.sanitizethis);
        //  this.sanitizethis = 'assets/book.epub';
        //  this.epubLink = this.sanitizethis;
      } else {
        delete this.popupPreview;
        this.epubFile = null;
        this.sanitizethis = '<iframe src="https://docs.google.com/viewer?url=' + this.objects[i].book + '&embedded=true" frameborder="0" style="width:100%; height:750px;"></iframe>';
        this.popupPreview = this.sanitizer.bypassSecurityTrustHtml(this.sanitizethis);
      }
    }
  }
  overlay(object) {
    delete this.popupPreview;
    this.epubFile = null;
    if (this.objects[object].videolink && this.objects[object].videolink !== '') {
      this.popupPreview = this.objects[object].videolink;
    }
  }
 youtube_parser(url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    //console.log(match[7])
    return (match && match[7].length == 11) ? match[7]:'';
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
   


}
