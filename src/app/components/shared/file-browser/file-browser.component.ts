import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ViewService,FileService } from '../../../d7services';
import { FileEntityManage, FileManageService, NodeHelper, FileEntity } from '../../../models';

@Component({
  selector: 'app-file-browser',
  templateUrl: './file-browser.component.html',
})
export class FileBrowserComponent implements OnInit {
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

  LoadMore(){
    let files = this.fileManageService.files.slice(this.files.length, this.files.length+24);
    this.files = this.files.concat(files);
  }
}
