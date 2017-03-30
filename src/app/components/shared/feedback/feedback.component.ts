import { Component, OnInit, Input} from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TaxonomyService } from '../../../d7services/taxonomy/taxonomy.service'
import { TaxonomyTerm } from '../../../models/Drupal/taxonomy-term';


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

 closeResult: string;
  @Input() PageUrl;
  @Input() PageTitle;
  @Input() PageDescription;
  @Input() PageImage;
  constructor(
      private modalService: NgbModal,
      private fb: FormBuilder,
      private taxonomyService: TaxonomyService,

) { }

  ngOnInit() {
    this.feedbackForm = new FormGroup({
       field_want_submit: new FormControl(),
       field_my_bug:new FormControl(),
       field_would_like:new FormControl(),
       field_bug_not_in_page_	:new FormControl(),
       field_bug_in_page:new FormControl(),
       field_browser:new FormControl(),
       field_os:new FormControl(),
       field_screen_size:new FormControl(),
       body:new FormControl(),
       field_describe_feature: new FormControl(),
       field_better_site:new FormControl(),
       field_recommend_site:new FormControl(),
       field_upload_screenshots:new FormControl()
    });
    //feedback types
      this.taxonomyService.getVocalbularyTerms(27).subscribe((data: TaxonomyTerm[]) => {
      this.feedback_types = data;
      console.log('feedback_types');
      console.log(data);
    });
    //bug types
      this.taxonomyService.getVocalbularyTerms(26).subscribe((data: TaxonomyTerm[]) => {
      this.bug_types = data;
      console.log('bug_types');
      console.log(data);
    }); 
    //feature
      this.taxonomyService.getVocalbularyTerms(28).subscribe((data: TaxonomyTerm[]) => {
      this.features = data;
      console.log('features');
      console.log(data);
    });
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
 checkFeedbackType(id){
   console.log('ghaddadaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
 }
}


