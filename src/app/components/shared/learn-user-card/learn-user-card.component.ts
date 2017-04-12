import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, RouterModule, ActivatedRoute, Params } from '@angular/router';
import { ViewService } from '../../../d7services/view/view.service';
import { FlagService } from '../../../d7services/flag/flag.service';
import { UserService } from '../../../d7services/user/user.service';
import { NotificationBarService, NotificationType } from 'angular2-notification-bar/release';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Message } from '../../../d7services/pm/message';
import { PmService } from '../../../d7services/pm/pm.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-learn-user-card',
  templateUrl: './learn-user-card.component.html',
  providers: [NgbTooltipConfig],
})
export class LearnUserCardComponent implements OnInit {
  closeResult: string;
  card = {};
  projectCount = {};
  projectCount2 = {};
  badges = [];
  active = true;
  userId;
  user;
  hideMessage = false;
  messageForm: FormGroup;
  messageObj: Message = {
    recipients: '',
    subject: '',
    body: '',
  };
  @Input() uid;
  @Input() leader;
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
    private config: NgbTooltipConfig, )
     {
    config.placement = 'bottom';
    config.triggers = 'hover';
  }

  ngOnInit() {
     this.getcard();
  
  }
   getcard() {
    // get card profile
    // service to get profile card 
    this.viewService.getView('maker_profile_card_data2', [['uid', this.uid]]).subscribe(data => {
      this.card = data[0];
      // console.log(this.card);

    }, err => {
      // notification error  in service 
      this.notificationBarService.create({ message: 'Sorry, somthing went wrong, try again later.', type: NotificationType.Error });
    });
  }

}
