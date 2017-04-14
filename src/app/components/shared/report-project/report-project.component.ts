import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, RouterModule, ActivatedRoute, Params } from '@angular/router';
import { ViewService } from '../../../d7services/view/view.service';
import { FlagService } from '../../../d7services/flag/flag.service';
import { UserService } from '../../../d7services/user/user.service';
import { NotificationBarService, NotificationType } from 'angular2-notification-bar/release';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-report-project',
  templateUrl: './report-project.component.html',
})
export class ReportProjectComponent implements OnInit {
  reportForm: FormGroup;
  userId;
  selectedReasonName;
  profileName;
  checkUserLogin = false;
  @Input() projectReportId;
  currentuser;
  isReported = false;
  closeResult: string;
  reasonReport;


  constructor(private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private viewService: ViewService,
    private userService: UserService,
    private flagService: FlagService,
    private modalService: NgbModal,

    private notificationBarService: NotificationBarService, ) { }

  ngOnInit() {
    this.buildForm();
    this.userId = localStorage.getItem('user_id');
    this.flagService.isFlagged(this.projectReportId, this.userId, 'report_project').subscribe(data => {
      this.isReported = data[0];

    });

  }

  /* function build form */
  buildForm() {
    this.reportForm = this.fb.group({
      "field_reason_reporting": ['', Validators.required],
      "field_appropriate_for_response": ['', Validators.required],
    });

  }
  /* end function build form */
  updateSelectedReason(item: any) {
    this.selectedReasonName = item.target.value;
    console.log(this.selectedReasonName);
  }
  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = 'Closed with: ${result}';

    }, (reason) => {
      this.closeResult = 'Dismissed ${this.getDismissReason(reason)}';
    });
  }
  /* function report user */
  onSubmit(e: Event, content) {
    this.userService.isLogedIn().subscribe(data => {
      this.checkUserLogin = data;
      if (data == false) {
        this.router.navigate(['/access-denied']);
      }
      e.preventDefault();
      this.reasonReport = this.reportForm.value.field_appropriate_for_response;
      if ((this.isReported == false)) {
        var report = {
          field_reason_reporting: this.selectedReasonName,
          field_appropriate_for_response: this.reasonReport,
        }
        console.log(report);
        this.flagService.flag(this.projectReportId, this.userId, 'report_project', report).subscribe(response => {
          this.isReported = true;


          this.notificationBarService.create({ message: 'Project has been reported.', type: NotificationType.Success });
        }, err => {
        });

      }
    });//end if check user login
  }
  /* end function report user */
}
