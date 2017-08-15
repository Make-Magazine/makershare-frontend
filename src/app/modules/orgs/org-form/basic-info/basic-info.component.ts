import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Ng2FileDropAcceptedFile } from 'ng2-file-drop';
import { CropperSettings } from 'ng2-img-cropper';
import { FileEntity } from '../../../../core';
import { ViewService } from '../../../../core/d7services';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-org-form-basic-info',
  templateUrl: './basic-info.component.html',
})
export class BasicInfoComponent implements OnInit {
  @Input() organizationForm: FormGroup;

  imageModalTab: 'upload' | 'filemanager' = 'upload';
  imageData: any;

  cropperSettings: CropperSettings;
  cropperLogoSettings: CropperSettings;
  cropperCoverSettings: CropperSettings;
  cropperAvatarSettings: CropperSettings;

  currentImageFieldName: string;
  countries: {
    key:string,
    value:string,
  }[];

  selectedCountry;
  searchFailed = false;

  constructor(
    private modalService: NgbModal,
    private viewService: ViewService,
  ) { }

  ngOnInit() {
    this.setCropperSettings();
    this.getCountries();
  }

  formatter = x => {
    if (x.value) {
      return x.value;
    }
    return x;
  };

  searchCountry = (text$: Observable<string>) => {
    return text$
      .debounceTime(300)
      .distinctUntilChanged()
      .do(() => (this.searchFailed = false))
      .map(term => {
        if (term.length > 1) {
          const res = this.countries
            .filter(element => new RegExp(term, 'gi').test(element.value))
            .splice(0, 10);
          if (res) {
            return res;
          }
          this.searchFailed = true;
        }
        return [];
      });
  };

  updateType(newType: string) {
    const field_orgs_type = this.organizationForm.controls.field_orgs_type;
    field_orgs_type.patchValue(newType);
  }

  dragFileAccepted(acceptedFile: Ng2FileDropAcceptedFile, cropper) {
    this.uploadBtn(acceptedFile.file, cropper);
  }

  /**
   * THIS FUNCTION IS USELESS BECAUSE YOU NEED DEFFIRENT SETTINGS FOR EACH FIELD :)
   * i was using the same numbers because i dont care about the styling but you will need to pass the new size for each field
   * good luck with that!
   */
  cropperSettingsFactory() {
    let cropperSettings = new CropperSettings();
    cropperSettings.width = 800;
    cropperSettings.height = 450;
    cropperSettings.minWidth = 800;
    cropperSettings.minHeight = 450;
    cropperSettings.croppedWidth = 800;
    cropperSettings.croppedHeight = 450;
    cropperSettings.noFileInput = true;
    cropperSettings.canvasWidth = 400;
    cropperSettings.canvasHeight = 225;
    return cropperSettings;
  }

  setCropperSettings() {
    this.cropperLogoSettings = this.cropperSettingsFactory();
    this.cropperCoverSettings = this.cropperSettingsFactory();
    this.cropperAvatarSettings = this.cropperSettingsFactory();

    this.imageData = {};
  }

  getCountries(){
    this.viewService.getView('maker_address_api').subscribe(countries =>{
      this.countries = countries;
      let countryKey = this.organizationForm.value.field_orgs_address.country;
      if(countryKey) {
        let index = countries.map(element=> element.key).indexOf(countryKey);
        this.getCountryDetails(countries[index]);
      }
    });
  }

  getCountryDetails(country) {
    if (!country.key) {
      return;
    }
    this.viewService.get('maker_address_api', country.key).subscribe(countrydetails => {
      this.selectedCountry = countrydetails;
      const field_address = <FormGroup>this.organizationForm.controls['field_orgs_address'];
      field_address.controls.country.patchValue(country.key);
      field_address.controls.countryName.patchValue(country.value);
    });
  }

  openImageModal(template, settings: CropperSettings, fieldName: string) {
    this.imageData = {};
    this.currentImageFieldName = fieldName;
    this.cropperSettings = settings;
    this.modalService.open(template);
  }

  uploadBtn(file, cropper) {
    if (!file) return;
    let image: any = new Image();
    let myReader: FileReader = new FileReader();
    myReader.onloadend = function(loadEvent: any) {
      image.src = loadEvent.target.result;
      cropper.setImage(image);
    };
    myReader.readAsDataURL(file);
  }

  selectFileAndSave(closebtn: HTMLButtonElement, file: FileEntity) {
    this.imageModalTab = 'upload';
    closebtn.click();
    this.setImage(file.url, file.filename, file.fid);
  }

  imageUpdated(closebtn: HTMLButtonElement, file) {
    closebtn.click();
    if (!this.imageData.original) return;
    this.setImage(this.imageData.image, file.name);
  }

  setImage(file: string, filename: string, fid?: number) {
    const fileEntity = new FileEntity();
    fileEntity.file = file;
    fileEntity.filename = filename;
    fileEntity.fid = fid;
    const imageFormControl = this.organizationForm.controls[
      this.currentImageFieldName
    ];
    imageFormControl.patchValue(fileEntity);
  }
}
