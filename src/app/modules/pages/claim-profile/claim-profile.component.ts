import { Component, OnInit, } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainService } from 'app/CORE/d7services/main/main.service';
import { Auth } from 'app/modules/auth0/auth.service';
import { Meta, Title } from '@angular/platform-browser';
import { Singleton } from 'app/CORE/';

@Component({
  selector: 'app-claim-profile',
  templateUrl: './claim-profile.component.html',
})
export class ClaimProfileComponent implements OnInit {
  private token: string;
  private key: string;
  success: boolean = false;
  missing = false;
  errorMsg: boolean = false;
  email: string;
  constructor(
    private route: ActivatedRoute,
    private mainService: MainService,
    public auth: Auth,
    title: Title,
    meta: Meta

  ) {
    title.setTitle('Claim Profile | Maker Share');
    meta.addTags([
      {
        name: 'description', content: 'If you already have a Maker Faire login, use it to login. If not, then Signup using this email address.'
      },
      {
        name: 'image', content: Singleton.Settings.AppURL + 'assets/images/logos/maker-share-logo-clr@2x-100.jpg.jpg'
      }
    ])
  }

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

        this.mainService.custompost('maker_claim/activate', body).subscribe(data => {
          // console.log(data);
          if (data.status == "activated") {
            this.success = true;
            this.email = data.email;
          }

        }, err => {
          //console.log(err);
          this.errorMsg = true;
          //this.errorMsg = 'Your account is already claimed, if you have a problem with claimming your profile please contact the community administrator.'



        });


      } else {
        this.missing = true;
      }
    });
  }

}