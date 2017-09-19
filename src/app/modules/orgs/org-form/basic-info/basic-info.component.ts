import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Ng2FileDropAcceptedFile } from 'ng2-file-drop';
import { CropperSettings } from 'ng2-img-cropper';
import { FileEntity } from '../../../../core';
import { ViewService } from '../../../../core/d7services';
import { Observable } from 'rxjs/Observable';
import { KeyValueObject } from '../../../../core/models/object/key-value-object';
// import { CountriesShape } from '../../../../core/store/countries-reducer';
// import { Store } from '@ngrx/store';
// import { State, Store } from '@ngrx/store';

@Component({
  selector: 'app-org-form-basic-info',
  templateUrl: './basic-info.component.html',
})
export class BasicInfoComponent implements OnInit {
  @Input() organizationForm: FormGroup;
  @Input() countries: KeyValueObject[];
  @Output() validateForm = new EventEmitter();
  @Output() canNavigate = new EventEmitter();
  @Output() emitter = new EventEmitter();

  currentPhotoModalTab: 'upload' | 'filemanager' = 'upload';
  imageData: any;

  cropperSettings: CropperSettings;
  cropperLogoSettings: CropperSettings;
  cropperCoverSettings: CropperSettings;
  cropperAvatarSettings: CropperSettings;

  currentImageFieldName: string;

  selectedCountry;
  searchFailed = false;

  constructor(
    private modalService: NgbModal,
    private viewService: ViewService,
    /*private store: Store<CountriesShape>,*/
  ) {
  }

  /**
   * ngOnInit
   */
  ngOnInit() {
    this.setCropperSettings();
    // this.getCountries();

    this.organizationForm.valueChanges.subscribe(data => {
      this.onValueChanged();
    });
    this.onValueChanged();

    this.initCountries();
  }

  /**
   * formatter
   *
   * @param x
   * @returns {any}
   */
  formatter = x => {
    const val: string = x.key || x;
    const match = this.countries.filter(c => {
      return c.key == val;
    })[0];
    return match.value;
  };

  /**
   * searchCountry
   *
   * @param {Observable<string>} text$
   */
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

  /**
   * onValueChanged
   */
  onValueChanged() {
    this.emitValues();
  }

  /**
   * emitValues
   */
  emitValues() {
    this.validateForm.emit();

    if (this.organizationForm.dirty && this.organizationForm.touched) {
      this.canNavigate.emit(false);
    }

    this.emitter.emit(/*this.tags*/);
  }

  /**
   * updateType
   *
   * @param {string} newType
   */
  updateType(newType: string) {
    const field_orgs_type = this.organizationForm.controls.field_orgs_type;
    field_orgs_type.patchValue(newType);
  }

  /**
   * dragFileAccepted
   *
   * @param {AcceptedFile} acceptedFile
   * @param cropper
   */
  dragFileAccepted(acceptedFile: Ng2FileDropAcceptedFile, cropper) {
    this.uploadBtn(acceptedFile.file, cropper);
  }

  /**
   * cropperSettingsFactory
   *
   * @returns {CropperSettings}
   */
  cropperSettingsFactory(x, y) {
    const cropperSettings = new CropperSettings();
    cropperSettings.width = x;
    cropperSettings.height = y;
    cropperSettings.minWidth = x;
    cropperSettings.minHeight = y;
    cropperSettings.croppedWidth = x;
    cropperSettings.croppedHeight = y;
    cropperSettings.noFileInput = true;
    cropperSettings.canvasWidth = 400;
    cropperSettings.canvasHeight = 225;
    return cropperSettings;
  }

  /**
   * setCropperSettings
   */
  setCropperSettings() {
    this.cropperLogoSettings = this.cropperSettingsFactory(0, 0);
    this.cropperCoverSettings = this.cropperSettingsFactory(2200, 1100);
    this.cropperAvatarSettings = this.cropperSettingsFactory(600, 600);

    this.imageData = {};
  }

  /**
   * initCountries
   */
  initCountries() {
    const countryKey = this.organizationForm.value.field_orgs_address.country;
    if (countryKey) {
      const index = this.countries.map(element => element.key).indexOf(countryKey);
      this.getCountryDetails(this.countries[index]);
    }
  }

  /**
   * getCountryDetails
   *
   * @param country
   */
  getCountryDetails(country) {
    if (!country.key) {
      return;
    }
    this.viewService
      .get('maker_address_api', country.key)
      .subscribe(countrydetails => {
        this.selectedCountry = countrydetails;
        const field_address = <FormGroup>this.organizationForm.controls[
          'field_orgs_address'
        ];
        field_address.controls.country.patchValue(country.key);
        field_address.controls.countryName.patchValue(country.value);
      });
  }

  /**
   * openImageModal
   *
   * @param template
   * @param {CropperSettings} settings
   * @param {string} fieldName
   */
  openImageModal(template, settings: CropperSettings, fieldName: string) {
    this.imageData = {};
    this.currentImageFieldName = fieldName;
    this.cropperSettings = settings;
    this.modalService.open(template);
  }

  /**
   * uploadBtn
   *
   * @param file
   * @param cropper
   */
  uploadBtn(file, cropper) {
    if (!file) {
      return;
    }
    const image: any = new Image();
    const myReader: FileReader = new FileReader();
    myReader.onloadend = function(loadEvent: any) {
      image.src = loadEvent.target.result;
      cropper.setImage(image);
    };
    myReader.readAsDataURL(file);
  }

  /**
   * selectFileAndSave
   *
   * @param {HTMLButtonElement} closebtn
   * @param {FileEntity} file
   */
  selectFileAndSave(closebtn: HTMLButtonElement, file: FileEntity) {
    this.currentPhotoModalTab = 'upload';
    closebtn.click();
    this.setImage(file.url, file.filename, file.fid);
  }

  /**
   * imageUpdated
   *
   * @param {HTMLButtonElement} closebtn
   * @param file
   */
  imageUpdated(closebtn: HTMLButtonElement, file) {
    closebtn.click();
    if (!this.imageData.original) {
      return;
    }
    this.setImage(this.imageData.image, file.name);
  }

  /**
   * setImage
   *
   * @param {string} file
   * @param {string} filename
   * @param {number} fid
   */
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
