import { Component, OnInit, Input } from '@angular/core';
import { ViewService } from '../../../d7services/view/view.service';
import { FileEntityManage,FileManageService } from '../../../models' 

@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
})
export class FileManagerComponent implements OnInit {
  @Input('type') type:string = 'browse';
  fileManageService:FileManageService;

  constructor(
    private viewService:ViewService,
  ) { }

  ngOnInit() {
    this.UpdateFiles();
  }

  UpdateFiles(){
    this.viewService.getView('maker_manage_file/'+localStorage.getItem("user_id")).subscribe((data:FileManageService)=>{
      this.fileManageService = data;
    });
  }
}
