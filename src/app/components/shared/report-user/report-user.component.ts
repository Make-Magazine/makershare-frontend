import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, RouterModule, ActivatedRoute, Params } from '@angular/router';
import { ViewService,FlagService,UserService } from '../../../d7services';
import { NotificationBarService, NotificationType } from 'angular2-notification-bar/release';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';



@Component({
  selector: 'app-report-user',
  templateUrl: './report-user.component.html',
})
export class ReportUserComponent implements OnInit {
  userId;
  selectedReasonName;
  profileName;
  checkUserLogin = false;
  @Input() userReportId;
  currentuser;
  reportForm: FormGroup;
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
    if (this.userId && this.userReportId) {
      this.flagService.isFlagged(this.userReportId, this.userId, 'report_user').subscribe(data => {
        this.isReported = data[0];

      });
    }


  }

  /* function build form */
  buildForm() {
    this.reportForm = this.fb.group({
      "field_reason_for_reporting": ['', Validators.required],
      "field_appropriate_response": ['', Validators.required],
    });

  }
  /* end function build form */


  updateSelectedReason(item: any) {
    this.selectedReasonName = item.target.value;
  }
  updateWrittingReason(itemnew: any) {
    //this.selectedReasonName = item.target.selectedOptions[0].text;

  }
  /* function report user */
  onSubmit(e: Event,content) {
    this.userService.isLogedIn().subscribe(data => {
      this.checkUserLogin = data;
      if (data == false) {
        this.router.navigate(['/access-denied']);
      }
      e.preventDefault();
      this.reasonReport = this.reportForm.value.field_appropriate_response;
      if ((this.isReported == false)) {
        var report = {
          field_reason_for_reporting: this.selectedReasonName,
          field_appropriate_response: this.reasonReport,
        }

        this.flagService.flag(this.userReportId, this.userId, 'report_user', report).subscribe(response => {
          this.isReported = true;
      

          this.notificationBarService.create({ message: 'User has been reported.', type: NotificationType.Success,allowClose: true, autoHide: false, hideOnHover: false });
        }, err => {
        });

      }
    });//end if check user login
  }
  /* end function report user */
  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = 'Closed with: ${result}';
      
    }, (reason) => {
      this.closeResult = 'Dismissed ${this.getDismissReason(reason)}';
    });
  }


}
