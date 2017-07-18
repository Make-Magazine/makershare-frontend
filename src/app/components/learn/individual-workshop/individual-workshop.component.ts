import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ViewService, UserService, NodeService } from '../../../d7services';
import { DomSanitizer } from '@angular/platform-browser';
import { Http } from '@angular/http';
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
  element;
  title = {
    title: "Questions",
    placeholder: "Ask a question",
    ifempty: "Be the first to ask a question.",
    join: "to Add Your question"
  };

  navigateObject = {
    name: String,
    totalNumber: Number,
    index: Number,
    length: Number
  };
  //  title="Questions";
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
  introlink = false;
  file;
  workshopLeader = null;
  countlessons;
  path;
  idFromUrl;
  @Input() name;



  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private viewService: ViewService,
    private sanitizer: DomSanitizer,
    private http: Http,
    private modalService: NgbModal,
    private loaderService: LoaderService,
    private nodeService: NodeService,

  ) { }

  ngOnInit() {
    this.path = this.route.snapshot.params['path'];
    if (this.path) {
      this.nodeService.getIdFromUrl(this.path, 'learning_sequence').subscribe(data => {
        this.idFromUrl = data[0];
        if (this.idFromUrl) {
          this.loaderService.display(true);
          this.uid = localStorage.getItem('user_id');
          //this.nid = this.route.params['value'].nid
          this.viewService.getView('individual-workshop', [['nid', this.idFromUrl]])
            .subscribe(data => {
              this.workshop = data[0];

              // this.meta.setTitle(`Maker Share | ${this.workshop.workshop_title}`);
              // this.meta.setTag('og:image', this.workshop.cover_photo);
              // this.meta.setTag('og:description', this.workshop.brief_description);

              if (this.workshop.uid) {
                this.viewService.getView('maker_profile_card_data2', [['uid', this.workshop.uid]]).subscribe(data => {
                  this.workshopLeader = data[0];
                  if (data.length == 0) {
                    this.router.navigate(['**']);
                  }
                  // console.log(this.workshopLeader)
                });
                //  console.log(this.workshopLeader)
              } else {
                this.router.navigate(['**']);
              }
              this.customTitle = this.workshop.workshop_title;
              this.customDescription = this.workshop.brief_description;
              this.customImage = this.workshop.cover_photo;
              if (this.workshop.introductory_video) {
                if (this.youtube_parser(this.workshop.introductory_video)) {
                  this.sanitizethis = '<iframe src="https://www.youtube.com/embed/' + this.youtube_parser(this.workshop.introductory_video) + ' "frameborder="0" style="width:100%; height:270px;" ></iframe>';
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
          this.viewService.getView('individual-workshop-object', [['nid', this.idFromUrl]])
            .subscribe(data => {
              this.objects = data;
              for (let object in this.objects) {
                if (this.objects[object].video && this.objects[object].video !== '') {
                  if (this.youtube_parser(this.objects[object].video)) {
                    this.sanitizethis = '<iframe src="https://www.youtube.com/embed/' + this.youtube_parser(this.objects[object].video) + '"frameborder="0" style="width:100%; height:270px;"></iframe>';
                    this.objects[object].videolink = this.sanitizer.bypassSecurityTrustHtml(this.sanitizethis);
                    this.objects[object].videoPic = "https://img.youtube.com/vi/" + this.youtube_parser(this.objects[object].video) + "/hqdefault.jpg";

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

          this.viewService.getView('more-lessons', [['nid', this.idFromUrl]])
            .subscribe(data => {
              this.lessons = data;

            });

          this.userService.getStatus().subscribe(data => {
            this.currentuser = data;

          });

          this.getCountlessons();
        }//end if id
      });
    }//end if path

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
        this.element = document.getElementsByClassName("modal-content");
        //  console.log(this.element)
        // this.element.classList.add('epub-width');
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
    this.introlink = false;
    this.epubFile = null;
    if (this.objects[object].videolink && this.objects[object].videolink !== '') {
      this.popupPreview = this.objects[object].videolink;
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
      this.viewService.getView('maker_count_lessons/' + this.idFromUrl)
      .subscribe(data => {
        this.countlessons = data[0];
      }, err => {

      });
  }

  introvideo(content) {
    this.introlink = true;
    delete this.popupPreview;
    this.popupPreview = this.workshop.introductory_video;
    this.modalService.open(content);
  }

  objectDetails(nid) {
    this.router.navigate(['/learning/lessons', this.idFromUrl, nid]);
  }
}
