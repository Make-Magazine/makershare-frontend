import { Component, OnInit , Input, Output, EventEmitter } from '@angular/core';
import { FileEntityManage } from '../../../../models';
import { FileService } from '../../../../d7services/file/file.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'file-card',
  templateUrl: './file-card.component.html',
})
export class FileCardComponent implements OnInit {
 
  @Input('fileCard') fileCard:FileEntityManage;
  @Input('type') type:string = 'browse';
  @Output() emitter = new EventEmitter();

  fid:number;

  constructor(
    private fileService:FileService,
    private modalService:NgbModal
  ) { }

  ngOnInit() {
    this.fid = this.fileCard.fid;
  }
  CheckFileBeforeDelete(Template){
    if(this.fileCard.usage){
      this.modalService.open(Template);
    }else{
      this.DeleteFile();
    }
  }

  DeleteFile(){
    this.fileService.deleteFile(this.fid).subscribe((data)=>{
      this.emitter.emit(false);
    });
  }
  SelectFile(){
    this.emitter.emit(this.fileCard);
  }


}
