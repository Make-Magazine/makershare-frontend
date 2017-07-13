import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ViewService,PmService,UserService } from '../../../d7services';
import { NotificationBarService, NotificationType } from 'angular2-notification-bar/release';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons,NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  providers: [NgbTooltipConfig],
})
export class UserCardComponent implements OnInit {
  closeResult: string;
  card;
  projectCount={};
  projectCount2 = {};
  badges = [];
  active = true;
  userId;
  user;
  hideMessage = false;
  messageForm: FormGroup;
  messageObj = {
    recipients: '',
    subject: '',
    body: '',
  };
  @Input() uid;
  @Input() name;
  @Input() showMessage = true;
  @Input() communityManager = false;

  
  constructor(
    private router: Router,
    private viewService: ViewService,
    private userService: UserService,
    private notificationBarService: NotificationBarService,
    private pm: PmService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private config: NgbTooltipConfig,
  ) {
    this.config.placement = 'bottom';
    this.config.triggers = 'hover';
  }
  ngOnInit() {
    this.getProjectCountByUser();
    this.getcard();
    this.getBadges();
    this.buildForm();
    this.checkUserLogin()
  }

  getcard() {
    // get card profile
    // service to get profile card 
    this.viewService.getView('maker_profile_card_data2', [['uid', this.uid]]).subscribe(data => {
      this.card = data[0];
       console.log( this.card);
      
      this.isCurrentUser();
    }, err => {
      // notification error  in service 
      this.notificationBarService.create({ message: 'Sorry, somthing went wrong, try again later.', type: NotificationType.Error, allowClose: true, autoHide: false, hideOnHover: false });
    });
  }
  getBadges() {
    // service to get profile card Badges
    this.viewService.getView('api_user_badges_card', [['uid', this.uid]]).subscribe(data => {
      this.badges = data;      
      if(this.communityManager){
        for (let badge of data){
          if(badge.title == "Community Manager"){
            // this.badges = [];
            this.badges = [badge];         
          }
        }
      } 
      //console.log(data);
    
    }, err => {
      // notification error  in service 
      this.notificationBarService.create({ message: 'Sorry, somthing went wrong, try again later.', type: NotificationType.Error, allowClose: true, autoHide: false, hideOnHover: false });
    });
  }
  getProjectCountByUser() {
    // service to get profile card Badges
    this.viewService.getView('maker_projects_count', [['uid', this.uid]]).subscribe(data => {
      this.projectCount = data[0];
    }, err => {
      // notification error  in service 
      this.notificationBarService.create({ message: 'Sorry, somthing went wrong, try again later.', type: NotificationType.Error, allowClose: true, autoHide: false, hideOnHover: false });
    });
  }
  onSubmit(e) {
    e.preventDefault();
    if (this.messageForm.valid) {
      this.messageObj.recipients = this.card['name'];
      this.messageObj.body = this.messageForm.value.body;
      this.messageObj.subject = this.messageForm.value.subject;
      this.pm.sendMessage(this.messageObj).subscribe(res => {
        this.notificationBarService.create({ message: 'Message sent successfully', type: NotificationType.Success,allowClose: true, autoHide: false, hideOnHover: false });
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

  isCurrentUser() {
    this.userId = localStorage.getItem('user_id');
    if (this.card['uid'] === this.userId) {
      this.hideMessage = false;
    } else {
      this.hideMessage = true;
    }
  }
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
  checkUserLogin(){
    
  }

    userProfile(fName, lName) {
    var name = fName + '-' + lName;
    this.router.navigate(['/portfolio/', name]);
  }

  getProfile() {
    if (this.card.uid) {
      this.userService.getUrlFromId(this.card.uid).subscribe(res => {
        this.router.navigate(['/portfolio/' + res.url]);
        console.log(res)
      });
    }
  }

}
