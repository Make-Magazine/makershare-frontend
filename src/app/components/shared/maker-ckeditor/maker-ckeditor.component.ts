import { Component, ViewChild, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor,NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FileService } from '../../../d7services';
import { FileEntity,NodeHelper } from '../../../CORE';
import { CropperSettings } from 'ng2-img-cropper';
// import { Ng2FileDropAcceptedFile } from 'ng2-file-drop';
import { URLNoProtocol } from '../../../validations/url-no-protocol.validation';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'maker-ckeditor',
  templateUrl: './maker-ckeditor.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MakerCkeditorComponent),
      multi: true,
    },
    // {
    //   provide: NG_VALIDATORS,
    //   useExisting: forwardRef(() => MakerCkeditorComponent),
    //   multi: true,
    // }
    ] 
})
export class MakerCkeditorComponent implements ControlValueAccessor {
  @ViewChild('ckeditor') ckeditor:any;
  @Input("error") error = false;
  @Input("id") id = 'ckeditor';
  event:any;
  Content:any = '';
  isDisabled:boolean;
  imagedata: any = {};
  PhotoModalTab:string = 'upload';
  cropperSettings: CropperSettings;
  SelectedImage: FileEntity = new FileEntity();
  FetchImageByUrl:FormControl = new FormControl('',URLNoProtocol());
  constructor(
    private modalService: NgbModal,
    private fileService: FileService,
  ) { }

  SetCropperSettings(): void {
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.width = 800;
    this.cropperSettings.height = 600;
    this.cropperSettings.minWidth = 800;
    this.cropperSettings.minHeight = 600;
    this.cropperSettings.croppedWidth = 800;
    this.cropperSettings.croppedHeight = 600;
    this.cropperSettings.noFileInput = true;
    this.cropperSettings.canvasWidth = 400;
    this.cropperSettings.canvasHeight = 300;
    this.imagedata = {};
  }

  propagateChange = (_: any) => { };

  writeValue(obj: string) : void{
    if(obj)
      this.Content = obj;
  }
  registerOnChange(fn: any) : void{
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any) : void{

  }
  setDisabledState(isDisabled: boolean) : void{
    this.isDisabled = isDisabled;
  }
  Add_Photo(event,template){
    this.SetCropperSettings();
    this.event = event;
    this.OpenModal(template);
  }
  SelectFileAndSave(closebtn:HTMLButtonElement,file:FileEntity){
    this.imagedata = {};
    this.fileService.getFileById(file.fid).subscribe((fileEntity:FileEntity)=>{
      this.InsertImage(fileEntity.uri_full);
      closebtn.click();
    });
    // this.InsertImage(file['url']);
  }
  InsertImage(link){
    this.event.insertHtml('<img src="'+link+'" class="img-responsive">');
  }
  OpenModal(template){
    this.modalService.open(template);
  }
  UploadBtn(file, cropper) {
    if (!file) return;
    var image: any = new Image();
    this.SelectedImage.filename = file.name;
    var myReader: FileReader = new FileReader();
    myReader.onloadend = function (loadEvent: any) {
      image.src = loadEvent.target.result;
      cropper.setImage(image);
    };
    myReader.readAsDataURL(file);
  }
  dragFileAccepted(acceptedFile, cropper) {
    this.UploadBtn(acceptedFile.file,cropper);
  }
  ImageUpdated(closebtn: HTMLButtonElement) {
    closebtn.click();
    delete this.SelectedImage.fid;
    this.SelectedImage.file = '';
    if (!NodeHelper.isEmpty(this.imagedata)) {
      this.SelectedImage.file = NodeHelper.RemoveFileTypeFromBase64(this.imagedata.image);
      this.imagedata = {};
      this.fileService.SendCreatedFile(this.SelectedImage).subscribe((data:FileEntity)=>{
        this.fileService.getFileById(data.fid).subscribe((fileEntity:FileEntity)=>{
          this.InsertImage(fileEntity.uri_full);
        });
      });
    }
  }
}
