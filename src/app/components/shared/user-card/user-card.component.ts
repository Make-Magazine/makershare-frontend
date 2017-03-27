import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, RouterModule, ActivatedRoute, Params } from '@angular/router';
import { ViewService } from '../../../d7services/view/view.service';
import { FlagService } from '../../../d7services/flag/flag.service';
import { UserService } from '../../../d7services/user/user.service';
import { NotificationBarService, NotificationType } from 'angular2-notification-bar';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Message } from '../../../d7services/pm/message';
import { PmService } from '../../../d7services/pm/pm.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',

})
export class UserCardComponent implements OnInit {
  closeResult: string;
  card = {};
  badges=[];
  active = true;
  userId;
  user;
  hideMessage=false;
  messageForm: FormGroup;
  messageObj: Message = {
    recipients: '',
    subject: '',
    body: '',
  };
  @Input() uid;
  @Input() name;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private viewService: ViewService,
    private userService: UserService,
    private flagService: FlagService,
    private notificationBarService: NotificationBarService,
    private pm: PmService,
    private fb: FormBuilder,
    private modalService: NgbModal,

  ) { }
  ngOnInit() {
    this.getcard();
    this.getBadges();
    this.buildForm();
  }

  getcard() {
    // get card profile
    // service to get profile card 
    this.viewService.getView('maker_profile_card_data2', [['uid', this.uid]]).subscribe(data => {
      this.card = data[0];
      this.isCurrentUser();
      //console.log(this.card)
    }, err => {
      // notification error  in service 
      this.notificationBarService.create({ message: 'Sorry, somthing went wrong, try again later.', type: NotificationType.Error });
    });
  }
  getBadges(){
       // service to get profile card Badges
    this.viewService.getView('api_user_badges', [['uid', this.uid]]).subscribe(data => {
      this.badges = data;
    }, err => {
      // notification error  in service 
      this.notificationBarService.create({ message: 'Sorry, somthing went wrong, try again later.', type: NotificationType.Error });
    });
  }
  onSubmit(e) {
    e.preventDefault();
    if (this.messageForm.valid) {
      this.messageObj.recipients = this.card['name'];
      //console.log(this.messageObj.recipients)
      this.messageObj.body = this.messageForm.value.body;
      this.messageObj.subject = this.messageForm.value.subject;
      this.pm.sendMessage(this.messageObj).subscribe(res => {
       console.log(res);
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

  isCurrentUser(){
    this.userId = localStorage.getItem('user_id');
    if(this.card['uid'] === this.userId){
      this.hideMessage=false;
    }else{
      this.hideMessage = true;
    }
  }
  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
