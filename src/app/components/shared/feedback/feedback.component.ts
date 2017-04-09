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
  submitted = false;
  field_upload_screenshots: FileEntity
  NID=false;
  formErrors = {
    'field_want_submit': '',
    'field_recommend_site': '',
    'field_bug_not_in_page_':''

  };
  validationMessages = {
    'field_want_submit': { required: 'please select a value ' },
    'field_recommend_site': {},
    'field_bug_not_in_page_':{ pattern:'please enter a valid url'}
  };
  closeResult: string;
  imagedata: any;
  CurrentType: number;
  fileArray=[
    {
      fid:'',
      file:'',
      filename:''
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
      und: ''
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
        value: ''
      }]
    },
    field_bug_in_page: {
      und: [{
        value: ''
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
      und: [
        {
          fid: ''
        }
      ]
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
    @Inject(DOCUMENT) private document: any,
    private fileService: FileService,
  ) {
    this.full_url = this.document.location.href;
  }

  ngOnInit() {
    this.deviceInfo();
    //var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    var todayDate = new Date();
    this.date = this.changeDateFormat(todayDate);
    this.username = localStorage.getItem('user_name');

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
// var x= /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test('http://www.ahmed.fg');
// console.log('regeeeeeeeeeex')
// console.log(x)
  }

  buildform() {
    // field_want_submit=this.feedback.field_want_submit;
    this.feedbackForm = this.fb.group({
      // We can set default values by passing in the corresponding value or leave blank if we wish to not set the value. For our example, we’ll default the gender to female.
      'field_want_submit': ['', Validators.required],
      'field_my_bug': '',
      'field_would_like': '',
      //url validation
      'field_bug_not_in_page_':['', Validators.pattern(/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/)],
      'field_describe_bug':'',
      'field_bug_in_page': this.full_url,
      'field_browser': this.device.browserName + ' ' + this.device.browserVersion,
      'field_os': navigator.platform,
      'field_screen_size': screen.height + 'X' + screen.width,
      'body': '',
      'field_describe_feature': '',
      'field_better_site': '',
      'field_recommend_site': '',
      'field_upload_screenshots': ''
    });
    this.feedbackForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now
  }

  //to show form errors
  onValueChanged(data?: any) {
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      //for submitted empty fields
      console.log(this.submitted);
      if (!control.valid && this.submitted) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
      // if (control && (control.dirty || data == "save") && !control.valid) {
      //   console.log('second_case');
      //   const messages = this.validationMessages[field];
      //   for (const key in control.errors) {
      //     this.formErrors[field] += messages[key] + ' ';
      //   }
      // }

    }
  }
  //open modal
  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = 'Closed with: ${result}';
    }, (reason) => {
      this.closeResult = 'Dismissed ${this.getDismissReason(reason)}';
    });
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
    // month + " " + day + "," + " " + fullYear;
    var formatter = new Intl.DateTimeFormat("en", { month: "short" }),

      month1 = formatter.format(new Date(date))

    var datestring = hours + ":" + minutes + " " + prefix + " " + month1 + " " + day + " " + fullYear;
    return datestring;
  }

  checkFeedbackType(feedback) {
  }

  uploadFile(event) {
    const control = this.feedbackForm.controls['field_upload_screenshots'];
    //selected files ftom event
    if(event.srcElement){
    let files = event.srcElement.files;
  //  if (files.length !== 0 ){
  //    for (var i = 0; i < files.length; i++) { 
  //         var str = files[i].type;
  //         var n = str.search("image");
  //       if (n !== -1 && files[i].size < 5242880) {
  //       NodeHelper.ConvertToBase64(files[i],this.fileArray[i]);
       
  //       //this.file.filename = files[0].name;
  //     }
  //    }
  //       console.log(this.fileArray);

  //  }
    if (files.length == 1 && files[0]) {
      var str = files[0].type;
      var n = str.search("image");
      //if type is image
      if (n !== -1 && files[0].size < 5242880) {
        NodeHelper.ConvertToBase64(files[0], this.file);
        console.log(files[0]);
       
        this.file.filename = files[0].name;
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

  SaveNode(){
    var now = Date.now();
      var feedback = this.feedback;
      console.log(feedback);
      feedback.title = this.feedbackForm.value.title = this.username + '_' + now;
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
        if (this.feedbackForm.value.field_bug_not_in_page_.length == 0) {
          feedback.field_bug_in_page.und[0].value = this.feedbackForm.value.field_bug_in_page;
          delete (feedback.field_bug_not_in_page_);
        } else {
          feedback.field_bug_not_in_page_.und[0].value = this.feedbackForm.value.field_bug_not_in_page_;
          delete (feedback.field_bug_in_page);
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
      } else if (feedback.field_want_submit.und == "1187") {
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
        delete(feedback.field_browser);
        delete(feedback.field_upload_screenshots);
        delete(feedback.field_describe_bug);
      }
      console.log(feedback);
      this.nodeService.createNode(this.feedback).subscribe((NewNode) => {
        console.log(NewNode.nid);
        this.NID=NewNode.nid;
      }, err => {
        console.log(err);
        // this.notificationBarService.create({ message: 'Project not saved , check the logs please', type: NotificationType.Error});
      });
  }

  onSubmit(value) {
    var feedback = this.feedback;
    this.submitted = true;
    this.onValueChanged();
    this.file.file = NodeHelper.RemoveFileTypeFromBase64(this.file.file)
    if (this.feedbackForm.valid) {
      if (this.file.file) {
        this.fileService.SendCreatedFile(this.file).subscribe((NewFile) => {
          this.file.fid = NewFile.fid;
          this.feedback.field_upload_screenshots.und = [];
          this.feedback.field_upload_screenshots.und.push({fid:NewFile.fid});
          this.SaveNode();
        //  feedback.field_upload_screenshots.und[0].fid = this.file.fid
        }, err => {
          console.log(err);
          // this.notificationBarService.create({ message: 'Project not saved , check the logs please', type: NotificationType.Error});
        });
      }else{
        this.SaveNode()
      }

    }

  }

}



