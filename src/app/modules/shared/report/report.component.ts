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
  @Input('nodeNid') Nid;
  @Input('nodeType') type;
  @Input('typeOfNode') typeNode;
  userId;
  checkUserLogin = false;
  isReported = false;
  selectedReasonName;
  closeResult;
  reportForm: FormGroup;
  constructor(
    private userService: UserService, private flagService: FlagService, private modalService: NgbModal,
    private router: Router, private notificationBarService: NotificationBarService, private fb: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
    this.userId = localStorage.getItem('user_id');
    this.userService.isLogedIn().subscribe(data => {
      this.checkUserLogin = data; //return true or false
      if (this.checkUserLogin && this.userId) {
        this.flagService.isFlagged(this.Nid, this.userId, 'report_node').subscribe(data => {
          this.isReported = data[0]; //return true or false
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
      "field_reason_reporting_node": ['', Validators.required],
      "field_other_data": ['', Validators.required],
    });
  }
  updateSelectedReason(item: any) {
    this.selectedReasonName = item.target.value;
    console.log(this.selectedReasonName)
  }
  onSubmit(e: Event) {
    if (!this.checkUserLogin) { this.router.navigate(['/access-denied']) };
    let reportReasons = {
      field_reason_reporting_node: this.selectedReasonName,
      field_other_data: this.reportForm.value.field_other_data,
    };
    this.flagService.flag(this.Nid, this.userId, 'report_node', reportReasons).subscribe(response => {
      this.notificationBarService.create({ message: 'Your report has been sent to Community Management. Thank you for your active participation!', type: NotificationType.Success, allowClose: true, autoHide: false, hideOnHover: false });
      this.isReported = !this.isReported;
    });

  }

}
