import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { SolrService } from '../../../d7services/solr/solr.service';
import { LoaderService } from '../../shared/loader/loader.service';
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-all-result',
  templateUrl: './all-result.component.html',
})
export class AllResultComponent implements OnInit {
  query: Observable<string>;
  term: string;
  result = [];
  type: string;
  heading: string;
  resultCount = 0;
  rowsNumber = 0;
  project_view = 'grid';
  constructor(
    private route: ActivatedRoute,
    private solrService: SolrService,
    private loaderService: LoaderService,
  ) { }

  ngOnInit() {
    this.query = this.route.queryParams.map(params => params['query'] || 'None');
    this.query.subscribe(query => {
      this.term = decodeURIComponent(query);
      this.route.params.subscribe(params => {
        this.type = params['type'];
        this.heading = params['type'] + 's';
        if (this.type == 'maker') {
          this.getResultMaker();
        } else {
          this.getResultContent();
        }

      });

    })
  }

  getResultContent() {
    this.loaderService.display(true);
    this.solrService.selectContent(this.term, 2, this.rowsNumber, this.type).subscribe(result => {
      //this.result = result.response.docs;
      this.result = this.result.concat(result.response.docs);
      this.resultCount = result.response.numFound;
      this.loaderService.display(false);
    }, err => {
      this.loaderService.display(false);
    });
  }

  getResultMaker() {
    this.loaderService.display(true);
    this.solrService.selectUsers(this.term, 2, this.rowsNumber).subscribe(result => {
      this.result = this.result.concat(result.response.docs);
      this.resultCount = result.response.numFound;
      this.loaderService.display(false);
    }, err => {
      this.loaderService.display(false);
    });
  }

  loadMore() {
    this.rowsNumber = this.rowsNumber + 2;
    if (this.type == 'maker') {
      this.getResultMaker();
    } else {
      this.getResultContent();
    }

  }

}
