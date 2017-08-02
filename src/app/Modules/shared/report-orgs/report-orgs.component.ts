import { Component, OnInit, Input } from '@angular/core';
import { UserService, FlagService } from '../../../CORE/d7services';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NotificationBarService, NotificationType } from 'ngx-notification-bar/release';

@Component({
  selector: 'app-report-orgs',
  templateUrl: './report-orgs.component.html',
})
export class ReportOrgsComponent implements OnInit {
  @Input('organizationNid') orgNid;
  reportForm: FormGroup;
  userId;
  selectedReasonName;
  isReported = false;
  reasonReport;
  closeResult;
  toggleFlag: string;
  checkUserLogin = false;
  constructor(private userService: UserService,
    private flagService: FlagService, private modalService: NgbModal,
    private fb: FormBuilder,
    private router: Router, private notificationBarService: NotificationBarService) { }

  ngOnInit() {
    this.buildForm();
    this.userId = localStorage.getItem('user_id');
    this.userService.isLogedIn().subscribe(data => {
      this.checkUserLogin = data;
      if (data && this.userId) {
        this.flagService
          .isFlagged(this.orgNid, this.userId, 'report_organization')
          .subscribe(data => {
            this.isReported = data[0];
            console.log(this.isReported)
          });
      }
    });
  }
  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = 'Closed with: ${result}';

    }, (reason) => {
      this.closeResult = 'Dismissed ${this.getDismissReason(reason)}';
    });
  }
  buildForm() {
    this.reportForm = this.fb.group({
      "field_reason_reporting_org": ['', Validators.required],
      "field_explain_problem": ['', Validators.required],
    });

  }
  updateSelectedReason(item: any) {
    this.selectedReasonName = item.target.value;
    console.log(this.selectedReasonName)
  }
  onSubmit(e: Event, content) {
    if (!this.checkUserLogin) this.router.navigate(['/access-denied']);
    this.toggleFlag = this.isReported ? 'unflag' : 'flag';
    var report = {
      field_reason_reporting: this.selectedReasonName,
      field_appropriate_for_response: this.reasonReport
    }
    this.flagService[this.toggleFlag](this.orgNid, this.userId, 'report_organization', report)
      .subscribe(response => {
        this.notificationBarService.create({ message: 'Your report has been sent to Community Management. Thank you for your active participation!', type: NotificationType.Success, allowClose: true, autoHide: false, hideOnHover: false });
        this.isReported = !this.isReported;
      });

  }

}
