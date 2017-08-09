import { Component, OnInit, Input } from '@angular/core';
import { UserService, FlagService } from '../../../core/d7services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NotificationBarService, NotificationType } from 'ngx-notification-bar/release';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
})
export class ReportComponent implements OnInit {
  @Input() EntityId;
  @Input() EntityType;
  @Input() typeOfNode;
  userId;
  checkUserLogin = false;
  isReported = false;
  selectedReasonName;
  closeResult;
  reportForm: FormGroup;
  constructor(
    private userService: UserService,
    private flagService: FlagService,
    private modalService: NgbModal,
    private router: Router,
    private notificationBarService: NotificationBarService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.buildForm();
    this.userId = localStorage.getItem('user_id');
    this.userService.isLogedIn().subscribe(data => {
      this.checkUserLogin = data;
      if (this.checkUserLogin && this.userId) {
        this.flagService.isFlagged(this.EntityId, this.userId, 'report_node').subscribe(data => {
          this.isReported = data[0];
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
      "field_reason_reporting": ['', Validators.required],
      "field_explain": ['', Validators.required],
    });
  }
  updateSelectedReason(item: any) {
    this.selectedReasonName = item.target.value;
  }
  onSubmit(e: Event) {
    let reportReasons: object = {};
    for (let key in this.reportForm.value) {
      reportReasons[key + '_' + this.EntityType] = this.reportForm.value[key];
    }
    this.notificationBarService.create({ message: 'Your report has been sent to Community Management. Thank you for your active participation!', type: NotificationType.Success, allowClose: true, autoHide: false, hideOnHover: false });

    if (!this.checkUserLogin) { this.router.navigate(['/access-denied']) };
    this.flagService.flag(this.EntityId, this.userId, 'report_' + this.EntityType, reportReasons).subscribe(response => {
      this.notificationBarService.create({ message: 'Your report has been sent to Community Management. Thank you for your active participation!', type: NotificationType.Success, allowClose: true, autoHide: false, hideOnHover: false });
      this.isReported = !this.isReported;
    });
  }

}
