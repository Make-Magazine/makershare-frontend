import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Message } from '../../../d7services/pm/message';
import { NotificationBarService, NotificationType } from 'angular2-notification-bar/release';
import { PmService } from '../../../d7services/pm/pm.service';
import { UserService } from '../../../d7services/user/user.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router'

@Component({
  selector: 'app-message-modal',
  templateUrl: './message-modal.component.html'
})
export class MessageModalComponent implements OnInit {
  @Input() uid;
  userId;
  closeResult: string;
  messageForm: FormGroup;
  messageObj: Message = {
    recipients: '',
    subject: '',
    body: '',
  };
  active = true;
  user;
  constructor(
    private notificationBarService: NotificationBarService,
    private fb: FormBuilder,
    private pm: PmService,
    private userService: UserService,
    private modalService: NgbModal,
    private router: Router,
  ) { }

  ngOnInit() {
    this.buildForm();
    this.checkUserLogin();
  }
  getUserData() {
    this.userService.getUser(this.uid).subscribe(data => {
      this.user = data;
    })
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.messageForm.valid) {
      this.messageObj.recipients = this.user.name;
      this.messageObj.body = this.messageForm.value.body;
      this.messageObj.subject = this.messageForm.value.subject;
      this.pm.sendMessage(this.messageObj).subscribe(res => {
        this.notificationBarService.create({ message: 'Message sent successfully', type: NotificationType.Success });
      });
    }
  }
  resetForm(e) {
    e.preventDefault();
    this.messageForm.reset();
  }

  buildForm(): void {
    this.messageForm = this.fb.group({
      'subject': ['', Validators.required],
      'body': ['', Validators.required]
    });
    this.messageForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.messageForm) { return; }
    const form = this.messageForm;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  formErrors = {
    'subject': '',
    'body': ''
  };

  validationMessages = {
    'subject': {
      'required': 'Subject is required.',
    },
    'body': {
      'required': 'Message Body is required.',
    },
  };

  open(content) {
    this.userService.isLogedIn().subscribe(data => {
      this.checkUserLogin = data;
      if (data == false) {
        localStorage.setItem('redirectUrl', this.router.url);
        this.router.navigate(['/access-denied']);
      }
      this.modalService.open(content).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  checkUserLogin() {

  }

}
