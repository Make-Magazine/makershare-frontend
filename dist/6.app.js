webpackJsonp([6],{1034:function(e,t,n){var a=this&&this.__decorate||function(e,t,n,a){var s,i=arguments.length,o=i<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,n):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,n,a);else for(var r=e.length-1;r>=0;r--)(s=e[r])&&(o=(i<3?s(o):i>3?s(t,n,o):s(t,n))||o);return i>3&&o&&Object.defineProperty(t,n,o),o};Object.defineProperty(t,"__esModule",{value:!0});var s=n(9),i=n(0),o=n(14),r=n(11),c=n(1209),l=n(1277),d=n(1210);t.MissionsComponent=d.MissionsComponent;var u=n(182),h=function(){function e(){}return e=a([i.NgModule({imports:[s.CommonModule,r.NgbModule,o.FormsModule,o.ReactiveFormsModule,l.MissionRoutingModule,u.SharedModule.forChild()],declarations:[d.MissionsComponent,c.MissionProjectComponent],providers:[]})],e)}();t.MissionModule=h},1209:function(e,t,n){var a=this&&this.__decorate||function(e,t,n,a){var s,i=arguments.length,o=i<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,n):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,n,a);else for(var r=e.length-1;r>=0;r--)(s=e[r])&&(o=(i<3?s(o):i>3?s(t,n,o):s(t,n))||o);return i>3&&o&&Object.defineProperty(t,n,o),o},s=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};Object.defineProperty(t,"__esModule",{value:!0});var i=n(0),o=n(14),r=n(5),c=n(11),l=n(39),d=n(3),u=n(16),h=function(){function e(e,t,n,a,s,i,o,r,c,l){this.route=e,this.viewService=t,this.router=n,this.fb=a,this.nodeService=s,this.flagService=i,this.mainService=o,this.notificationBarService=r,this.loaderService=c,this.modalService=l,this.countProjects=0,this.button=!1,this.hiddenAfterSubmit=!1,this.createProject="noProject",this.enterStatus=!0,this.challangeData={title:"",cover_image:"",sponsored_by:"",public_voting:0,body:"",rules:"",diffDays:0,opened:!1,display_entries:0,nid:0,path:"",status_id:0,summary_trim:"",challenge_start_date:{value:"",timezone:"",timezone_db:"",date_type:""},challenge_end_date:{value:"",timezone:"",timezone_db:"",date_type:""},winners_announcement_date:{value:"",timezone:"",timezone_db:"",date_type:""}},this.challangStartDate={value:"",timezone:"",timezone_db:"",date_type:""}}return e.prototype.ngOnInit=function(){var e=this;this.buildForm(),this.checkenter(),this.getCountProject(),this.geturlformid(),this.nid=this.route.snapshot.params.nid,this.userId=parseInt(localStorage.getItem("user_id"),10),this.userName=localStorage.getItem("user_name"),this.getAllProject(),this.getChallengeData(),this.getProjectsInMission(),this.createProject="test",this.defaultTabObs=this.route.queryParams.map(function(e){return e.projectId}),this.defaultTabObs.subscribe(function(t){void 0==t&&""==t||(e.createProject=decodeURIComponent(t))})},e.prototype.getAllProject=function(){var e=this;this.route.params.switchMap(function(t){return e.viewService.getView("enter-challenge-projects-list",[["uid",e.userId],["uid1",e.userName]])}).subscribe(function(t){e.projects=t})},e.prototype.getCountProject=function(){var e=this;this.route.params.switchMap(function(t){return e.viewService.getView("maker_count_project_challenge_api/"+t.nid)}).subscribe(function(t){e.countProjects=null==t?0:t},function(e){})},e.prototype.getChallengeData=function(){var e=this;this.route.params.switchMap(function(t){return e.viewService.getView("challenge_data",[["nid",e.nid]])}).subscribe(function(t){if(e.challangeData=t[0],e.challangeData){var n=new Date,a=e.challangeData.challenge_end_date.value.split(" "),s=a[0].split("-"),i=new Date(+s[0],+s[1],+s[2]),o=Math.round((i.getTime()-n.getTime())/864e5);o>=0?e.challangeData.diffDays=o:e.challangeData.opened=!1}e.challangeData.challenge_end_date.value=e.changeDateFormat(e.challangeData.challenge_end_date.value),e.challangeData.challenge_start_date.value=e.changeDateFormat(e.challangeData.challenge_start_date.value),e.challangeData.winners_announcement_date.value=e.changeDateFormat(e.challangeData.winners_announcement_date.value)},function(e){})},e.prototype.changeDateFormat=function(e){return e?(e=e.split(" ")[0],e=e.split("-"),e[1]+"/"+e[2]+"/"+e[0]):""},e.prototype.getProjectsInMission=function(){var e=this;this.viewService.getView("user-entered-project",[["uid",this.userId]]).subscribe(function(t){e.projectsList=t})},e.prototype.updateSelectedProject=function(e){this.selectedProjectName=e.target.selectedOptions[0].text,this.selectedProject=e.target.value,this.submittedBefore=!1;for(var t=0,n=this.projectsList;t<n.length;t++){n[t].project_nid==e.target.value&&(this.submittedBefore=!0)}},e.prototype.onCancel=function(){this.addProjectForm.reset(),this.geturlformid(),this.router.navigate(["/missions/"+this.path])},e.prototype.onSubmit=function(){var e=this;if(this.checked){this.loaderService.display(!0);var t={type:"challenge_entry",field_entry_project:this.selectedProject,field_entry_challenge:this.nid};this.mainService.custompost("maker_challenge_entry_api",t).subscribe(function(t){e.router.navigate(["missions/",e.path]),e.loaderService.display(!1),e.notificationBarService.create({message:"You have submitted Your Project "+e.selectedProjectName+" in the Challenge "+e.challangeData.title,type:l.NotificationType.Success,allowClose:!0,autoHide:!1,hideOnHover:!1}),e.nid&&e.flagService.flag(e.nid,e.userId,"node_bookmark").subscribe(function(e){},function(e){}),e.nid&&e.flagService.flag(e.nid,e.userId,"follow").subscribe(function(e){},function(e){})},function(t){e.loaderService.display(!1),e.tab="rules",e.notificationBarService.create({message:"Sorry, but your project doesn't meet the challenge requirements, Please check <a id='rules-id' href='#rules' data-nodeId='"+e.nid+"'>Rules & Instructions </a>",type:l.NotificationType.Error,allowClose:!0,autoHide:!1,hideOnHover:!1,isHtml:!0}),e.router.navigate(["/missions/"+e.path]),e.tab="rules"})}else this.error="You must agree to challenge rules and eligibility requirements before entering."},e.prototype.createNewProjectForChallenge=function(){var e={queryParams:{redirectTo:encodeURIComponent("/missions/enter-mission/"+this.nid)}};this.router.navigate(["/projects/create"],e)},e.prototype.buildForm=function(){this.addProjectForm=this.fb.group({field_agreement:["",o.Validators.required]})},e.prototype.checkenter=function(){var e=this,t=this.route.snapshot.params.nid;this.viewService.checkEnterStatus("maker_challenge_entry_api/enter_status",t).subscribe(function(t){e.enterStatus=t.status,0==e.enterStatus&&e.router.navigate(["/missions/"+e.nid])},function(e){})},e.prototype.checkBoxValue=function(e){this.error="",this.checked=e.target.checked,this.checked?this.button=!0:this.button=!1},e.prototype.open=function(e){var t=this;this.submittedBefore?this.notificationBarService.create({message:"You have submitted this project to a mission before .",type:l.NotificationType.Error,allowClose:!0,autoHide:!1,hideOnHover:!1,isHtml:!0}):this.modalService.open(e).result.then(function(e){t.closeResult="Closed with: ${result}"},function(e){t.closeResult="Dismissed ${this.getDismissReason(reason)}"})},e.prototype.geturlformid=function(){var e=this,t=this.route.snapshot.params.nid;this.nodeService.getUrlFromId(t,"challenge").subscribe(function(t){e.path=t[0]})},e=a([i.Component({selector:"app-enter-missions-project",template:n(1276)}),s("design:paramtypes",[r.ActivatedRoute,d.ViewService,r.Router,o.FormBuilder,d.NodeService,d.FlagService,d.MainService,l.NotificationBarService,u.LoaderService,c.NgbModal])],e)}();t.MissionProjectComponent=h},1210:function(e,t,n){var a=this&&this.__decorate||function(e,t,n,a){var s,i=arguments.length,o=i<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,n):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,n,a);else for(var r=e.length-1;r>=0;r--)(s=e[r])&&(o=(i<3?s(o):i>3?s(t,n,o):s(t,n))||o);return i>3&&o&&Object.defineProperty(t,n,o),o},s=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};Object.defineProperty(t,"__esModule",{value:!0});var i=n(0),o=n(12),r=n(5),c=n(17),l=n(3),d=n(16),u=function(){function e(e,t,n,a,s,i,o){this.viewService=e,this.router=t,this.flagService=n,this.loaderService=a,this.userService=s,this.challenges=[],this.pageNumber=0,this.allstatuses=[],this.statusesCount={},this.currentStatusId=0,this.hideloadmore=!0,this.currentCount=0,o.setTitle("Community Missions | Making that Matters | Maker Share"),i.addTags([{name:"og:description",content:"Use your maker skills to positively impact people’s lives. Find a mission that inspires you to create. Maker Share is a project by Make: + Intel."},{name:"og:image",content:c.Singleton.Settings.appURL+"/assets/images/logos/maker-share-logo-clr@2x-100.jpg.jpg"}])}return e.prototype.ngOnInit=function(){this.challengesCount(),this.getStatuses(),this.getChallenges()},e.prototype.getChallenges=function(){var e=this;this.loaderService.display(!0);var t=[],n=[];0!=this.currentStatusId?(t=["status",this.currentStatusId],this.currentCount=this.statusesCount[this.currentStatusId]):this.currentCount=this.statusesCount[0],this.pageNumber>=0&&(n=["page",this.pageNumber]),this.viewService.getView("challenges",[t,n]).subscribe(function(t){e.challenges=e.challenges.concat(t),e.loadMoreVisibilty(),e.currentCount||(e.currentCount=e.statusesCount[0]);for(var n=0;n<e.challenges.length;n++)!function(t){var n=e.challenges[t].nid;e.flagService.flagCount(n,"follow").subscribe(function(n){e.challenges[t].nbFollowers=n.count},function(e){})}(n);e.loaderService.display(!1)},function(t){e.loaderService.display(!1)})},e.prototype.loadmore=function(){this.pageNumber++,this.getChallenges()},e.prototype.getStatuses=function(){var e=this;this.viewService.getView("maker_taxonomy_category/14").subscribe(function(t){var n=[];for(var a in t)t.hasOwnProperty(a)&&n.push(t[a]);n.unshift({tid:0,name:"All"}),e.allstatuses=n},function(e){})},e.prototype.challengesCount=function(){var e=this;this.viewService.getView("maker_count_api",[]).subscribe(function(t){e.statusesCount=t})},e.prototype.SetCurrentStatus=function(e){this.currentStatusId!=e&&(this.challenges=[]),this.currentStatusId=e,this.challenges=[],this.pageNumber=0,this.getChallenges()},e.prototype.loadMoreVisibilty=function(){this.hideloadmore=this.statusesCount[this.currentStatusId]==this.challenges.length},e.prototype.ShowChallengeDetails=function(e){this.router.navigate(["challenges",e])},e.prototype.enterToChallengeProject=function(e){var t=this;this.userService.isLogedIn().subscribe(function(n){0==n?t.router.navigate(["access-denied"]):t.router.navigate(["challenges/enter-challenge",e])})},e=a([i.Component({selector:"app-missions",template:n(1278)}),s("design:paramtypes",[l.ViewService,r.Router,l.FlagService,d.LoaderService,l.UserService,o.Meta,o.Title])],e)}();t.MissionsComponent=u},1276:function(e,t){e.exports='<div class="main-container container-fluid">\n  <div class="row">\n    <section class="col-sm-12 width-fix">\n      <div class="page-enter-challenge">\n        <div class="top-content-wrapper">\n          <div class="container">\n            <div class="col-md-12 challenge-cover" *ngIf="challangeData">\n              <div class="challenge-card row">\n                <div class="col-md-4 left-side">\n                  <div class="image-container">\n                    <img src="{{challangeData.cover_image}}" alt="" *ngIf="challangeData.cover_image" class="img-responsive">\n                    <img src="{{challangeData.sponsor_bar}}" alt="" *ngIf="challangeData.sponsor_bar" class="sponsor_bar img-responsive">\n                    <div class="card-type-grey">\n                      <div class="type-layer-2">\n                        Mission\n                      </div>\n                    </div>\n                  </div>\n                </div>\n                \x3c!-- End image-container --\x3e\n                <div class="col-md-8">\n                  <div class="card-container">\n                    <div class="card">\n                      <div class="card-partership">\n                        <p *ngIf="challangeData.sponsored_by">Sponsored by {{challangeData.sponsored_by}}</p>\n                      </div>\n                      <h3 class="card-title">{{challangeData.title}}</h3>\n                      <div class="card-description">\n                        <p [innerHTML]="challangeData.body"></p>\n                      </div>\n                      <div class="challene-card-footer d-flex">\n                        <div class="challenge-card-footer-2">\n                          <div class="challenge-card-count">\n                            <span class="entries-count">{{countProjects}}\n                       <span *ngIf="countProjects>1">Entries</span>\n                            <span *ngIf="countProjects==0">Entries</span>\n                            <span *ngIf="countProjects == 1">Entry</span>\n                            </span>\n                            <span class="follow-count">{{challangeData.followers}}\n                            <span *ngIf="challangeData.followers>1">Followers</span>\n                            <span *ngIf="challangeData.followers==1">Follower</span>\n                            <span *ngIf="!challangeData.followers">0 Followers</span>\n                            </span>\n                          </div>\n                          <div class="challenge-card-status">\n                            <span class="closed-status" *ngIf="challangeData.diffDays>1">{{challangeData.diffDays}} DAYS</span>\n                            <span class="closed-status" *ngIf="challangeData.diffDays<=1">{{challangeData.diffDays}} DAY</span>\n                            <span class="closed-status" *ngIf="challangeData.status_id == 376">{{challangeData.challenge_status}}</span>\n                            <span class="open-status" *ngIf="challangeData.status_id != 376">{{challangeData.challenge_status}}</span>\n                            <span class="challenge-end-date" *ngIf="challangeData.status_id != 376">{{challangeData.challenge_end_date.value}}</span>\n                          </div>\n                        </div>\n                      </div>\n                    </div>\n                  </div>\n                  \x3c!-- End card-container --\x3e\n                </div>\n                \x3c!-- End col-md-6 --\x3e\n              </div>\n            </div>\n          </div>\n          \x3c!-- End container --\x3e\n        </div>\n        \x3c!--<div class="top-content-wrapper">\n          <div class="container">\n            <div class="col-md-12 challenge-cover">\n              <img src="{{challangeData.cover_image}}" alt="">\n              <div class="sponsor">\n                <h4 *ngIf="challangeData.sponsored_by">Sponsored By: {{challangeData.sponsored_by}} </h4>\n              </div>\n              <div class="challenge-status">\n                <p>{{challangeData.challenge_status}} :{{challangeData.challenge_end_date.value}}<p>\n              </div>\n              <div class="challenge-title" *ngIf="challangeData.title">\n                <h1>{{challangeData.title}}</h1>\n              </div>\n              <div class="challenge-countdown" *ngIf="challangeData.opened">\n                <p class="number">{{challangeData.diffDays}} </p>\n                <p>Days left</p>\n              </div>\n              <ul class="list-unstyled challenge-actions pull-right">\n                 <app-bookmark [nodeNid]="challangeData.nid"></app-bookmark>\n                <li><a class="btn btn-soft-grey btn-fit"><i class="fa fa-lg fa-share"></i></a></li>\n              </ul>\n              <div class="clearfix"></div>\n            </div>\n          </div>\n        </div>--\x3e\n        <div class="container">\n          <div class="region region-content col-sm-12 mb-5">\n            <i class="lnr lnr-cross close-submit"  (click)="onCancel()"></i>\n            <div class="content-wrapper row pt-5">\n              <div class="challenge-enter col-md-5">\n                 \n                   <p *ngIf="projects?.length == 0 && enterStatus==true" class="text-center text-red"> You Don\'t have any Public Project</p>\n                   \n                <div *ngIf="projects?.length > 0 && enterStatus==true">\n                  <p *ngIf="enterStatus==true">Select an existing project from your portfolio.</p>\n                  <form>\n                    <div class="form-group" *ngIf="enterStatus==true">\n                      <select *ngIf="createProject==\'newproject\'" class="form-control" #item (change)="updateSelectedProject($event)">\n                    \n                      <option *ngFor="let p of projects" [value]="p.nid" [class.hidden]="submittedBefore">{{p.project_name}}</option>\n                     </select>\n                       <select *ngIf="createProject === \'undefined\'" class="form-control" #item (change)="updateSelectedProject($event)">\n                    <option   [value]="none" disabled>Select a project</option>\n                      <option *ngFor="let p of projects" [value]="p.nid">{{p.project_name}}</option>\n                     </select>\n                    </div>\n                    <div class="enter-form-buttons d-flex" *ngIf="enterStatus==true">\n                      \x3c!--<div class="button-container-sec-2 w-50">\n                        <span class="btn btn-main-2 w-100" (click)="onCancel()">Cancel</span>\n                      </div>--\x3e\n\n                      <div class="button-container-main-1 m-auto w-50" *ngIf="enterStatus==true">\n                        <span class="btn btn-main w-100"  (click)="open(content)" [attr.disabled]="submittedBefore">Submit</span>\n                      </div>\n                    </div>\n                  </form>\n                  <p class="text-center">OR</p>\n                </div>\n                <p>Want to create a new project for this Challenge? Add it to your Portfolio now</p>\n                <div class="button-container-main-1 w-100">\n                  <span class="btn btn-main w-100 create" (click)="createNewProjectForChallenge()">Create a new project for this challenge</span>\n                </div>\n              </div>\n            </div>\n            \x3c!-- End content-wrapper --\x3e\n          </div>\n          \x3c!-- End region-content --\x3e\n        </div>\n      </div>\n    </section>\n  </div>\n  \x3c!-- End row --\x3e\n</div>\n<ng-template #content let-c="close" let-d="dismiss">\n  <div class="challenge-enter-modal">\n    <div class="modal-header">\n      <button type="button" class="close ml-auto" aria-label="Close" (click)="d(\'Cross click\')">\n      <span aria-hidden="true">&times;</span>\n    </button>\n    </div>\n    <div class="modal-body">\n      <form [formGroup]="addProjectForm">\n        <div>\n          <p>\n            I have read and agree to the challenge rules and eligibility requirements. I understand that my project may be disqualified\n            if it does not meet project requirements. I agree to allow the Challenge Organizer to contact me via email if\n            I win the Challenge\n          </p>\n          <div>\n            <label class="md-check">\n          <input type="checkbox" (change)="checkBoxValue($event)" formControlName="field_agreement"/>  I Agree<br>\n          </label>\n          </div>\n          <div *ngIf="error" class="alert alert-danger error-msg">\n            {{error}}\n          </div>\n        </div>\n      </form>\n    </div>\n    <div class="modal-footer">\n      <div class="list-unstyled actions d-flex flex-row">\n        \x3c!--<div class="ml-2">\n          <button #closebtn type="button" class="btn btn-load-more" (click)="c(\'Close click\')">Close</button>\n        </div>--\x3e\n        <div class="ml-2" *ngIf="button == true">\n          <button type="button" class="btn btn-load-more" [disabled]="!addProjectForm.valid" (click)="onSubmit()" (click)="c(\'Close click\')">Submit</button>\n        </div>\n      </div>\n    </div>\n  </div>\n</ng-template>'},1277:function(e,t,n){var a=this&&this.__decorate||function(e,t,n,a){var s,i=arguments.length,o=i<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,n):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,n,a);else for(var r=e.length-1;r>=0;r--)(s=e[r])&&(o=(i<3?s(o):i>3?s(t,n,o):s(t,n))||o);return i>3&&o&&Object.defineProperty(t,n,o),o};Object.defineProperty(t,"__esModule",{value:!0});var s=n(0),i=n(5),o=n(184),r=n(1209),c=n(1210),l=[{path:"",children:[{path:"",component:c.MissionsComponent},{path:":path",loadChildren:function(){return new Promise(function(e){n.e(15).then(function(t){e(n(1279).MissionDataModule)}.bind(null,n)).catch(n.oe)})}},{path:"enter-mission/:nid",component:r.MissionProjectComponent,canActivate:[o.AuthGuardService]}]}],d=function(){function e(){}return e=a([s.NgModule({imports:[i.RouterModule.forChild(l)],exports:[i.RouterModule],declarations:[]})],e)}();t.MissionRoutingModule=d},1278:function(e,t){e.exports='<section class="page-challenge mb-5">\n  <div class="container page-header mb-5">\n    <h3>Missions</h3>\n    <p>Missions bring makers together to build with a purpose. Find a mission that allows you to focus your making\n      skills on an objective.</p>\n  </div>\n\n  <div class="container clearfix mb-5">\n    <div class="filters-group mb-3">\n\n      <div class="dropdown-group">\n        <i class="dropdownIcon lnr lnr-chevron-down"></i>\n        <select class="shadowed explore-tags sorting-filter"\n                id="filter-projects"\n                (change)="SetCurrentStatus($event.target.value)">\n          <option value="_none"\n                  disabled\n                  class="btn">Filter By\n          </option>\n          <option *ngFor="let status of allstatuses"\n                  value="{{status.tid}}"\n                  class="btn">{{status.name}}\n          </option>\n        </select>\n      </div>\n\n      <div class="filters projects-counter">\n        <div *ngIf="currentCount"\n             class="entries-count btn">\n          <p>{{currentCount}} Mission{{ currentCount > 1 ? \'s\': \'\' }}</p>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div class="container">\n    <div class="mb-5"\n         *ngFor="let challenge of challenges">\n      <app-mission-card class="card-wrapper"\n                        [challengeNid]="challenge.nid"\n                        [challenge]="challenge"\n                        [state]="\'full\'"></app-mission-card>\n    </div>\n\n    <div *ngIf="challenges.length == 0">\n      <h4 class="text-center mt-5 mb-5">There are no missions to show</h4>\n    </div>\n  </div>\n  <div class="text-center pt-3 pb-5"\n       *ngIf="!hideloadmore">\n    <div>\n      <button (click)="loadmore()"\n              class="button -grey -no-bg -slim">Load more\n      </button>\n    </div>\n  </div>\n</section>'}});
//# sourceMappingURL=6.app.js.map