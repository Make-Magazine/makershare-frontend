import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomValidators } from 'ng2-validation';
import { Observable } from 'rxjs/Observable';
import {
  FileService,
  MainService,
  NodeService,
} from '../../../core/d7services';
import {
  EntityProxy,
  FC_MakerMembership,
  FileEntity,
  NodeHelper,
  Organization,
  Singleton,
} from '../../../core/models';
import { KeyValueObject } from '../../../core/models/object/key-value-object';
// import { State, Store } from '@ngrx/store';
// import { CountriesShape, COUNTRIES_SET } from '../../../core/store/countries-reducer';
import { ViewService } from '../../../core/d7services/view/view.service';

export function countryValid(countriesList): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    const match = countriesList.filter(c => {
      return c.key == control.value;
    })[0];
    return match ? null : { countryValid: { value: control.value } };
  };
}

@Component({
  selector: 'app-org-form',
  templateUrl: './org-form.component.html',
})
export class OrgFormComponent implements OnInit {
  currentFormTab: string = 'Basic Info';
  organizationProxy = new EntityProxy(new Organization());
  organizationReady: boolean = false;
  orgFormValid: boolean = false;
  organizationForm: FormGroup;
  canNavigate: boolean = true;
  processLog: string = '';
  errorLogs: string[] = [];
  countries: KeyValueObject[] = [];

  constructor(
    private nodeService: NodeService,
    private fileService: FileService,
    private formBuilder: FormBuilder,
    private mainService: MainService,
    private viewService: ViewService,
    private router: Router,
    private modalService: NgbModal,
    // private _store: Store<State<CountriesShape>>,
  ) {}

  ngOnInit() {
    const uid = +localStorage.getItem('user_id');
    const body = {
      uid: uid,
    };

    this.mainService
      .custompost('company_profile_api/my_org_profile', body)
      .subscribe(res => {
        if (res[0]) {
          this.router.navigate([res[0].path, 'edit']);
          this.convertToForm(res[0].nid);
        } else {
          // Load countries
          this.getCountries();
        }
      });
  }

  /**
   * getCountries
   */
  getCountries() {
    this.viewService
      .getView<KeyValueObject[]>('maker_address_api')
      .subscribe(countries => {
        this.countries = countries;

        this.buildForm();
        this.organizationReady = true;

        // this._store.dispatch({ type: COUNTRIES_SET, payload: countries });

        /*const countryKey = this.organizationForm.value.field_orgs_address
          .country;
        if (countryKey) {
          const index = countries
            .map(element => element.key)
            .indexOf(countryKey);
          this.getCountryDetails(countries[index]);
        }*/
      });
  }

