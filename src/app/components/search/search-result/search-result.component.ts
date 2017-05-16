import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { SolrService } from '../../../d7services';
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

  // Filter
  filter = {
    projects: false,
    showcases: false,
    challenges: false,
    learning: false,
    makers: false,
  }
  selectedAll = true;

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
              var newResult = [];
              result.response.docs.forEach(element => {
                if(element.tm_title && element.tm_title.length > 0){
                  newResult.push(element.tm_title[0]);
                }else if (element.tm_name && element.tm_name.length > 0){
                  newResult.push(element.tm_name[0]);
                }
                
              });
              
              return newResult;
            })
          }
          return [];
        }
      )
  };

  ngOnInit() {
    this.query = '';
    this.urlQuery = this.route.queryParams.map(params => params['query'] || null);
    this.urlQuery.subscribe(query => {
      if(query && query.length > 0){
        this.query = decodeURIComponent(query);
        this.searchQuery();
      }
      
    });


  }

  itemSelected(item) {
    this.searchURL(item);
  }


  searchURL(item){ 
    if(item.length > 0){
      this.query = item;
    }     
    let navigationExtras: NavigationExtras = {
      queryParams: { 'query': encodeURIComponent(this.query) },
      // fragment: 'anchor'
    };
    this.router.navigate(['/search'], navigationExtras);    
  }

  searchQuery(){

    if(this.query.length < 4){
      return;
    }

    this.loaderService.display(true);
    if(this.query.length == 0) {
      return;
    }

    this.searchTerm = this.query;

    // projectsis_status:1
    if(this.filter.projects || this.selectedAll == true){
      
      this.solrService.selectProjects(this.query, this.projectsCountQuery).subscribe(result => {
        this.projects = [];
       // console.log(this.projects)
        this.projects = result.response.docs;
        this.projectsCount = result.response.numFound;
        this.loaderService.display(false);
      }, err => {
       // console.log(err);
      });
    }
    
    // challenges
    if(this.filter.challenges || this.selectedAll == true){
      
      this.solrService.selectChallenges(this.query, this.challengesCountQuery).subscribe(result => {
        this.challenges = [];
        this.challenges = result.response.docs;
        this.challengesCount = result.response.numFound;
        this.loaderService.display(false);
      }, err => {
       // console.log(err);
      });  
    }

    // showcases
    if(this.filter.showcases || this.selectedAll == true){
  
      this.solrService.selectShowcases(this.query, this.showcasesCountQuery).subscribe(result => {
        this.showcases = [];
        this.showcases = result.response.docs;
        this.showcasesCount = result.response.numFound;
        this.loaderService.display(false);
      }, err => {
      //  console.log(err);
      });    
    }

    // workshops
    if(this.filter.learning || this.selectedAll == true){
     
      this.solrService.selectworkshops(this.query, this.workshopsCountQuery).subscribe(result => {
        this.workshops = [];
        this.workshops = result.response.docs;
        this.workshopsCount = result.response.numFound;
        this.loaderService.display(false);
      }, err => {
       // console.log(err);
      });        
    }
    
    // users
    if(this.filter.makers || this.selectedAll == true){

      this.solrService.selectUsers(this.query, this.usersCountQuery).subscribe(result => {
        this.users = [];
        this.users = result.response.docs;
        this.usersCount = result.response.numFound;
        this.loaderService.display(false);
      }, err => {
       // console.log(err);
      });      
    }
    
  }

  CheckFilter(){

    if(this.filter.projects == true){
      this.selectedAll = false;
    }
    if(this.filter.showcases == true){
      this.selectedAll = false;
    }
    if(this.filter.challenges == true){
      this.selectedAll = false;
    }
    if(this.filter.learning == true){
      this.selectedAll = false;
    }
    if(this.filter.makers == true){
      this.selectedAll = false;
    }
    if(!this.filter.projects && !this.filter.showcases && !this.filter.learning && !this.filter.challenges && !this.filter.makers){
      this.selectedAll = true;
    }
    if(this.query.length > 0){
      this.loaderService.display(true);
      this.clearResults();
      this.searchQuery();
      

    }
    
  }

  searchTypeNavigate(type: string){
    let navigationExtras: NavigationExtras = {
      queryParams: { 'query': encodeURIComponent(this.query) },
      // fragment: 'anchor'
    };    
     this.router.navigate(['/search', type], navigationExtras);
  }

  clearResults() {
    this.projects = [];
    this.challenges = [];
    this.showcases = [];
    this.workshops = [];
    this.users = [];
  }

  ShowEmptyResult() {
    if(this.projects.length == 0 &&
      this.showcases.length == 0 &&
      this.challenges.length == 0 &&
      this.workshops.length == 0 &&
      this.users.length == 0){
        return true;
    }else{
      return false;
    }
  }
  clearQuery() {
    this.query = '';
  }
  keyDownFunction(event) {
    if(event.keyCode == 13 && this.searchQuery.length > 0) {
      this.searchURL('');
    }
  }
}
