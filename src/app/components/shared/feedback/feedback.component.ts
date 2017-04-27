import { Component, OnInit, Input, Inject } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TaxonomyService } from '../../../d7services/taxonomy/taxonomy.service'
import { TaxonomyTerm } from '../../../models/Drupal/taxonomy-term';
import { UserService } from '../../../d7services/user/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';
//import {Device} from 'ng2-device-detector';
import { NodeService } from '../../../d7services/node/node.service'
import { FileService } from '../../../d7services/file/file.service';
import { FileEntity } from '../../../models';
import { NodeHelper } from '../../../models';
import { Observable } from "rxjs";



@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
})
export class FeedbackComponent implements OnInit {
  feedbackForm: FormGroup;
  feedback_types;
  bug_types;
  features;
  userId;
  full_url;
  profile;
  date;
  submitted = false;
  flag = false;
  field_upload_screenshots: FileEntity
  NID = false;
  full_name;
  checkUserLogin;
  formErrors = {
    'field_want_submit': '',
    'field_bug_not_in_page_': '',
    'field_upload_screenshots': []
  };
  validationMessages = {
    'field_want_submit': { 
      required: 'please select a value' 
    },
    'field_bug_not_in_page_': {
      pattern: 'please enter a valid url',
      validateRequired: 'this value is required'
    },
    'field_upload_screenshots': {
      'validimagesize': 'choose a photo of size less than 1MB',
      'validateType': 'please choose an image',
      // 'validResolution': 'please choose an image of 1000x1000px'
    }
  };
  closeResult: string;
  imagedata: string = 'test';
  CurrentType: number;
  BugType:number;
  FeatureType:number;
  fileArray = [
    {
      fid: '',
      file: '',
      filename: ''
    }
  ];
  file = {
    file: '',
    filename: '',
    fid: '',
  };
  device = {
    browserName: '',
    browserVersion: '',
    os: ''
  }
  feedback = {
    type: 'feedback',
    title: '',
    field_want_submit: {
      und: this.feedback_types
    },
    field_browser: {
      und: [{
        value: ''
      }]
    }, field_os: {
      und: [{
        value: ''
      }]
    },
    field_bug_not_in_page_: {
      und: [{
        url: ''
      }]
    },
    field_bug_in_page: {
      und: [{
        url: ''
      }]
    },
    field_screen_size: {
      und: [{
        value: ''
      }]
    }
    , field_my_bug: {
      und: ''
    }
    , body: {
      und: [{
        value: ''
      }]
    },
    field_describe_bug: {
      und: [{
        value: ''
      }]
    },
    field_upload_screenshots: {
      und: []
    },
    field_would_like: {
      und: ''
    },
    field_describe_feature: {
      und: [{
        value: ''
      }]
    },
    field_better_site: {
      und: [{
        value: ''
      }]
    },
    field_recommend_site: {
      und: [{
        value: Number
      }]
    }

    // field_browser:und[0].value
  }
  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private taxonomyService: TaxonomyService,
    private userService: UserService,
    private nodeService: NodeService,
    private router: Router,
    @Inject(DOCUMENT) private document: any,
    private fileService: FileService,

  ) {
    this.full_url = this.document.location.href
  }
  ngOnInit() {
    this.userId = localStorage.getItem('user_id');
    if(this.userId){
      this.userService.getUser(this.userId).subscribe(res => {
        this.profile = res;
        // console.log(this.profile.full_name);
        this.full_name=res.full_name
      }, err => {
        console.log(err);
      });
    }
    this.deviceInfo();
    //var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    var todayDate = new Date();
    this.date = this.changeDateFormat(todayDate);
    //feedback types
    this.taxonomyService.getVocalbularyTerms(27).subscribe((data: TaxonomyTerm[]) => {
      this.feedback_types = data;
    });
    //bug types
    this.taxonomyService.getVocalbularyTerms(26).subscribe((data: TaxonomyTerm[]) => {
      this.bug_types = data;
    });
    //feature
    this.taxonomyService.getVocalbularyTerms(28).subscribe((data: TaxonomyTerm[]) => {
      this.features = data;
    });
    this.buildform();

  }

  buildform() {
    //document.getElementById('field_bug_in_page').innerHTML=this.full_url
    this.feedbackForm = this.fb.group({
      // We can set default values by passing in the corresponding value or leave blank if we wish to not set the value. For our example, we’ll default the gender to female.
      'field_want_submit': ['',Validators.required],
      'field_my_bug': '',
      'field_would_like': '',
      //url validation
      'field_bug_not_in_page_': ['', Validators.pattern(/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/)],
      'field_describe_bug': '',
      //'field_bug_in_page': this.full_url,
      'field_browser': this.device.browserName + ' ' + this.device.browserVersion,
      'field_os': navigator.platform,
      'field_screen_size': screen.height + 'X' + screen.width,
      'body': '',
      'field_describe_feature': '',
      'field_better_site': '',
      'field_recommend_site': '',
      'field_upload_screenshots': ''
    });
 
   // this.feedbackForm.reset();

  }

  //to show form errors
  onValueChanged(data?: any) {
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      if(field != 'field_upload_screenshots'){
      this.formErrors[field] = '';
      const control = form.get(field);
      //for submitted empty fields
      if (!control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
     
    }
    }
  }
  //open modal
  open(content,e:Event) {

      this.userService.isLogedIn().subscribe(data => {
      this.checkUserLogin = data;
      if (data == false) { 
          e.preventDefault();
          this.router.navigate(['/access-denied']);
      } else {
        this.CurrentType=null;
        this.feedbackForm.reset();
        this.router.events.subscribe((event) => {
          this.full_url = this.document.location.href;
        });
      this.feedbackForm.controls['field_browser'].setValue(this.device.browserName + ' ' + this.device.browserVersion);
      this.feedbackForm.controls['field_os'].setValue(navigator.platform);
      this.feedbackForm.controls['field_screen_size'].setValue(screen.height + 'X' + screen.width);
      this.modalService.open(content).result.then((result) => {
        this.closeResult = 'Closed with: ${result}';
    }, (reason) => {
      this.closeResult = 'Dismissed ${this.getDismissReason(reason)}';
    });
      
      }//end else 
    });//end userservice isLogedIn
   
  }
  //close modal
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
    var hours = d.getHours();
    var minutes = d.getMinutes();
    var prefix;
    if (hours >= 12) {
      hours = hours - 12;
      prefix = 'PM';
    } else {
      prefix = 'AM';
    }
    var formatter = new Intl.DateTimeFormat("en", { month: "short" }),
      month1 = formatter.format(new Date(date))
    var datestring = hours + ":" + minutes + " " + prefix + " " + month1 + " " + day + " " + fullYear;
    return datestring;
  }
  checkFeedbackType(feedback) {
 
}

  uploadFile(event) {
    this.formErrors.field_upload_screenshots=[];
    const control = this.feedbackForm.controls['field_upload_screenshots'];
    //selected files ftom event
    console.log(event);
    if (event.srcElement) {
      let files = event.srcElement.files;
      for (var i = 0; i < files.length; i++) {
        this.fileArray[i] = {
          fid: '',
          file: '',
          filename: ''
        }

        var str = files[i].type;
        var n = str.search("image");
                  let file1:FileEntity

        //if type is image
        if (n !== -1) {

           NodeHelper.ConvertToBase64(files[i], this.fileArray[i]);

          if (files[i].size > 1048576) {
            this.validationMessages.field_upload_screenshots.validimagesize=files[i].name+' '+'exceeded 1MB please upload another photo';
            this.formErrors.field_upload_screenshots[i] = this.validationMessages.field_upload_screenshots.validimagesize;
          }
          this.fileArray[i].filename = files[i].name;
          } else {
          this.validationMessages.field_upload_screenshots.validateType=files[i].name+' '+'please choose an image';
          this.formErrors.field_upload_screenshots[i] = this.validationMessages.field_upload_screenshots.validateType;
        }
      }
    }
  }

  deviceInfo() {
    var objappVersion = navigator.appVersion;
    var objAgent = navigator.userAgent;
    var objbrowserName = navigator.appName;
    var objfullVersion = '' + parseFloat(navigator.appVersion);
    var objBrMajorVersion = parseInt(navigator.appVersion, 10);
    var objOffsetName, objOffsetVersion, ix;
    // In Chrome 
    if ((objOffsetVersion = objAgent.indexOf("Chrome")) != -1) {
      objbrowserName = "Chrome";
      objfullVersion = objAgent.substring(objOffsetVersion + 7);
    }
    // In Microsoft internet explorer
    else if ((objOffsetVersion = objAgent.indexOf("MSIE")) != -1) {
      objbrowserName = "Microsoft Internet Explorer";
      objfullVersion = objAgent.substring(objOffsetVersion + 5);
    }
    // In Firefox 
    else if ((objOffsetVersion = objAgent.indexOf("Firefox")) != -1) {
      objbrowserName = "Firefox";
    } // In Safari 
    else if ((objOffsetVersion = objAgent.indexOf("Safari")) != -1) {
      objbrowserName = "Safari";
      objfullVersion = objAgent.substring(objOffsetVersion + 7);
      if ((objOffsetVersion = objAgent.indexOf("Version")) != -1)
        objfullVersion = objAgent.substring(objOffsetVersion + 8);
    }
    // For other browser "name/version" is at the end of userAgent 
    else if ((objOffsetName = objAgent.lastIndexOf(' ') + 1) < (objOffsetVersion = objAgent.lastIndexOf('/'))) {
      objbrowserName = objAgent.substring(objOffsetName, objOffsetVersion);
      objfullVersion = objAgent.substring(objOffsetVersion + 1);
      if (objbrowserName.toLowerCase() == objbrowserName.toUpperCase()) {
        objbrowserName = navigator.appName;
      }
    }
    // trimming the fullVersion string at semicolon/space if present
    if ((ix = objfullVersion.indexOf(";")) != -1)
      objfullVersion = objfullVersion.substring(0, ix);
    if ((ix = objfullVersion.indexOf(" ")) != -1)
      objfullVersion = objfullVersion.substring(0, ix);
    objBrMajorVersion = parseInt('' + objfullVersion, 10);
    if (isNaN(objBrMajorVersion)) {
      objfullVersion = '' + parseFloat(navigator.appVersion);
      objBrMajorVersion = parseInt(navigator.appVersion, 10);
    }
    this.device.browserName = objbrowserName;
    this.device.browserVersion = objfullVersion;
  }

  SaveNode() {
    var now = Date.now();
    var feedback = this.feedback;
    console.log(feedback);
    if(this.full_name){
    feedback.title = this.feedbackForm.value.title = this.full_name + '_' + now;
    }else{
      this.full_name ='anoymous';
      feedback.title = this.feedbackForm.value.title = this.full_name + '_' + now;
    }
    feedback.field_want_submit.und = this.feedbackForm.value.field_want_submit;
    if (feedback.field_want_submit.und == "1185") {
      if (this.feedbackForm.value.field_describe_bug) {
        feedback.field_describe_bug.und[0].value = this.feedbackForm.value.field_describe_bug;
      }
      if (this.feedbackForm.value.field_browser) {
        feedback.field_browser.und[0].value = this.feedbackForm.value.field_browser;
      }
      if (this.feedbackForm.value.field_os) {
        feedback.field_os.und[0].value = this.feedbackForm.value.field_os;
      }
      if (this.feedbackForm.value.field_bug_not_in_page_) {
            feedback.field_bug_not_in_page_.und[0].url = this.feedbackForm.value.field_bug_not_in_page_;
        console.log(this.feedbackForm.value.field_bug_not_in_page_)
        delete (feedback.field_bug_in_page);
      } else {
       feedback.field_bug_in_page.und[0].url = this.full_url;
        delete (feedback.field_bug_not_in_page_);
      }
      if (this.feedbackForm.value.field_screen_size) {
        feedback.field_screen_size.und[0].value = this.feedbackForm.value.field_screen_size
      }
      if (this.feedbackForm.value.field_my_bug) {
        feedback.field_my_bug.und = this.feedbackForm.value.field_my_bug;
      } else {
        delete (feedback.field_my_bug);
      }
      if (this.feedbackForm.value.body) {
        feedback.body.und[0].value = this.feedbackForm.value.body;
      }
      delete (feedback.field_would_like);
      delete (feedback.field_describe_feature)
      delete (feedback.field_better_site);
      delete (feedback.field_recommend_site);
    }
    else if (feedback.field_want_submit.und == "1186") {
      if (this.feedbackForm.value.field_would_like) {
        feedback.field_would_like.und = this.feedbackForm.value.field_would_like;
      } else {
        delete (feedback.field_would_like);
      }
      if (this.feedbackForm.value.field_describe_feature) {
        feedback.field_describe_feature.und[0].value = this.feedbackForm.value.field_describe_feature;
      }
      delete (feedback.body);
      delete (feedback.field_my_bug);
      delete (feedback.field_screen_size);
      delete (feedback.field_bug_in_page);
      delete (feedback.field_bug_not_in_page_);
      delete (feedback.field_os);
      delete (feedback.field_browser);
      delete (feedback.field_screen_size);
      delete (feedback.field_better_site);
      delete (feedback.field_recommend_site);
    }else if (feedback.field_want_submit.und == "1187") {
      if (this.feedbackForm.value.field_better_site) {
        feedback.field_better_site.und[0].value = this.feedbackForm.value.field_better_site;
      }
      if (this.feedbackForm.value.field_recommend_site) {
        feedback.field_recommend_site.und[0].value = this.feedbackForm.value.field_recommend_site;
      }
      delete (feedback.body);
      delete (feedback.field_my_bug);
      delete (feedback.field_screen_size);
      delete (feedback.field_bug_in_page);
      delete (feedback.field_bug_not_in_page_);
      delete (feedback.field_os);
      delete (feedback.field_screen_size);
      delete (feedback.field_would_like);
      delete (feedback.field_describe_feature);
      delete (feedback.field_browser);
      delete (feedback.field_upload_screenshots);
      delete (feedback.field_describe_bug);
    }
    console.log(this.feedbackForm);
    console.log(feedback);
    this.nodeService.createNode(this.feedback).subscribe((NewNode) => {
      console.log(NewNode.nid);
      this.NID = NewNode.nid;
      this.submitted=true

    }, err => {
      console.log(err);
    });
  }
  onSubmit(value, type) {
  if(this.CurrentType){
   this.feedbackForm.controls['field_want_submit'].setValue(this.CurrentType);
  }
  if(this.BugType){
    this.feedbackForm.controls['field_my_bug'].setValue(this.BugType);
  }
  if(this.FeatureType){
    this.feedbackForm.controls['field_would_like'].setValue(this.FeatureType)
  }
    var feedback = this.feedback;
    console.log(this.feedback)
    this.onValueChanged();
    if(this.fileArray.length != 0){
      for (let i = 0; i < this.fileArray.length; i++) {
        this.fileArray[i].file = NodeHelper.RemoveFileTypeFromBase64(this.fileArray[i].file)
      }
    }
    // if (!this.feedbackForm.value.field_bug_not_in_page_ && !this.full_url) {
    //   this.formErrors.field_bug_not_in_page_ = this.validationMessages.field_bug_not_in_page_.validateRequired;
    // }
    if (this.feedbackForm.valid && this.formErrors.field_upload_screenshots.length == 0 && this.formErrors.field_bug_not_in_page_ == '') {

      if (this.feedbackForm.value.field_upload_screenshots) {
        var tasks = [];

        this.fileArray.forEach((element, index) => {
          tasks.push(this.fileService.SendCreatedFile(element));
        });
        let source = Observable.forkJoin(tasks).subscribe(
          (x) => {
            this.fileArray.forEach((element, index) => {
              let file = x[index] as FileEntity;
              this.feedback.field_upload_screenshots.und.push({ fid: file.fid });
            });
          }, (err) => {
            console.log(err);
          }, () => {
            this.SaveNode();
          });
      } else {
        this.SaveNode();
      }

    }

  }

  resetNID() {
    this.feedbackForm.reset();
    this.submitted = false;
    delete(this.CurrentType);
  }


}
