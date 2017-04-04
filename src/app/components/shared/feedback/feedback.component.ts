import { Component, OnInit, Input,Inject} from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {  FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TaxonomyService } from '../../../d7services/taxonomy/taxonomy.service'
import { TaxonomyTerm } from '../../../models/Drupal/taxonomy-term';
import { UserService } from '../../../d7services/user/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';
import {Device} from 'ng2-device-detector';
import { NodeService } from '../../../d7services/node/node.service'



@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
    feedbackForm: FormGroup;
    feedback_types;
    bug_types;
    features;
    username;
    userId;
    currentuser;
    current_url;
    full_url;
    date;
    screen;
    navigator;
    submitted=false;
    formErrors = {
        'field_want_submit':'' 
      };
    validationMessages = {
      'field_want_submit': {required:'please select a value '},
  };
 closeResult: string;

 CurrentType:number;

  constructor(
      private modalService: NgbModal,
      private fb: FormBuilder,
      private taxonomyService: TaxonomyService,
      private userService: UserService,
      private nodeService:NodeService,
      @Inject(DOCUMENT) private document: any,
      private device: Device
) {
    this.deviceInfo();
    this.screen=screen
    this.full_url=this.document.location.href;
 }

  ngOnInit() {
    //console.log(navigator.userAgent);
    //var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    var todayDate = new Date();     
    var date;
    this.date=this.changeDateFormat(todayDate);
    this.username = localStorage.getItem('user_name');
    this.navigator=navigator;
   // this.feedbackForm = new FormGroup({
    //    field_want_submit: new FormControl(),
    //    field_my_bug:new FormControl(),
    //    field_would_like:new FormControl(),
    //    field_bug_not_in_page_	:new FormControl(),
    //    field_bug_in_page:new FormControl(),
    //    field_browser:new FormControl(),
    //    field_os:new FormControl(),
    //    field_screen_size:new FormControl(),
    //    body:new FormControl(),
    //    field_describe_feature: new FormControl(),
    //    field_better_site:new FormControl(),
    //    field_recommend_site:new FormControl(),
    //    field_upload_screenshots:new FormControl()
    // });
    // this.feedbackForm = this.fb.group({
    //   // We can set default values by passing in the corresponding value or leave blank if we wish to not set the value. For our example, we’ll default the gender to female.
    //   'firstName' : '',
    //   'lastName': '',
    //   'gender' : 'Female',
    //   'hiking' : false,
    //   'running' : false,
    //   'swimming' : false
    // })
  
    //feedback types
      this.taxonomyService.getVocalbularyTerms(27).subscribe((data: TaxonomyTerm[]) => {
      this.feedback_types = data;
      console.log('feedback_types');
    });
    //bug types
      this.taxonomyService.getVocalbularyTerms(26).subscribe((data: TaxonomyTerm[]) => {
      this.bug_types = data;
      console.log('bug_types');
    }); 
    //feature
      this.taxonomyService.getVocalbularyTerms(28).subscribe((data: TaxonomyTerm[]) => {
      this.features = data;
      console.log('features');
    });
   this.buildform();
   

  }
  buildform(){
   // field_want_submit=this.feedback.field_want_submit;

      this.feedbackForm = this.fb.group({
      // We can set default values by passing in the corresponding value or leave blank if we wish to not set the value. For our example, we’ll default the gender to female.
      'field_want_submit':[ '',Validators.required],
      'field_my_bug': '',
      'field_would_like' : '',
      'field_bug_not_in_page_' :this.full_url,
      'field_bug_in_page' :'' ,
      'field_browser' : this.device.browser+" "+this.device.browser_version,
      'field_os':navigator.platform,
      'field_screen_size':this.screen.height+'X'+this .screen.width ,
      'body':'',
      'field_describe_feature':'',
      'field_better_site':'',
      'field_recommend_site':'',
      'field_upload_screenshots':''
    });
     this.feedbackForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
     this.onValueChanged(); // (re)set validation messages now
}
//for required fields 
  onValueChanged(data?: any) {
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
        //for submitted empty fields
      if (!control.valid && this.submitted) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
       if (control && (control.dirty || data=="save") && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            this.formErrors[field] += messages[key] + ' ';
          }
        }
    
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
      return `with: ${reason}`;
    }
  }
  changeDateFormat(date) {
  var d;
  d = new Date(date);
  var fullYear = d.getFullYear();
  var day = d.getDate();
  var hours=d.getHours();
  var minutes=d.getMinutes();
  var prefix;
  if(hours >= 12){
    hours=hours-12;
    prefix='PM';
  }else{
    prefix='AM';
  }
  // month + " " + day + "," + " " + fullYear;
  var formatter = new Intl.DateTimeFormat("en", { month: "short" }),

  month1 = formatter.format(new Date(date))

  var datestring = hours +":"+minutes+" "+prefix+" "+month1+" "+day+" "+fullYear;
  console.log(datestring);
  return datestring;
}
  
 checkFeedbackType(feedback){
   console.log(feedback);
 }
 deviceInfo() {
    console.log('hello `Home` component');
    console.log(this.device);
 
  }
  onSubmit(value){
    this.submitted=true;
    this.onValueChanged();
     if(this.feedbackForm.valid){
       console.log('gggggggggggggggggggggggggggggggggggg');

       // let FieldName = 'field_' + this.CurrentModal + 's';
    
    // und[0].value='';
    var feedback={
        type:'feedback',
        title:'',
        field_want_submit:{
          '#validated':true,
          und:[{
            tid :''
        }]
        },
         field_browser:{
          und:[{
            value:''
        }]
        },

      // field_browser:und[0].value

    }

       feedback.field_want_submit.und[0].tid=this.feedbackForm.value.field_want_submit;
       feedback.field_browser.und[0].value=this.feedbackForm.value.field_want_submit;
       feedback.title=this.feedbackForm.value.title = 'feedback 12345678990';
       console.log(feedback)
      this.nodeService.createNode(feedback).subscribe((NewNode) => {
       
      });
   // this.feedback.SetField(this.date, "title");
    //this.nodeService.createNode(this.feedback).subscribe((NewNode) => {
     // NewNode.name = this.date;
     }

}
}

 