  convertToForm(nid: number) {
    const tasks = [];
    let getOrganization;
    this.nodeService.getNode(nid).subscribe(
      org => {
        getOrganization = org;
        const organization = <Organization>this.organizationProxy.entity;
        Object.keys(organization).forEach(key => {
          const field = organization.getField(key);
          if (field instanceof Function) {
            return;
          }
          if (key != 'title' && (!org[key] || !org[key].und)) {
            return;
          }
          const valueFields = [
            'body',
            'field_breif_info',
            'field_maker_motto',
            'field_minimum_number_of_follower',
            'field_founder_name',
            'field_orgs_phone',
            'field_website_blog',
            'field_type_of_business',
          ];
          const imageFields = [
            'field_orgs_logo',
            'field_orgs_cover_photo',
            'field_org_avatar',
          ];
          if (valueFields.indexOf(key) != -1) {
            field.updateValue(org[key].und[0].value);
            return;
          } else if (key == 'title') {
            organization.title = org.title;
            organization.nid = nid;
            organization.language = org.language;
          } else if (key == 'field_orgs_type') {
            organization.updateField(key, org[key].und[0].value);
            return;
          } else if (key == 'field_orgs_contact') {
            organization.updateField(key, org[key].und[0].email);
            return;
          } else if (imageFields.indexOf(key) != -1) {
            const fileEntity = new FileEntity();
            org[key].und[0].file = org[key].und[0].uri.replace(
              'public://',
              Singleton.Settings.getBackEndUrl() + 'sites/default/files/',
            );
            fileEntity.updateValue(org[key].und[0]);
            this.organizationProxy[key] = fileEntity;
          } else if (key == 'field_founded_date') {
            const fulldate = org[key].und[0].value.split('-');
            const date = { date: fulldate[0] };
            field.updateValue(date);
          } else if (key == 'field_orgs_projects') {
            this.organizationProxy[key] = org[key].und.map(
              element => element.target_id,
            );
          } else if (key == 'field_orgs_address') {
            field.updateValue(org[key].und[0]);
          } else if (key == 'field_social_accounts') {
            tasks.push(
              this.mainService.get(
                'entity_field_collection_item',
                org[key].und[0].value,
              ),
            );
          } else if (key == 'field_maker_memberships') {
            org[key].und.forEach(element => {
              tasks.push(
                this.mainService.get(
                  'entity_field_collection_item',
                  element.value,
                ),
              );
            });
          }
        });
      },
      err => console.log(err),
      () => {
        const source = Observable.forkJoin(tasks);
        source.subscribe(x => {
          let index = 0;
          const members = [];
          if (getOrganization['field_maker_memberships'].und) {
            getOrganization['field_maker_memberships'].und.forEach(element => {
              const member = new FC_MakerMembership();
              if (x[index]['field_team_member'].und) {
                const ID = x[index]['field_team_member'].und[0].target_id;
                member.updateField('field_team_member', ID);
              }
              console.log(x[index]['field_anonymous_member_name']);
              if (x[index]['field_anonymous_member_name'].und) {
                const name =
                  x[index]['field_anonymous_member_name'].und[0].value;
                member.updateField('field_anonymous_member_name', name);
              }
              member.updateField(
                'field_membership_role',
                x[index]['field_membership_role'].und[0].value,
              );
              members.push(member);
              index++;
            });
          }
          const field = this.organizationProxy.entity.getField(
            'field_social_accounts',
          );
          Object.keys(field).forEach(key => {
            const subField = field.getField(key);
            if (!x[index][key] || !x[index][key].und) {
              return;
            }
            subField.updateValue(x[index][key].und[0].value);
          });
          this.getUsernamesAndSetValue(members);
        });
      },
    );
  }

  /**
   * validateForm
   */
  validateForm() {
    this.orgFormValid =
      this.organizationForm['controls']['title'].valid &&
      this.organizationForm['controls']['field_orgs_logo'].valid &&
      this.organizationForm['controls']['field_orgs_cover_photo'].valid &&
      this.organizationForm['controls']['field_org_avatar'].valid &&
      this.organizationForm['controls']['field_orgs_contact'].valid &&
      this.organizationForm['controls']['field_orgs_address'].valid &&
      this.organizationForm['controls']['field_breif_info'].valid &&
      this.organizationForm['controls']['body'].valid;
  }

  getUsernamesAndSetValue(members: FC_MakerMembership[]) {
    const tasks = [];
    members.forEach(element => {
      if (element.getField('field_team_member').target_id) {
        tasks.push(
          this.mainService.get(
            'user',
            element.getField('field_team_member').target_id,
          ),
        );
      }
    });
    Observable.forkJoin(tasks).subscribe(
      data => {
        let index = 0;
        members.forEach(element => {
          if (element.getField('field_team_member').target_id) {
            const usernameWithID =
              data[index]['name'] + ' (' + data[index]['uid'] + ')';
            element.updateField('field_team_member', usernameWithID);
            index++;
          }
        });
        this.organizationProxy.entity.setField(
          'field_maker_memberships',
          members,
        );
      },
      err => {},
      () => {
        this.buildForm();
        this.organizationReady = true;
      },
    );
  }

