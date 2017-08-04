import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ViewService } from '../../../CORE/d7services';
import { FileEntityManage, FileManageService } from '../../../CORE/models';

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
  ) { }

  ngOnInit() {
    this.UpdateFiles();
  }

  UpdateFiles(){
    this.viewService.getView('maker_manage_file/'+localStorage.getItem("user_id")).subscribe((data:FileManageService)=>{
      this.fileManageService = data;
      this.fileManageService.files = this.fileManageService.files.reverse();
      this.files = [];
      this.LoadMore();
    });
  }

  LoadMore(){
    let files = this.fileManageService.files.slice(this.files.length, this.files.length+24);
    this.files = this.files.concat(files);
  }
}
