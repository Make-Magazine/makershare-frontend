import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  FileEntity,
  FileEntityManage,
  FileManageService,
  NodeHelper,
} from '../../../../../../core';
import { FileService, ViewService } from '../../../../../../core/d7services';

@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
})
export class FileManagerComponent implements OnInit {
  fileManageService: FileManageService;
  files: FileEntityManage[];
  ProjectsUsingFile: string[] = [];
  fileCard: FileEntityManage;
  FiletypesWithImageAvailable: string[] = [
    'doc',
    'docx',
    'epub',
    'gif',
    'pdf',
    'ppt',
    'pptx',
    'sxls',
    'txt',
    'xsls',
  ];

  constructor(
    private viewService: ViewService,
    private fileService: FileService,
    private modalService: NgbModal,
  ) {}

  ngOnInit() {
    this.UpdateFiles();
  }

  UpdateFiles() {
    this.viewService
      .getView('maker_manage_file/' + localStorage.getItem('user_id'))
      .subscribe((data: FileManageService) => {
        this.fileManageService = data;

        this.fileManageService.files.forEach(
          (file: FileEntity, index: number) => {
            let fileType = file.filename.split('.');
            let sourceType = fileType[fileType.length - 1];
            this.fileManageService.files[index].sourceType = sourceType;
          },
        );
        this.fileManageService.files = this.fileManageService.files.reverse();
        this.files = [];
        this.LoadMore();
      });
  }

  FileChanged(files: FileList) {
    Array.from(files).forEach(file => {
      this.UploadFile(file);
    });
  }

  UploadFile(file: File) {
    let AllowedFileTypes = [
      'jpeg',
      'jpg',
      'png',
      'gif',
      'pdf',
      'epub',
      'xls',
      'ppt',
      'pptx',
      'sxls',
      'doc',
      'docx',
      'txt',
    ];
    if (AllowedFileTypes.indexOf(file.name.split('.')[1]) == -1) return;
    const self = this;
    var myReader: FileReader = new FileReader();
    myReader.onloadend = function(loadEvent: any) {
      let fileEntity = {
        file: NodeHelper.RemoveFileTypeFromBase64(loadEvent.target.result),
        filename: file.name,
        status: 1,
      };
      self.fileService.SendCreatedFile(fileEntity).subscribe(
        f => {
          self.UpdateFiles();
        },
        err => console.log(err),
      );
    };
    myReader.readAsDataURL(file);
  }

  LoadMore() {
    let files = this.fileManageService.files.slice(
      this.files.length,
      this.files.length + 12,
    );
    this.files = this.files.concat(files);
  }
  CheckFileBeforeDelete(Template, file: FileEntityManage) {
    this.ProjectsUsingFile = [];
    if (file.usage) {
      this.fileCard = file;
      this.modalService.open(Template);
    } else {
      this.DeleteFile(file.fid);
    }
  }

  DeleteFile(fid) {
    this.fileService.deleteFile(fid).subscribe(data => {
      this.UpdateFiles();
    });
  }
}
