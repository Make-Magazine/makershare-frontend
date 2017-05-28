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
  styles: [`
    #page-404 {
          position: fixed;
          overflow: hidden;
          text-align: center;
          width: 100%;
          height: 100vh;
      }
      #page-404 .image-container img {
        width: 100%;
        display: block;
        height: 100%;
        background-size: cover;
      }
      #page-404 .image-container::before {
        content: '';
        display: block;
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        opacity: 0.65;
        background: url(./assets/images/background/background-pattern.png) 90%;
      }
      #page-404 .text-block {
        position: absolute;
        bottom: 20px;
        right: 90px;
        padding: 15px;
        background-color: transparent;
      }
      #page-404 .text-block h4, #page-404 .text-block p {
        color: #fff;
        font-family: "Messina Sans Regular";
        font-weight: 500;
      }
      #page-404 .text-block h4 {
        font-size: 1.4rem;
      }
      #page-404 .text-block p {
        margin-bottom: 0;
        font-size: 1rem;
      }
      #page-404 .text-block ul {
        margin-top: 15px;
      }
      #page-404 .text-block ul li {
        display: inline-block;
      }
      #page-404 .text-block ul li:not(:first-of-type) a {
        padding-left: 10px;
        border-left: 3px solid #fff;
      }
      #page-404 .text-block ul li a {
        color: #00AEEF;
        padding-right: 10px;
        font-size: 1.2rem;
      }
      #page-404 .text-block ul li a:hover {
        text-decoration: none;
      }
      #page-404 .text-block input::-webkit-input-placeholder {
        color: #fff;
        font-size: 1.2rem;
        font-family: "Messina Sans Modern";
      }
      #page-404 .text-block input:-moz-placeholder {
        color: #fff;
        font-size: 1.2rem;
        font-family: "Messina Sans Modern";
      }
      #page-404 .text-block input::-moz-placeholder {
        color: #fff;
        font-size: 1.2rem;
        font-family: "Messina Sans Modern";
      }
      #page-404 .text-block input:-ms-input-placeholder {
        color: #fff;
        font-size: 1.2rem;
        font-family: "Messina Sans Modern";
      }
      #page-404 .text-block input:focus::-webkit-input-placeholder { color:transparent; }
      #page-404 .text-block input:focus:-moz-placeholder { color:transparent; } /* FF 4-18 */
      #page-404 .text-block input:focus::-moz-placeholder { color:transparent; } /* FF 19+ */
      #page-404 .text-block input:focus:-ms-input-placeholder { color:transparent; } /* IE 10+ */
      #page-404 .search-form-group {
        position: relative;
      }
      #page-404 .search-form-group h3 {
        color: white;
        font-size: 1.8rem;
      }
      #page-404 .search-form-group #search-box-input-404 {
        width: 100%;
        color: white;
        background: transparent;
        border: 0 none;
        border-bottom: 1px solid white;
        padding: 10px;
      }
      #page-404 .search-form-group .search-form-group {
        position: relative;
        max-width: 100%;
        margin-top: 20px;
        width: 400px;
        display: block;
        margin-right: auto;
        margin-left: auto;
      }
      #page-404 .search-form-group .go-search {
        color: #fff;
        font-size: 1.3rem;
        position: absolute;
        bottom: 10px;
        right: 0px;
        cursor: pointer;
      }
      #page-404 .search-form-group .clear-search {
        color: #fff;
        bottom: 13px;
        position: absolute;
        right: 25px;
        font-size: 1rem;
      }
      @media (max-width: 992px) {
        #page-404 .text-block {
            left: 0;
            right: 0;
            width: 320px;
            margin: auto;
            bottom: 10%;
        }
      }
      @media (min-width: 1200px) {
          #page-404 .text-block { 
             
          }
      }
  `]
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
