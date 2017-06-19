import { Component, OnInit, } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainService } from '../../../d7services/main/main.service';
import { Auth } from '../../../auth0/auth.service';

@Component({
  selector: 'app-claim-profile',
  templateUrl: './claim-profile.component.html',
})
export class ClaimProfileComponent implements OnInit {
  private token: string;
  private key: string;
  success: boolean = false;
  missing = false;
  errorMsg: string;
  email: string;
  constructor(
    private route: ActivatedRoute,
    private mainService: MainService,
    public auth: Auth,    
  ) { }

  ngOnInit() {
    // Capture the access token and code
    this.route.queryParams.subscribe(params => {

      if (typeof (params.token) !== 'undefined' || typeof (params.key) !== 'undefined') {
        // have the parameters, should check if not empty
        this.token = params.token;
        this.key = params.key;
        // should send the request
        let body = {
          token: this.token,
          key: this.key
        }

        this.mainService.post('/api/maker_claim/activate', body).map(res => res.json()).subscribe(data => {
          console.log(data);
          if(data.status == "activated"){
            this.success = true;
            this.email = data.email;
          }
          
        }, err => {
          console.log(err);
          if(err.statusText == ": already claimed"){
            this.errorMsg = 'Your account is already claimed, if you have a problem with claimming your profile please contact the community administrator.'
          }else if (err.statusText == ": not valid"){
            this.errorMsg = 'Sorry, this link is not valid, please contact the community administrator to generate a new link';
          }else {
            this.errorMsg = 'Sorry, this link is not valid, please contact the community administrator to generate a new link';
          }


        });


      } else {
        this.missing = true;
      }
    });
  }

}
