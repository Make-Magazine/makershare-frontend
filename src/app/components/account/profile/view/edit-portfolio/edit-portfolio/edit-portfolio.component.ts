import { Component, OnInit, Input,EventEmitter,Output } from '@angular/core';
import { UserService } from '../../../../../../CORE/d7services';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-edit-portfolio',
  templateUrl: './edit-portfolio.component.html',
})
export class EditPortfolioComponent implements OnInit {
  defaultTabObs: Observable<string>;
  defaultTab: string;
  CurrentTab: string;
  DefaultView: string;
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
  ) { }
  @Input('projectsCountPublic') projectsCountPublic;
  @Input('projectsCountDraft') projectsCountDraft;
  @Input('projectsCountPrivate') projectsCountPrivate;
  @Input('LikesCount') LikesCount: number = 0;
  @Input('ViewsCount') ViewsCount: number = 0;
  @Output() emitter = new EventEmitter();

  ngOnInit() {
    this.CurrentTab = 'public';
    // set default tab according to url parameter "tab"
    this.defaultTabObs = this.route.queryParams.map(params => params['tab'] || 'None');
    this.defaultTabObs.subscribe(tab => {
      if (tab != undefined || tab != '') {
        this.CurrentTab = tab;
      }
      if (tab == 'None') {
        this.CurrentTab = 'public';
      }
    });


    this.userService.getUser(localStorage.getItem("user_id")).subscribe(userdata => {
      this.DefaultView = "grid";
      if (userdata.projects_view) {
        this.DefaultView = userdata.projects_view;
      }
    });
  }

  ChangeDefaultView(NewView: string) {
    let user = {
      uid: localStorage.getItem("user_id"),
      field_project_view: { und: NewView },
    };
    this.userService.updateUser(user).subscribe(data => {
      this.DefaultView = NewView;
    });
  }
}
