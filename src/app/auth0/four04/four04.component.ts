import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { SolrService } from '../../d7services/solr/solr.service';
import { UserService } from '../../d7services';
import { Auth } from '../auth.service';
import { SearchBoxComponent } from '../../components/general/header/search-box/search-box.component';
import { ProfilePictureService } from '../../components/shared/profile-picture/profile-picture.service';

@Component({
  selector: 'app-four04',
  templateUrl: './four04.component.html',
})
export class Four04Component implements OnInit {
  searchQuery: string = '';
  showSearchBox: boolean = false;
  user_photo: string;
  displayRegistration:boolean = false;
  constructor(
    private router: Router,
    private solrService: SolrService,
    private userService: UserService,
    public auth: Auth,
    private profilePictureService: ProfilePictureService,
  ) { }
  ngOnInit() {

  }
  goSearch() {
    this.solrService.autocomplete(this.searchQuery).subscribe(res=>{
      if(res.response.numFound == 0){
        // this.router.navigate(['/']);
        // this.boxStatus = false;
        // this.closeSearchBox();
        return;
      }else {
          // this.boxStatus = false;
          // this.notify.emit();
          let navigationExtras: NavigationExtras = {
            queryParams: { 'query': encodeURIComponent(this.searchQuery) },
            // fragment: 'anchor'
          };
          this.router.navigate(['/search'], navigationExtras);
      }
    })
    
  }

  keyDownFunction(event) {
    if(event.keyCode == 13 && this.searchQuery.length > 0) {
      this.goSearch();
    }else if(event.keyCode == 13 && this.searchQuery.length == 0){
      // this.closeSearchBox();
    }
  }
  clearSearch() {
    this.searchQuery = '';
  }
  openSearchBox() {
    this.showSearchBox = true;
  }

  onNotify(event) {
    this.showSearchBox = false;
  }
  showRegistration(){
    this.displayRegistration = true;
  }
  hideRegisteration(event){
    this.displayRegistration = false;   
  }
}
