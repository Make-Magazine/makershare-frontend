import { Component, OnInit , Input, Output, EventEmitter } from '@angular/core';
import { FileEntityManage } from '../../../../models';

@Component({
  selector: 'file-card',
  templateUrl: './file-card.component.html',
})
export class FileCardComponent implements OnInit {
 
  @Input('fileCard') fileCard:FileEntityManage;
  @Input('type') type:string = 'browse';
  @Output() emitter = new EventEmitter();

  fid:number;

  constructor() { }

  ngOnInit() {
    this.fid = this.fileCard.fid;
  }
  DeleteFile(){
  }
  SelectFile(){
    this.emitter.emit(this.fileCard);
  }


}
