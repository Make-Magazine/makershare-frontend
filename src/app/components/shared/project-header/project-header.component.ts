import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../../d7services/user/user.service';
import { ViewService } from '../../../d7services/view/view.service';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';
// import { MetaService } from '@nglibs/meta';

@Component({
  selector: 'app-project-header',
  templateUrl: './project-header.component.html',
  providers: [NgbTooltipConfig],
})
export class ProjectHeaderComponent implements OnInit {
  @Input('project') project;
  @Input() projectInfo;
  @Input() showcaseInfo;
  @Input('ActiveTab') ActiveTab:string = "project-story";$white
  @Output() SwitchTab = new EventEmitter();
  @Output() ProjectNewId = new EventEmitter();
  badges = [];
  
  constructor(
    private userService: UserService,
    private viewService: ViewService,
    private config: NgbTooltipConfig,
    // private readonly meta: MetaService,
  ) {
    config.placement = 'bottom';
    config.triggers = 'hover';    
  }
  userLogin;
  currentuser;
  userId;
  tags = [];
  customTitle: string = '';
  customDescription: string = '';
  customImage: string = '';
  toolTips = {
    'like':'Like this idea',
    'bookmark':'Bookmark this project',
    'share':'Share this project',
  }

  ngOnInit() {
    this.getcurrentuser();
    this.getBadgesProject();
    this.userId = localStorage.getItem('user_id');
    this.currentuser = Number(localStorage.getItem('user_id'));
    console.log (this.project);
    
    if (this.project.title) {
      this.customTitle = this.project.title.value;
    }
    if (this.project.field_teaser) {
      this.customDescription = this.project.field_teaser.value;
    }
    if (this.project.field_cover_photo) {
      this.customImage = this.project.field_cover_photo.url;
      console.log(this.customImage);
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

  getBadgesProject() {
    this.viewService.getView('api-project-badges', [['nid', this.project.nid]]).subscribe(data => {
      for (let i = 0; i < data.length && i < 4; i++) {
        this.badges.push(data[i]);
      }
    });
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
