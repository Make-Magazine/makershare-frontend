import { Component, OnInit,Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Http } from '@angular/http';

@Component({
  selector: 'video-viewer',
  templateUrl: './video-viewer.component.html',
})
export class VideoViewerComponent implements OnInit {
  @Input("link") link:string;
  VideoId:string;
  type:string;
  SantinizedHtml;
  constructor(
    private sanitizer:DomSanitizer,
    private http:Http,
  ) { }

  ngOnInit() {
    this.SetVideoUrl();
    
  }

  SetVideoUrl(){
    if(this.link.indexOf('youtube') != -1){
      this.type = 'youtube';
      this.VideoId = this.youtube_parser(this.link);
      console.log(this.VideoId);
      let html = '<iframe allowfullscreen="allowfullscreen" mozallowfullscreen="mozallowfullscreen" msallowfullscreen="msallowfullscreen" oallowfullscreen="oallowfullscreen" webkitallowfullscreen="webkitallowfullscreen" src="https://www.youtube.com/embed/'+this.VideoId+'" frameborder="0" class="embed-responsive-item"></iframe>';
      this.SantinizedHtml = this.sanitizer.bypassSecurityTrustHtml(html);
       console.log( this.SantinizedHtml);
    }else if(this.link.indexOf('vimeo') != -1){
      this.type = 'vimeo';
      let url = "https://vimeo.com/api/oembed.json?url=" + this.link;
      this.http.get(url).map(res => res.json()).subscribe(data => {
        this.SantinizedHtml = this.sanitizer.bypassSecurityTrustHtml(data.html);
      });
    }
    else if (this.link.indexOf('youtu.be') != -1)
    {
      this.type = 'youtube';
      this.VideoId = this.youtube_parser(this.link);
      console.log(this.VideoId);
      let html = '<iframe allowfullscreen="allowfullscreen" mozallowfullscreen="mozallowfullscreen" msallowfullscreen="msallowfullscreen" oallowfullscreen="oallowfullscreen" webkitallowfullscreen="webkitallowfullscreen" src="https://www.youtube.com/embed/'+this.VideoId+'" frameborder="0" class="embed-responsive-item"></iframe>';
      this.SantinizedHtml = this.sanitizer.bypassSecurityTrustHtml(html);
    }
    else{
      this.SantinizedHtml = "Video Url is not supported.";
    }
  }

  youtube_parser(url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    return (match && match[7].length == 11) ? match[7] : '';
   
  }
  

}
