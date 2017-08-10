import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Ng2FileDropAcceptedFile } from 'ng2-file-drop';
import { CropperSettings } from 'ng2-img-cropper';
import { FileEntity } from '../../../../core';

@Component({
  selector: 'app-org-form-basic-info',
  templateUrl: './basic-info.component.html'
})
export class BasicInfoComponent implements OnInit {

  @Input() organizationForm: FormGroup;

  imageModalTab: 'upload'|'filemanager' = 'upload';
  imageData: any;

  cropperSettings:CropperSettings;
  cropperLogoSettings: CropperSettings;
  cropperCoverSettings: CropperSettings;
  currentImageFieldName: string;

  constructor(
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
    this.setCropperSettings();
  }

  updateType(newType: string) {
    const field_orgs_type = this.organizationForm.controls.field_orgs_type;
    field_orgs_type.patchValue(newType);
  }

  dragFileAccepted(acceptedFile: Ng2FileDropAcceptedFile, cropper) {
    this.uploadBtn(acceptedFile.file, cropper);
  }

  setCropperSettings() {
    this.cropperLogoSettings = new CropperSettings();
    this.cropperLogoSettings.width = 800;
    this.cropperLogoSettings.height = 450;
    this.cropperLogoSettings.minWidth = 800;
    this.cropperLogoSettings.minHeight = 450;
    this.cropperLogoSettings.croppedWidth = 800;
    this.cropperLogoSettings.croppedHeight = 450;
    this.cropperLogoSettings.noFileInput = true;
    this.cropperLogoSettings.canvasWidth = 400;
    this.cropperLogoSettings.canvasHeight = 225;

    this.cropperCoverSettings = new CropperSettings();
    this.cropperCoverSettings.width = 800;
    this.cropperCoverSettings.height = 450;
    this.cropperCoverSettings.minWidth = 800;
    this.cropperCoverSettings.minHeight = 450;
    this.cropperCoverSettings.croppedWidth = 800;
    this.cropperCoverSettings.croppedHeight = 450;
    this.cropperCoverSettings.noFileInput = true;
    this.cropperCoverSettings.canvasWidth = 400;
    this.cropperCoverSettings.canvasHeight = 225;

    this.imageData = {};
  }

  openImageModal(template, settings: CropperSettings, fieldName: string) {
    this.imageData = {};
    this.currentImageFieldName = fieldName;
    this.cropperSettings = settings;
    this.modalService.open(template);
  }

  uploadBtn(file, cropper) {
    if (!file) return;
    var image: any = new Image();
    var myReader: FileReader = new FileReader();
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

  imageUpdated(closebtn: HTMLButtonElement) {
    closebtn.click();
    if(!this.imageData.original) return;
    this.setImage(this.imageData.image, this.imageData.original.filename);
  }

  setImage(file: string, filename: string, fid?: number) {
    const fileEntity = new FileEntity();
    fileEntity.file = file;
    fileEntity.filename = filename;
    fileEntity.fid = fid;
    const imageFormControl = this.organizationForm.controls[this.currentImageFieldName];
    imageFormControl.patchValue(fileEntity);
  }

}