  buildForm() {
    const socialAccounts = this.organizationProxy.field_social_accounts;
    this.organizationForm = this.formBuilder.group({
      title: [
        this.organizationProxy.title,
        [Validators.required, Validators.maxLength(50)],
      ], //
      field_orgs_type: [
        this.organizationProxy.field_orgs_type,
        [Validators.required],
      ], //
      field_orgs_logo: [
        this.organizationProxy.field_orgs_logo.file
          ? this.organizationProxy.field_orgs_logo
          : '',
        [Validators.required],
      ], //
      field_orgs_cover_photo: [
        this.organizationProxy.field_orgs_cover_photo.file
          ? this.organizationProxy.field_orgs_cover_photo
          : '',
        [Validators.required],
      ], //
      field_org_avatar: [
        this.organizationProxy.field_org_avatar.file
          ? this.organizationProxy.field_org_avatar
          : '',
        [Validators.required],
      ], //
      field_orgs_contact: [
        this.organizationProxy.field_orgs_contact.email,
        [Validators.required, Validators.email],
      ], //
      field_orgs_phone: [this.organizationProxy.field_orgs_phone.value, []], //
      field_founder_name: [this.organizationProxy.field_founder_name.value, []], //
      field_maker_motto: [this.organizationProxy.field_maker_motto.value, []], //
      field_website_blog: [
        this.organizationProxy.field_website_blog.value,
        [Validators.pattern('https?://.+')],
      ], //
      field_breif_info: [
        this.organizationProxy.field_breif_info.value,
        [Validators.required],
      ], //
      body: [this.organizationProxy.body.value, [Validators.required]], //
      field_orgs_projects: [this.organizationProxy.field_orgs_projects], //
      field_minimum_number_of_follower: [
        this.organizationProxy.field_minimum_number_of_follower.value || 1,
        [Validators.min(0)],
      ], //
      field_type_of_business: [
        this.organizationProxy.field_type_of_business.value,
        [],
      ],
      field_founded_date: this.formBuilder.group({
        date: [
          this.organizationProxy.field_founded_date.value.date,
          [Validators.min(1990), Validators.max(new Date().getFullYear())],
        ],
      }), //
      field_maker_memberships: this.formBuilder.array([], Validators.required), //
      field_social_accounts: this.formBuilder.group({
        field_facebook: [
          socialAccounts.getField('field_facebook').value,
          CustomValidators.url,
        ],
        field_linkedin: [
          socialAccounts.getField('field_linkedin').value,
          CustomValidators.url,
        ],
        field_pinterest: [
          socialAccounts.getField('field_pinterest').value,
          CustomValidators.url,
        ],
        field_instagram: [
          socialAccounts.getField('field_instagram').value,
          CustomValidators.url,
        ],
        field_twitter: [
          socialAccounts.getField('field_twitter').value,
          CustomValidators.url,
        ],
        field_github: [
          socialAccounts.getField('field_github').value,
          CustomValidators.url,
        ],
        field_kickstarter: [
          socialAccounts.getField('field_kickstarter').value,
          CustomValidators.url,
        ],
        field_etsy_shop: [
          socialAccounts.getField('field_etsy_shop').value,
          CustomValidators.url,
        ],
      }),
      field_orgs_address: this.formBuilder.group({
        country: [
          this.organizationProxy.field_orgs_address.country,
          [Validators.required, countryValid(this.countries)],
        ],
        name_line: [this.organizationProxy.field_orgs_address.name_line],
        first_name: [this.organizationProxy.field_orgs_address.first_name],
        last_name: [this.organizationProxy.field_orgs_address.last_name],
        organisation_name: [
          this.organizationProxy.field_orgs_address.organisation_name,
        ],
        sub_administrative_area: [
          this.organizationProxy.field_orgs_address.sub_administrative_area,
        ],
        locality: [
          this.organizationProxy.field_orgs_address.locality,
          [Validators.required],
        ],
        dependent_locality: [
          this.organizationProxy.field_orgs_address.dependent_locality,
        ],
        sub_premise: [this.organizationProxy.field_orgs_address.sub_premise],
        thoroughfare: [
          this.organizationProxy.field_orgs_address.thoroughfare,
          [Validators.required],
        ],
        administrative_area: [
          this.organizationProxy.field_orgs_address.administrative_area,
        ],
        premise: [this.organizationProxy.field_orgs_address.premise],
        postal_code: [
          this.organizationProxy.field_orgs_address.postal_code,
          [CustomValidators.number, Validators.required],
        ],
        countryName: [''],
      }),
    });
  }

