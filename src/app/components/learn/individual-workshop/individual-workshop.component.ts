import { Component, OnInit, TemplateRef, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ViewService } from '../../../d7services/view/view.service';
import { DomSanitizer } from '@angular/platform-browser';
import { FlagService } from '../../../d7services/flag/flag.service';
import { UserService } from '../../../d7services/user/user.service';
import { Http } from '@angular/http';
import { BookComponent } from '../book/book.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoaderService } from '../../shared/loader/loader.service';

@Component({
  selector: 'app-individual-workshop',
  templateUrl: './individual-workshop.component.html',
  styleUrls: ['./individual-workshop.component.css']
})
export class IndividualWorkshopComponent implements OnInit {
  customTitle: string;
  customDescription: string;
  customImage: string;
  workshop;
  objects;
  lessons
  learns;
  nid;
  previewPdf;
  uid;
  page: number = 1;
  links = [];
  sanitizethis;
  popupPreview;
  currentuser;
  isLiked = true;
  isBookmarked;
  Flags = ['like', 'node_bookmark'];
  FlagStates = [];
  epubFile = false;
  epubLink;
  utubelink;
  file;
  workshopLeader = null;
  countlessons;
  @Input() name;



  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private flagService: FlagService,
    private viewService: ViewService,
    private sanitizer: DomSanitizer,
    private http: Http,
    private modalService: NgbModal,
    private loaderService: LoaderService,
  ) { }

  ngOnInit() {
    this.loaderService.display(true);
    this.uid = localStorage.getItem('user_id');
    let userId = localStorage.getItem('user_id');
    this.nid = this.route.params['value'].nid
    this.viewService.getView('individual-workshop', [['nid', this.nid]])
      .subscribe(data => {
        this.workshop = data[0];
        if (this.workshop.uid) {
          this.viewService.getView('maker_profile_card_data2', [['uid', this.workshop.uid]]).subscribe(data => {
            this.workshopLeader = data[0];
            console.log(this.workshopLeader)
          });
        }
        this.customTitle = this.workshop.workshop_title;
        this.customDescription = this.workshop.brief_description;
        this.customImage = this.workshop.cover_photo;
        if (this.workshop.introductory_video) {
          if (this.youtube_parser(this.workshop.introductory_video)) {
            this.sanitizethis = '<iframe src="https://www.youtube.com/embed/' + this.youtube_parser(this.workshop.introductory_video) +' "frameborder="0" style="width:100%; height:270px;" ></iframe>';
            this.workshop.introductory_video = this.sanitizer.bypassSecurityTrustHtml(this.sanitizethis);
            // this.sanitizethis = "https://www.youtube.com/oembed?url=" + this.workshop.introductory_video;
            // this.http.get(this.sanitizethis).map(res => res.json()).subscribe(data => {
            //   this.workshop.introductory_video = this.sanitizer.bypassSecurityTrustHtml(data.html);
            // });

          }
          else if (this.vimeo_parser(this.workshop.introductory_video)) {
            this.sanitizethis = "https://vimeo.com/api/oembed.json?url=" + this.workshop.introductory_video;
            this.http.get(this.sanitizethis).map(res => res.json()).subscribe(data => {
              this.workshop.introductory_video = this.sanitizer.bypassSecurityTrustHtml(data.html);
            });
          }
        }

      });
    this.viewService.getView('individual-workshop-object', [['nid', this.nid]])
      .subscribe(data => {
        this.objects = data;
        for (let object in this.objects) {
          if (this.objects[object].video && this.objects[object].video !== '') {
            if (this.youtube_parser(this.objects[object].video)) {
              //  console.log (this.youtube_parser(this.objects[object].video))
              this.sanitizethis = '<iframe src="https://www.youtube.com/embed/' + this.youtube_parser(this.objects[object].video) + '"frameborder="0" style="width:100%; height:270px;"></iframe>';
              this.objects[object].videolink = this.sanitizer.bypassSecurityTrustHtml(this.sanitizethis);
              this.objects[object].videoPic = "https://img.youtube.com/vi/" + this.youtube_parser(this.objects[object].video) + "/hqdefault.jpg";

              // this.sanitizethis = "https://www.youtube.com/oembed?url=" + this.youtube_parser(this.objects[object].video);
              // this.http.get(this.sanitizethis).map(res => res.json()).subscribe(data => {
              //   this.objects[object].videolink = this.sanitizer.bypassSecurityTrustHtml(data.html);
              //   this.objects[object].videoImage = data.thumbnail_url_with_play_button;
              // });
            }
            else if (this.vimeo_parser(this.objects[object].video)) {
              // this.sanitizethis = '<iframe src="https://player.vimeo.com/video/' + this.vimeo_parser(this.objects[object].video) +' "frameborder="0" style="width:480px; height:270px;"></iframe>';
              // this.objects[object].videolink = this.sanitizer.bypassSecurityTrustHtml(this.sanitizethis);
              this.sanitizethis = "https://vimeo.com/api/oembed.json?url=" + this.objects[object].video;
              this.http.get(this.sanitizethis).map(res => res.json()).subscribe(data => {
                this.objects[object].videolink = this.sanitizer.bypassSecurityTrustHtml(data.html);
                this.objects[object].videoImage = data.thumbnail_url_with_play_button;
              });
            }
          }
        }
        this.loaderService.display(false);
      }, err => {
        this.loaderService.display(false);
      });

    this.viewService.getView('more-lessons', [['nid', this.nid]])
      .subscribe(data => {
        this.lessons = data;

      });

    this.userService.getStatus().subscribe(data => {
      this.currentuser = data;

    });

    this.getCountlessons();
  }

  preview(i) {
    delete this.popupPreview;
    this.epubFile = null;
    if (this.objects[i].pdf && this.objects[i].pdf !== '') {
      this.sanitizethis = '<iframe src="http://docs.google.com/gview?url=' + this.objects[i].pdf + '&embedded=true" frameborder="0" style="width:100%; height:750px;"></iframe>';
      this.popupPreview = this.sanitizer.bypassSecurityTrustHtml(this.sanitizethis);
    } else if (this.objects[i].book && this.objects[i].book !== '') {
      delete this.popupPreview;
      if (this.objects[i].book.endsWith('.epub')) {
        this.epubLink = this.objects[i].book;
        this.popupPreview = null;
        this.epubFile = true;
      } else {
        var x = this.objects[i].book.split('.').pop();
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
    // else {
    //   this.popupPreview = this.workshop.introductory_video;
    // }
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
  open(content, i: number, mode: string) {
    if (mode === 'preview') {
      this.preview(i);
    } else {
      this.overlay(i);
    }
    this.modalService.open(content);
  }
  getCountlessons() {
    this.route.params
      .switchMap((nid) => this.viewService.getView('maker_count_lessons/' + nid['nid']))
      .subscribe(data => {
        this.countlessons = data[0];
      }, err => {

      });
  }

  introvideo(content)
  {
      this.popupPreview= this.workshop.introductory_video
      this.modalService.open(content);
  }
}
