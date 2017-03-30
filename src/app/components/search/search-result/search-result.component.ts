import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { SolrService } from '../../../d7services/solr/solr.service';
import { SearchInputComponent } from './../search-input/search-input.component';
import { ProjectCardComponent } from '../../shared/shared.module';
import { UserCardComponent } from '../../shared/shared.module';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  searchFailed = false;
  query: string;
  projects = [];
  challenges = [];
  showcases = [];
  learning = [];
  users = [];

  // Counts
  projectsCount = 0;
  challengesCount = 0;
  showcasesCount = 0;
  learningCount = 0;
  usersCount = 0;
  

  project_view = 'grid';
  constructor(
    private solrService: SolrService,
    private router: Router,
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
              
              console.log(result);
              return result.response.docs;
            })
          }
          return [];
        }
      )
  };

  ngOnInit() {
  }

  itemSelected(item) {
    
    this.router.navigate(['/project/view/', item.ss_item_entity_id]);
  }

  searchQuery(){
    
    if(this.query.length == 0) {
      return;
    }
    // projects
    this.solrService.selectProjects(this.query, 6).subscribe(result => {
      console.log(result);
      console.log(result.response.docs);
      this.projects = [];
      this.projects = result.response.docs;
      this.projectsCount = result.response.numFound;
    }, err => {
      console.log(err);
    });

    // challenges
    this.solrService.selectChallenges(this.query, 6).subscribe(result => {
      console.log(result.response.docs);
      this.challenges = [];
      this.challenges = result.response.docs;
      this.challengesCount = result.response.numFound;
    }, err => {
      console.log(err);
    });  

    // showcases
    this.solrService.selectShowcases(this.query, 6).subscribe(result => {
      console.log(result.response.docs);
      this.showcases = [];
      this.showcases = result.response.docs;
      this.showcasesCount = result.response.numFound;
    }, err => {
      console.log(err);
    });    

    // learning
    this.solrService.selectLearning(this.query, 6).subscribe(result => {
      console.log(result.response.docs);
      this.learning = [];
      this.learning = result.response.docs;
      this.learningCount = result.response.numFound;
    }, err => {
      console.log(err);
    });        

    // users
    this.solrService.selectUsers(this.query, 6).subscribe(result => {
      console.log(result.response.docs);
      this.users = [];
      this.users = result.response.docs;
      this.usersCount = result.response.numFound;
    }, err => {
      console.log(err);
    });      
  }

}