  /**
   * publishButtonClick
   */
  publishButtonClick() {
    // Reset errors
    this.errorLogs = [];

    // If form valid
    if (!this.organizationForm.valid) {
      this.errorLogs.push('Not all required fields are filled');
      const missingFields: string[] = [];
      // display error
      Object.keys(this.organizationForm.controls).forEach(key => {
        if (!this.organizationForm.controls[key].valid) {
          missingFields.push(key);
        }
      });
      this.errorLogs.push(missingFields.join(' ,'));
    }

    this.setOrganizationFields();

    this.processLog = 'Uploading images...';

    const observables = this.uploadImages();
    observables.subscribe(
      (uploadedFiles: FileEntity[]) => {
        let index = 0;
        if (!this.organizationProxy.field_orgs_logo.fid) {
          this.organizationProxy.field_orgs_logo.fid = uploadedFiles[index].fid;
          index++;
        }
        if (!this.organizationProxy.field_orgs_cover_photo.fid) {
          this.organizationProxy.field_orgs_cover_photo.fid =
            uploadedFiles[index].fid;
          index++;
        }
        if (!this.organizationProxy.field_org_avatar.fid) {
          this.organizationProxy.field_org_avatar.fid =
            uploadedFiles[index].fid;
          index++;
        }
      },
      err => {},
      () => {
        this.processLog = 'Creating organization...';

        if (this.organizationProxy.entity.nid) {
          this.nodeService.updateNode(this.organizationProxy.entity).subscribe(
            node => {},
            err => {
              this.processLog = '';
              this.errorLogs.push(`Something happened: ${err.statusText}`);
            },
            () => {
              this.processLog = '';
              this.errorLogs = [];
              this.router.navigate(['/portfolio']);
            },
          );
        } else {
          this.nodeService.createNode(this.organizationProxy.entity).subscribe(
            node => {},
            err => {
              console.log(err);
              this.processLog = '';
              this.errorLogs.push(`Couldn't create the org. ${err.statusText}`);
            },
            () => {
              this.processLog = 'Organization created';
              this.errorLogs = [];
              this.router.navigate(['/portfolio']);
            },
          );
        }
      },
    );
  }

  uploadImages(): Observable<FileEntity[]> {
    const tasks: Observable<FileEntity>[] = [];
    if (!this.organizationForm.value.field_orgs_logo.fid) {
      this.organizationForm.value.field_orgs_logo.file = NodeHelper.RemoveFileTypeFromBase64(
        this.organizationForm.value.field_orgs_logo.file,
      );
      tasks.push(
        this.fileService.SendCreatedFile(
          this.organizationForm.value.field_orgs_logo,
        ),
      );
    }
    if (!this.organizationForm.value.field_orgs_cover_photo.fid) {
      this.organizationForm.value.field_orgs_cover_photo.file = NodeHelper.RemoveFileTypeFromBase64(
        this.organizationForm.value.field_orgs_cover_photo.file,
      );
      tasks.push(
        this.fileService.SendCreatedFile(
          this.organizationForm.value.field_orgs_cover_photo,
        ),
      );
    }
    if (!this.organizationForm.value.field_org_avatar.fid) {
      this.organizationForm.value.field_org_avatar.file = NodeHelper.RemoveFileTypeFromBase64(
        this.organizationForm.value.field_org_avatar.file,
      );
      tasks.push(
        this.fileService.SendCreatedFile(
          this.organizationForm.value.field_org_avatar,
        ),
      );
    }
    return Observable.forkJoin(tasks);
  }

  setOrganizationFields() {
    Object.keys(this.organizationForm.value).forEach((key: string) => {
      const fieldValue = this.organizationForm.value[key];
      const organizationEntity = this.organizationProxy.entity as Organization;
      organizationEntity.updateField(key.toString(), fieldValue);
    });
  }

  goToTab(section: string) {
    this.currentFormTab = section;
  }

  deleteOrganization(closebtn) {
    closebtn.click();
    this.nodeService
      .deleteNode(this.organizationProxy.entity.nid)
      .subscribe(data => {
        console.log('org deleted');
        this.router.navigate(['/portfolio']);
      });
  }

  openDeleteConfirmModal(template) {
    this.modalService.open(template);
  }
}
