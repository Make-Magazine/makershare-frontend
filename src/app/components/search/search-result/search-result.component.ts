import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { SolrService } from '../../../d7services/solr/solr.service';
import { SearchInputComponent } from './../search-input/search-input.component';
import { ProjectCardComponent,UserCardComponent, ChallengeCardComponent, ShowcaseCardComponent, LearnCardComponent } from '../../shared/shared.module';
import { LoaderService } from '../../shared/loader/loader.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
})
export class SearchResultComponent implements OnInit {
  urlQuery: Observable<string>;
  searchFailed = false;
  query: string;
  searchTerm : string;
  projects = [];
  challenges = [];
  showcases = [];
  workshops = [];
  users = [];

  // Counts
  projectsCount = 0;
  challengesCount = 0;
  showcasesCount = 0;
  workshopsCount = 0;
  usersCount = 0;
  
  //Query Counts
  projectsCountQuery = 6;
  challengesCountQuery = 3;
  showcasesCountQuery = 3;
  workshopsCountQuery = 3;
  usersCountQuery = 6;


  project_view = 'grid';
  constructor(
    private solrService: SolrService,
    private router: Router,
    private route: ActivatedRoute,
    private loaderService: LoaderService,
  ) { }


  search = (text$: Observable<string>) =>{
    return text$
      .debounceTime(300)
      .distinctUntilChanged()
      .do(() => this.searchFailed = false)
      .switchMap((query) => 
        {
          this.query = query;
          if(query.length > 1){
            return this.solrService.autocomplete(query)
            .map(result => {
              
              
              return result.response.docs;
            })
          }
          return [];
        }
      )
  };

  ngOnInit() {

    this.urlQuery = this.route.queryParams.map(params => params['query'] || 'None');
    this.urlQuery.subscribe(query => {
      if(query.length > 0){
        this.query = decodeURIComponent(query);
        this.searchQuery();
      }
      
    });


  }

  itemSelected(item) {
    
    this.router.navigate(['/project/view/', item.ss_item_entity_id]);
  }

  searchQuery(){
    this.loaderService.display(true);
    if(this.query.length == 0) {
      return;
    }

    this.searchTerm = this.query;

    // projects
    this.solrService.selectProjects(this.query, this.projectsCountQuery).subscribe(result => {
      this.projects = [];
      this.projects = result.response.docs;
      this.projectsCount = result.response.numFound;
    }, err => {
      console.log(err);
    });

    // challenges
    this.solrService.selectChallenges(this.query, this.challengesCountQuery).subscribe(result => {
      this.challenges = [];
      this.challenges = result.response.docs;
      this.challengesCount = result.response.numFound;
    }, err => {
      console.log(err);
    });  

    // showcases
    this.solrService.selectShowcases(this.query, this.showcasesCountQuery).subscribe(result => {
      this.showcases = [];
      this.showcases = result.response.docs;
      this.showcasesCount = result.response.numFound;
    }, err => {
      console.log(err);
    });    

    // workshops
    this.solrService.selectworkshops(this.query, this.workshopsCountQuery).subscribe(result => {
      this.workshops = [];
      this.workshops = result.response.docs;
      this.workshopsCount = result.response.numFound;
    }, err => {
      console.log(err);
    });        

    // users
    this.solrService.selectUsers(this.query, this.usersCountQuery).subscribe(result => {
      this.users = [];
      this.users = result.response.docs;
      this.usersCount = result.response.numFound;
      this.loaderService.display(false);
    }, err => {
      console.log(err);
      this.loaderService.display(false);
    });      
  }

  searchTypeNavigate(type: string){
    let navigationExtras: NavigationExtras = {
      queryParams: { 'query': encodeURIComponent(this.query) },
      // fragment: 'anchor'
    };    
     this.router.navigate(['/search', type], navigationExtras);
  }
}
