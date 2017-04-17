import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ViewService } from '../../../d7services/view/view.service';
import { FileService } from '../../../d7services/file/file.service';
import { FileEntityManage, FileManageService, NodeHelper, FileEntity } from '../../../models';

@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
})
export class FileManagerComponent implements OnInit {
  @Input('type') type:string = 'browse';
  @Output() emitter = new EventEmitter();
  fileManageService:FileManageService;
  files:FileEntityManage[];

  constructor(
    private viewService:ViewService,
    private fileService:FileService,
  ) { }

  ngOnInit() {
    this.UpdateFiles();
  }

  UpdateFiles(){
    this.viewService.getView('maker_manage_file/'+localStorage.getItem("user_id")).subscribe((data:FileManageService)=>{
      this.fileManageService = data;
      this.files = [];
      this.LoadMore();
    });
  }

  UploadFile(file:File){
    let AllowedFileTypes = ['jpeg','jpg','png','gif','pdf','epub','xls','ppt','pptx','sxls','doc','docx','txt'];
    if(!file || AllowedFileTypes.indexOf(file.name.split('.')[1]) == -1) return;
    const self = this;
    var myReader: FileReader = new FileReader();
    myReader.onloadend = function (loadEvent: any) {
      let fileEntity:FileEntity = {
        file:loadEvent.target.result,
        filename:file.name,
      };
      self.fileService.SendCreatedFile(fileEntity).subscribe((f)=>{
        self.UpdateFiles();
      },err=>console.log(err));
    };
    myReader.readAsDataURL(file);
    
  }

  EmmitHandler(event){
    if(!event){
      this.UpdateFiles();
    }else{
      this.emitter.emit(event);
    }
  }

  LoadMore(){
    let files = this.fileManageService.files.slice(this.files.length, this.files.length+10);
    this.files = this.files.concat(files);
  }
}
