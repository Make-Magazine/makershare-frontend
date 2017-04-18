import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../../d7services/user/user.service';
// import { MetaService } from '@nglibs/meta';

@Component({
  selector: 'app-project-header',
  templateUrl: './project-header.component.html',
})
export class ProjectHeaderComponent implements OnInit {
  @Input('project') project;
  @Input() projectInfo;
  @Input() showcaseInfo;
  @Output() SwitchTab = new EventEmitter();
  @Output() ProjectNewId = new EventEmitter();
  
  constructor(
    private userService: UserService,
    // private readonly meta: MetaService,
  ) {}

  userLogin;
  currentuser;
  userId;
  tags = [];
  customTitle: string = '';
  customDescription: string = '';
  customImage: string = '';

  ngOnInit() {
    this.getcurrentuser();
    this.userId = localStorage.getItem('user_id');
    this.currentuser = Number(localStorage.getItem('user_id'));
    if (this.project.title) {
      this.customTitle = this.project.title.value;
    }
    if (this.project.field_teaser) {
      this.customDescription = this.project.field_teaser.value;
    }
    if (this.project.field_cover_photo) {
      this.customImage = this.project.field_cover_photo.url;
    }
    // this.meta.setTitle(this.project.title);
    // this.meta.setTag('og:image', this.project.field_cover_photo);
    // this.meta.setTag('og:description', this.project.field_teaser.value);

    if(this.showcaseInfo){
      
    }
    let i =0;
    for (let tag in this.project.field_tags) {
      if(this.project.field_tags[tag] != "")
      this.tags.push(this.project.field_tags[tag]);
    }
  }
  
  getcurrentuser(){
    this.userService.getStatus().subscribe(data => {
      this.userLogin = data;
    });
  }

  SwitchTabFunc(NewTab) {
    this.SwitchTab.emit(NewTab);
  }

  SwitchProjectFunc(e,action) {
    if (action == "back") {
      this.showcaseInfo.index--;
      this.ProjectNewId.emit(this.showcaseInfo.index);
    } else if (action == "next") {
      this.showcaseInfo.index++;
      this.ProjectNewId.emit(this.showcaseInfo.index);
    }
  }

}
