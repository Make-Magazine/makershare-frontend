webpackJsonp([14],{1202:function(e,t,o){var r=this&&this.__decorate||function(e,t,o,r){var i,n=arguments.length,s=n<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,o,r);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(s=(n<3?i(s):n>3?i(t,o,s):i(t,o))||s);return n>3&&s&&Object.defineProperty(t,o,s),s};Object.defineProperty(t,"__esModule",{value:!0});var i=o(9),n=o(0),s=o(14),a=o(11),c=o(1251),l=o(1203),d=o(1253),p=o(1255),u=o(182),f=function(){function e(){}return e=r([n.NgModule({imports:[i.CommonModule,s.ReactiveFormsModule,c.ProjectDetailsRoutingModule,u.SharedModule.forChild(),a.NgbModule],declarations:[l.ProjectDetailsComponent,p.ProjectStoryComponent,d.ProjectHowToComponent]})],e)}();t.ProjectDetailsModule=f},1203:function(e,t,o){var r=this&&this.__decorate||function(e,t,o,r){var i,n=arguments.length,s=n<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,o,r);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(s=(n<3?i(s):n>3?i(t,o,s):i(t,o))||s);return n>3&&s&&Object.defineProperty(t,o,s),s},i=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};Object.defineProperty(t,"__esModule",{value:!0});var n=o(0),s=o(12),a=o(5),c=o(11);o(387);var l=o(3),d=o(25),p=o(16),u=function(){function e(e,t,o,r,i,n,s,a,c,l,d,p){this.route=e,this.router=t,this.viewService=o,this.nodeService=r,this.loaderService=i,this.statisticsService=n,this.auth=s,this.mainService=a,this.meta=c,this.meta_title=l,this.config=d,this.userService=p,this.current_active_tab="project-story",this.showcaseName=null,this.showcase={},this.projectIndex=0,this.previousProject=null,this.nextProject=null,this.projects=[],this.Manager=!1,this.badges=[],this.tags=[],this.toolTips={like:"Like this idea",bookmark:"Bookmark this project",share:"Share this project"},this.config.placement="bottom",this.config.triggers="hover"}return e.prototype.ngOnInit=function(){var e=this;this.loaderService.display(!0),this.Manager=this.auth.IsCommuintyManager(),this.getcurrentuser(),this.route.params.subscribe(function(t){e.sub=t,t.showcaseName&&e.showcaseProject(),e.nodeService.getIdFromUrl(e.sub.ProjectName,"project").subscribe(function(t){e.id=t[0];var o={nid:e.id};e.currentuser=Number(localStorage.getItem("user_id")),0!=e.currentuser&&(e.mainService.custompost("feed/make_seen/",o),e.id||(e.router.navigateByUrl("**"),e.loaderService.display(!1))),e.checkPorjectVisibility()})})},e.prototype.getBadgesProject=function(){var e=this;this.viewService.getView("api-project-badges",[["nid",this.id]]).subscribe(function(t){for(var o=0;o<t.length&&o<4;o++)e.badges.push(t[o])})},e.prototype.showcaseProject=function(){var e=this;this.showcaseName=this.sub.showcaseName,this.nodeService.getIdFromUrl(this.showcaseName,"showcase").subscribe(function(t){e.viewService.getView("showcase_projects_full",[["nid",t],["sort_by",e.sub.sortBy],["sort_order",e.sub.sortOrder]]).subscribe(function(t){var o=0;e.showcase=t;for(var r=0,i=t;r<i.length;r++){i[r].path==e.sub.ProjectName&&(0!=o&&(e.previousProject=t[o-1].path),o!=t.length&&(e.nextProject=t[o+1].path)),o++}})})},e.prototype.NavigateShowcase=function(e){this.router.navigate(["projects/",this.sub.showcaseName,e,this.sub.sortBy,this.sub.sortOrder])},e.prototype.loadProject=function(){var e=this;this.viewService.getView("maker_project_api/"+this.id).subscribe(function(t){e.project=t,e.getBadgesProject(),e.project&&(e.meta_title.setTitle(e.project.title.value+" | Maker Share"),e.meta.addTags([{name:"og:description",content:e.project.field_teaser.value},{name:"og:image",content:e.project.field_cover_photo.url}]));var o=0;if(e.project.field_resources)for(var r=0,i=e.project.field_resources;r<i.length;r++){var n=i[r],s=n.resource_file.split(".").pop();e.project.field_resources[o].extension=s,o++}e.projectDetails=e.project,e.projectDetails.nid=e.id,e.loaderService.display(!1),e.currentuser!=e.project.uid&&e.statisticsService.view_record(e.project.nid,"node").subscribe();for(var a in e.project.field_tags)""!=e.project.field_tags[a]&&e.tags.push(e.project.field_tags[a])},function(t){e.router.navigate(["/projects"]),e.loaderService.display(!1)})},e.prototype.checkPorjectVisibility=function(){var e=this;this.viewService.getView("views/project_visibility",[["nid",this.id]]).subscribe(function(t){0==t[0].status?(e.viewService.getView("views/project_team_members",[["nid",e.id]]).subscribe(function(o){var r=o[0].members.split(", ");1==r.length&&e.currentuser==t[0].uid?e.loadProject():r.indexOf(e.currentuser.toString())>-1?e.loadProject():(e.router.navigateByUrl("access-restricted"),e.loaderService.display(!1))}),e.loaderService.display(!1)):e.loadProject()})},e.prototype.forkThis=function(e){e.preventDefault()},e.prototype.shareThis=function(e){e.preventDefault()},e.prototype.challengePage=function(e){this.router.navigate(["challenges/",e])},e.prototype.getcurrentuser=function(){var e=this;this.userService.getStatus().subscribe(function(t){e.userLogin=t})},e=r([n.Component({selector:"app-project-details",template:o(1252),providers:[c.NgbTooltipConfig]}),i("design:paramtypes",[a.ActivatedRoute,a.Router,l.ViewService,l.NodeService,p.LoaderService,l.StatisticsService,d.Auth,l.MainService,s.Meta,s.Title,c.NgbTooltipConfig,l.UserService])],e)}();t.ProjectDetailsComponent=u},1251:function(e,t,o){var r=this&&this.__decorate||function(e,t,o,r){var i,n=arguments.length,s=n<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,o,r);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(s=(n<3?i(s):n>3?i(t,o,s):i(t,o))||s);return n>3&&s&&Object.defineProperty(t,o,s),s};Object.defineProperty(t,"__esModule",{value:!0});var i=o(0),n=o(5),s=o(1203),a=[{path:"",component:s.ProjectDetailsComponent}],c=function(){function e(){}return e=r([i.NgModule({imports:[n.RouterModule.forChild(a)],exports:[n.RouterModule],declarations:[]})],e)}();t.ProjectDetailsRoutingModule=c},1252:function(e,t){e.exports='<div *ngIf="project">\n  <div class="page-project">\n    <div class="container p-414">\n      <div class="top-content-wrapper">\n        <div class="container">\n          <div class="project-full-card">\n            \x3c!-- Start Project Header  --\x3e\n            <div class="col-md-12 project-cover">\n              <div class="projectsingle-card row">\n                <div class="col-lg-8 col-md-12 left-side">\n                  <div class="image-container">\n                    <div\n                        *ngIf="!(project.field_show_tell_video.value && project.field_show_tell_video_as_default.value == 1)">\n                      <img *ngIf="project.field_cover_photo.styled_url" src="{{project.field_cover_photo?.styled_url}}"\n                           alt="" class="img-responsive">\n                      <img *ngIf="!project.field_cover_photo.styled_url" src="./assets/images/placeholder.png" alt=""\n                           class="img-responsive">\n                    </div>\n                    <div\n                        *ngIf="project.field_show_tell_video.value && project.field_show_tell_video_as_default.value == 1">\n                      <video-viewer [link]="project.field_show_tell_video.value"></video-viewer>\n                    </div>\n                    <ul class="project-card-badges d-flex" *ngIf="badges" (click)="ShowProjectDetails(project.nid)">\n                      <li class="project-badge" *ngFor="let badge of badges;">\n                        <img src="{{badge?.goal_image}}" alt="" ngbTooltip="{{badge?.title}}">\n                      </li>\n                    </ul>\n                  </div>\n                  <div class="project-card-footer-3 d-flex justify-content-end">\n                    <ul class="d-flex align-content-start flex-wrap actions-button pull-right">\n                      \x3c!--<app-fork *ngIf="userLogin" [nodeNid]="project.nid" [user]="userLogin.user"></app-fork>--\x3e\n                      <li>\n                        <app-bookmark *ngIf="userLogin" [nodeNid]="project.nid" [nodeType]="\'project\'"></app-bookmark>\n                      </li>\n                      <li ngbTooltip="{{toolTips.share}}">\n                        <app-btn-share *ngIf="customTitle" [PageTitle]="customTitle"\n                                       [PageDescription]="customDescription" [PageImage]="customImage"></app-btn-share>\n                      </li>\n                      <li>\n                        <app-likes [nodeNid]="project.nid"></app-likes> \x3c!--[project]="true"--\x3e\n                      </li>\n                      <li class="project-views">\n                        <img src="./assets/images/icons/views.png" alt="">\n                        <span>{{project.views_count}}</span>\n                      </li>\n                    </ul>\n                  </div>\n                </div>\n                \x3c!-- End image-container --\x3e\n                <div class="col-lg-4 col-md-12 right-side">\n                  <div class="card-container">\n                    <div class="card">\n                      <div class="projects-circle" *ngIf="showcaseName">\n                        <div class="projects-circle m-auto d-flex justify-content-start align-items-center"\n                             *ngIf="showcaseName">\n                          <a *ngIf="previousProject" (click)="NavigateShowcase(previousProject)"\n                             class="go-previous d-flex"><i class="fa fa-angle-left" aria-hidden="true"></i></a>\n                          <p class=" showcase-nav" *ngIf="showcaseName"><a>{{showcaseName}}: project {{index}} of\n                            Total</a></p>\n                          <a *ngIf="nextProject" (click)="NavigateShowcase(nextProject)"\n                             class="go-next d-flex"><i class="fa fa-angle-right" aria-hidden="true"></i></a>\n                        </div>\n                      </div>\n                      <h3 class="card-title pt-2" innerHTML="{{project.title.value}}"></h3>\n                      <div class="card-description">\n                        <p innerHTML="{{project.field_teaser?.value}}"></p>\n                      </div>\n                      <div class="card-date mt-auto">\n                        <span class="project-date pr-2">Project Creation Date: {{project.created}}</span>\n                        <br>\n                        <span class="project-date">Updated on: {{project.changed}}</span>\n                      </div>\n                      <div class="topics d-flex flex-row mt-auto mb-3">\n                        <div class="card-tags" *ngIf="project.field_categories">\n                          <span>Topics:</span>\n                          <span class="project-tag" *ngFor="let category of project.field_categories">\n                            <span *ngIf="!category.is_parent"> {{category.name}}<span class="tags-comma">,</span></span>\n                          </span>\n                          \x3c!--<span class="project-tag pr-1" *ngFor="let tag of tags">{{tag.tag_name}}<span class="tags-comma">,</span></span>--\x3e\n                        </div>\n                      </div>\n                      <div class="project-card-footer d-flex mt-auto"\n                           *ngIf="project.field_parts || project.field_tools || project.field_materials || project.field_resources || project.field_how_to.value">\n                        <ul class="list-unstyled project-aside d-flex">\n                          <li id="read-story" [ngClass]="{\'active\': ActiveTab == \'project-story\'}"><a\n                              class="btn btn-tabs read-story" (click)="current_active_tab = \'project-story\'">Project\n                            Story</a></li>\n                          <li id="build-project" [ngClass]="{\'active\': ActiveTab == \'project-how-to\'}"><a\n                              class="btn btn-tabs build-project"\n                              (click)="current_active_tab = \'project-how-to\'">How-to</a></li>\n                        </ul>\n                      </div>\n                    </div>\n                  </div>\n                  \x3c!-- End card-container --\x3e\n                </div>\n                \x3c!-- End col-md-6 --\x3e\n              </div>\n            </div>\n            \x3c!-- End Project Header  --\x3e\n            \x3c!-- <div *ngIf="Manager"> \n                <app-feature-project [featuredProjectId]="projectId"> </app-feature-project>\n              </div> --\x3e\n          </div>\n        </div>\n        \x3c!-- End container --\x3e\n      </div>\n      \x3c!-- End top-content-wrapper --\x3e\n      <div class="container">\n        <app-project-story [project]="projectDetails" *ngIf="current_active_tab == \'project-story\'"></app-project-story>\n        <app-project-how-to [project]="projectDetails"\n                            *ngIf="current_active_tab == \'project-how-to\'"></app-project-how-to>\n      </div>\n    </div>\n  </div>\n</div>'},1253:function(e,t,o){var r=this&&this.__decorate||function(e,t,o,r){var i,n=arguments.length,s=n<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,o,r);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(s=(n<3?i(s):n>3?i(t,o,s):i(t,o))||s);return n>3&&s&&Object.defineProperty(t,o,s),s},i=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};Object.defineProperty(t,"__esModule",{value:!0});var n=o(0),s=o(12),a=function(){function e(e){this.sanitizer=e,this.howto=!1}return e.prototype.ngOnInit=function(){if(this.project.field_how_to){this.howto=!0;var e=this.project.field_how_to.value;this.trustedLink=this.sanitizer.bypassSecurityTrustHtml(e)}},r([n.Input(),i("design:type",Object)],e.prototype,"project",void 0),e=r([n.Component({selector:"app-project-how-to",template:o(1254)}),i("design:paramtypes",[s.DomSanitizer])],e)}();t.ProjectHowToComponent=a},1254:function(e,t){e.exports='<div class="row project-body">\n  <div class="region region-content col-lg-8 col-md-12">\n    <div class="how-to-tab">\n      <div class="project-body-content">\n        <p *ngIf="howto" [innerHTML]="trustedLink" ></p>\n        <p *ngIf="!howto" class="text-center" >There is no content available!</p>\n      </div>\n    </div>\n  </div>\n  <aside class="side-bar col-lg-4 col-md-12">\n    <div class="sidebar-container">\n      <div class="how-to-sidebar">\n        <div class="difficulty-duration" *ngIf="project.field_difficulty || project.field_duration">\n          <p>Difficulty + Duration</p>\n          <span>{{project.field_difficulty}} - {{project.field_duration}}</span>\n        </div>\n        <div class="tools-kits" *ngIf="project.field_tools || project.field_parts || project.field_materials || project.field_resources.length != 0">\n          <ul class="list-group tools" *ngIf="project.field_tools">\n            <p>Tools</p>\n            <li class="list-group-item" *ngFor="let tool of project.field_tools; let i=index">\n              <span class="count">{{tool.tool_quantity}}</span>\n              <span class="item">\n                <a *ngIf="tool.tool_url" href="{{tool.tool_url}}">{{tool.tool_name}}</a>\n                <span *ngIf="!tool.tool_url">{{tool.tool_name}}</span>\n              </span>\n            </li>\n          </ul>\n          <hr *ngIf="project.field_parts">\n          <ul class="list-group boards-kits" *ngIf="project.field_parts">\n            <p>Boards + Kits</p>\n            <li class="list-group-item" *ngFor="let part of project.field_parts; let i=index">\n              <span class="count">{{part.part_quantity}}</span>\n              <span class="item">\n                <a *ngIf="part.part_url" href="">{{part.part_name}}</a>\n                <span *ngIf="!part.part_url">{{part.part_name}}</span>\n              </span>\n            </li>\n          </ul>\n          <hr *ngIf="project.field_materials">\n          <ul class="list-group materials" *ngIf="project.field_materials">\n            <p>Materials</p>\n            <li class="list-group-item" *ngFor="let material of project.field_materials; let i=index">\n              <span class="count">{{material.material_quantity}}</span>\n              <span class="item"> {{material.material_id}}</span>\n            </li>\n          </ul>\n          <hr *ngIf="project.field_resources.length != 0">\n          <ul *ngIf="project.field_resources.length != 0" class="list-group resources">\n            <p>Resources</p>\n            <li class="list-group-item" *ngFor="let resource of project.field_resources; let i=index">\n              <a href="{{resource.resource_file}}"><i class="lnr lnr-download"></i>{{resource.resource_label}} - {{resource.extension}} <span class="file-size">({{resource.filesize}})</span></a>\n            </li>\n          </ul>\n        </div>\n      </div>\n    </div>\n  </aside>\n</div>'},1255:function(e,t,o){var r=this&&this.__decorate||function(e,t,o,r){var i,n=arguments.length,s=n<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,o,r);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(s=(n<3?i(s):n>3?i(t,o,s):i(t,o))||s);return n>3&&s&&Object.defineProperty(t,o,s),s},i=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};Object.defineProperty(t,"__esModule",{value:!0});var n=o(0),s=o(14),a=o(12),c=o(3),l=function(){function e(e,t,o,r,i){this.commentService=e,this.fb=t,this.viewService=o,this.sanitizer=r,this.userService=i,this.collabs=[],this.commentData={subject:"",comment_body:{und:[{value:""}]},nid:0},this.story=!1}return e.prototype.ngOnInit=function(){var e=this;if(this.checkLoggedUser(),this.project.field_story&&(this.story=!0,this.storyHTML=this.sanitizer.bypassSecurityTrustHtml(this.project.field_story.value)),this.viewService.getView("maker_profile_card_data",[["uid",localStorage.getItem("user_id")]]).subscribe(function(t){e.currentUser=t[0]}),this.getComments(),this.buildForm(),this.project.field_collaborators)for(var t=0,o=0,r=this.project.field_collaborators;o<r.length;o++){var i=r[o];this.viewService.getView("maker_profile_card_data",[["uid",i.target_id]]).subscribe(function(o){e.collabs[t]={},e.collabs[t]=o[0]}),t++}},e.prototype.checkLoggedUser=function(){var e=this;this.userService.getStatus().subscribe(function(t){t.user.uid>0&&(e.CurrentLoggedUserId=t.user.uid)})},e.prototype.getComments=function(){var e=this;this.viewService.getView("node-comments",[["nid",this.project.nid]]).subscribe(function(t){e.comments=t})},e.prototype.buildForm=function(){this.commentForm=this.fb.group({subject:["Commenter",s.Validators.required],comment_body:["",s.Validators.required]})},e.prototype.onSubmit=function(e){var t=this;this.commentForm.valid&&(e.preventDefault(),this.commentData.subject=this.commentForm.value.subject,this.commentData.comment_body.und[0].value=this.commentForm.value.comment_body,this.commentData.nid=this.project.nid,this.commentService.createComment(this.commentData).subscribe(function(e){var o={subject:t.commentData.subject,comment:t.commentData.comment_body.und[0].value,update_date:new Date,first_name:t.currentUser.first_name,last_name:t.currentUser.last_name,nickname:t.currentUser.nickname,photo:t.currentUser.photo};t.comments.push(o)},function(e){})),this.commentForm.reset()},r([n.Input(),i("design:type",Object)],e.prototype,"project",void 0),e=r([n.Component({selector:"app-project-story",template:o(1256),providers:[c.CommentService]}),i("design:paramtypes",[c.CommentService,s.FormBuilder,c.ViewService,a.DomSanitizer,c.UserService])],e)}();t.ProjectStoryComponent=l},1256:function(e,t){e.exports='<div class="row project-body" *ngIf="project">\n  <div class="region region-content col-lg-8 col-md-12 pb-4">\n    <div class="project-story-tab">\n      <div class="project-body-content">\n        <video-viewer class="row story-video" *ngIf="project.field_show_tell_video.value && project.field_show_tell_video_as_default.value == 0"\n          [link]="project.field_show_tell_video.value"></video-viewer>\n        <p [innerHTML]="storyHTML"></p>\n      </div>\n      \x3c!-- End body --\x3e\n    </div>\n    <div>\n      <app-comment [nid]="project.nid"></app-comment>\n    </div>\n  </div>\n  <aside class="side-bar col-lg-4 col-md-12">\n    <div class="sidebar-container">\n      <div class="project-story-tab">\n        <div class="project-collaborates" *ngIf="project.field_maker_memberships">\n          <div class="collaborate" *ngFor="let collaborator of project.field_maker_memberships; let i=index">\n\n            <app-maker-card class="card-wrapper" [uid]="collaborator.membership_team" [state]="\'short\'"></app-maker-card>\n            <div class="collaborate-role">\n              <p>ROLE ON THE PROJECT</p>\n              <p class="capitalize">{{collaborator.membership_role}}</p>\n            </div>\n          </div>\n          \x3c!-- End Collaborate --\x3e\n        </div>\n        <div class="card aha" *ngIf="project.field_aha_moment.value">\n          <div class="card-heading">\n            <p>AHA! Moment</p>\n          </div>\n          <div class="card-block">\n            <p>{{project.field_aha_moment?.value}}</p>\n          </div>\n        </div>\n        <div class="card uh-oh" *ngIf="project.field_uh_oh_moment.value">\n          <div class="card-heading">\n            <p>UH-OH! Moment</p>\n          </div>\n          <div class="card-block">\n            <p>{{project.field_uh_oh_moment?.value}}</p>\n          </div>\n        </div>\n        \x3c!-- End project-collaborates --\x3e\n      </div>\n    </div>\n\n    <div class="license-report">\n      <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-sa/4.0/80x15.png" /></a><br\n      />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License</a>.\n      <hr>\n      <div *ngIf="project.nid && CurrentLoggedUserId!=project.uid ">\n        <app-report *ngIf="project.nid" [EntityId]="project.nid" [EntityType]="\'node\'" [typeOfNode]="\'project\'"></app-report>\n      </div>\n    </div>\n\n  </aside>\n</div>'}});
//# sourceMappingURL=14.app.js.map