import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';
import { Auth } from '../../auth0/auth.service';
import {
  ViewService,
  UserService,
  NodeService,
  MainService,
} from '../../../core/d7services';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  providers: [NgbTooltipConfig],
})
export class ProjectCardComponent implements OnInit {
  @Input() nid;
  @Input() view: string = 'grid';
  @Input() front;
  @Input() state;
  @Input() clickAction: Function = null;
  @Input() editMode: boolean = false;
  @Input() visibility: number;
  @Output() Featured = new EventEmitter<number>();
  inOrg = false;
  badges = [];
  project;
  userId;
  smallWindow: number;
  Manager: boolean = false;
  org_data;

  constructor(
    private router: Router,
    private nodeService: NodeService,
    private viewService: ViewService,
    private config: NgbTooltipConfig,
    private userService: UserService,
    private modal: NgbModal,
    public auth: Auth,
    public mainService: MainService,
  ) {
    this.config.placement = 'bottom';
    this.config.triggers = 'hover';
  }

  ngOnInit() {
    this.auth.IsCommuintyManager();
    this.Manager = this.auth.IsCommuintyManager();

    this.getProjectCard();
    this.getBadgesProject();
    this.userId = +localStorage.getItem('user_id');
    this.smallWindow = window.innerWidth;

    window.onresize = e => {
      this.smallWindow = window.innerWidth;
    };
    this.checkIfHasOrg();
  }

  getProjectCard() {
    this.viewService
      .getView('api-project-card', [['nid', this.nid]])
      .subscribe(res => {
        let categoriesStr = res[0].project_categories;
        categoriesStr = categoriesStr.substring(0, categoriesStr.length - 2);
        const categoriesArr = categoriesStr.split(', ');
        res[0].project_categories = categoriesArr;
        let membershipStr: string = res[0].field_team_members;
        membershipStr = membershipStr.substring(0, membershipStr.length - 1);
        const membershipArr: string[] = membershipStr.split(',');
        res[0].field_team_members = membershipArr;

        let membershipUidStr = res[0].field_maker_memberships_uid;
        membershipUidStr = membershipUidStr.substring(
          0,
          membershipUidStr.length - 1,
        );
        const membershipUidArr = membershipUidStr.split(',');
        res[0].field_maker_memberships_uid = membershipUidArr;

        this.project = res[0];

        this.viewService
          .getView('maker_count_all_projects/' + this.project['uid'])
          .subscribe(data => {
            this.project['maker_project_count'] = data[0];
          });

        this.userService.getUrlFromId(this.project['uid']).subscribe(r => {
          this.project['maker_url'] = '/portfolio/' + r.url;
        });
      });
  }

  getBadgesProject() {
    this.viewService
      .getView('api-project-badges', [['nid', this.nid]])
      .subscribe(data => {
        for (let i = 0; i < data.length && i < 4; i++) {
          this.badges.push(data[i]);
        }
      });
  }

  @HostListener('click')
  clickItem() {
    if (this.clickAction != null) {
      this.clickAction();
    }
  }

  challengePage(nid) {
    this.router.navigate(['challenges/', nid]);
  }

  ShowProjectDetails(path) {
    this.router.navigate(['/projects/', path]);
  }

  userProfile(fName, lName) {
    this.router.navigate(['/portfolio/', `${fName} + '-' + ${lName}`]);
  }

  goToProfile(path: string) {
    this.router.navigate(['portfolio/', path]);
  }

  emitFeatured() {
    this.Featured.emit();
  }

  /*****************************
   * EDIT MODE
   *****************************/

  /**
   * openModal
   *
   * @param template
   * @constructor
   */
  openModal(template) {
    this.modal.open(template, { size: 'lg', windowClass: 'delete-promodal' });
  }

  /**
   * deleteProject
   *
   * @param closebtn
   * @constructor
   */
  deleteProject(closebtn) {
    closebtn.click();
    this.nodeService.deleteNode(+this.nid).subscribe(data => {
      this.emitFeatured();
    });
  }

  /**
   * updateProjectVisibility
   *
   * @param {number} newVisibility
   * @param closebtn
   */
  updateProjectVisibility(newVisibility: number, closebtn?) {
    if (closebtn) {
      closebtn.click();
    }

    let status = null;
    if (newVisibility == 370) {
      status = 1;
    }
    const project: any = {
      nid: this.project.nid,
      field_visibility2: { und: [newVisibility] },
      field_sort_order: { und: [{ value: 0 }] },
      status: status,
    };

    this.nodeService.updateNode(project).subscribe(data => {
      this.emitFeatured();
    });
  }
  checkIfHasOrg() {
    const body = {
      uid: this.userId,
    };
    this.mainService
      .custompost('company_profile_api/my_org_profile', body)
      .subscribe(res => {
        this.org_data = res[0];
        if (this.org_data) {
          this.checkProjectInOrg();
        }
      });
  }
  setProjectonOrgs() {
    const data = {
      org_nid: this.org_data.nid,
      project_nid: this.nid,
      project_uid: this.userId,
    };
    this.mainService
      .custompost('company_profile_api/add_project_orgs', data)
      .subscribe(res => {
        if (res[0] == 'add') {
          this.inOrg = true;
        } else {
          this.inOrg = false;
        }
      });
  }

  checkProjectInOrg() {
    if (this.auth.authenticated()) {
      const data = {
        org_nid: this.org_data.nid,
        project_nid: this.nid,
        project_uid: this.userId,
      };
      this.mainService
        .custompost('company_profile_api/check_project_orgs', data)
        .subscribe(res => {
          this.inOrg = res[0];
        });
    }
  }
}
