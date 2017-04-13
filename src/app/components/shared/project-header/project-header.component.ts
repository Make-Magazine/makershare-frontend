import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../../d7services/user/user.service';

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
    if(this.showcaseInfo){
    }
    // this.project.field_tags
    let i =0;
    for (let tag in this.project.field_tags) {
      if(this.project.field_tags[tag] != "")
      this.tags.push(this.project.field_tags[tag]);
    }
  }
  
  getcurrentuser(){
    this.userService.getStatus().subscribe(data => {
      this.userLogin = data
    });
  }

  SwitchTabFunc(NewTab) {
    this.SwitchTab.emit(NewTab);
  }

  SwitchProjectFunc(ProjectIndex,action) {
    if (action == "back") {
      ProjectIndex--;
      this.ProjectNewId.emit(ProjectIndex);
    } else if (action == "next") {
      ProjectIndex++;
      this.ProjectNewId.emit(ProjectIndex);
    }
  }

}
