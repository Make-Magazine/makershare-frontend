import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators , FormControl , FormControlDirective , FormGroup} from '@angular/forms';
import { NodeService } from '../../../../d7services/node/node.service';
import { FileService } from '../../../../d7services/file/file.service';
import { ViewService } from '../../../../d7services/view/view.service';
import { Project } from '../../../../models/project/create-project/project';
import { CreateYourStoryModel } from '../../../../models/project/create-project/your-story';
import { CreateHowToModel } from '../../../../models/project/create-project/how-to';
import { FileEntity } from '../../../../models/project/create-project/file_entity';
import { field_file_reference } from '../../../../models/project/create-project/field_file_reference';
import { field_text } from '../../../../models/project/create-project/field_text';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
})

export class CreateProjectComponent implements OnInit {
  current_active_tab: string;
  visibility:number = 1115; // draft
  FormPrintableValues = {
    cover_image:{file:"",filename:""},
    tags:[]
  }

  project: Project = {
    title: "Untitled",
    type: 'project',
    field_teaser:{und:[{format:null,value:""}]},
    field_story:{und:[{format:"filtered_html",value:""}]},
    field_visibility2:{und:[this.visibility]},
    field_cover_photo:{und:[{fid:0}]},
    field_categories:{und:[]},
    field_tags:{und:[]},
    field_show_tell_video:{und:[{format:null}]},
    field_aha_moment:{und:[{format:null}]},
    field_uh_oh_moment:{und:[{format:null}]},
    status:0,
    promote:0,
    sticky:0
  };  
  
  CreateProjectComponentValues = [];

  constructor(
    private nodeService: NodeService,
    private fileService: FileService,
    private viewService: ViewService
  ) {}

  ngOnInit(): void {
    this.current_active_tab = 'Your Story';
  }

  FormUpdateHandler (values, Component){
    console.log(this.project);
  }

  SaveProject(){
    this.nodeService.createNode(this.project).subscribe((project:Project) => {
      this.project = project;
    }, err =>{
      console.log("error");
      console.log(err);
    });
  }

  UpdateTags(event){
    this.FormPrintableValues.tags = event;
  }

  GettingFieldsReady(Visibility:number,Status:number){
    this.visibility = Visibility;
    this.project.status = Status;
    this.SetYourStoryValues();
  }

  SetYourStoryValues(){
    console.log(this.FormPrintableValues);
    let re = /^data:image\/[^;]+;base64,/g;
    let image:FileEntity = {file:this.FormPrintableValues.cover_image.file,filename:this.FormPrintableValues.cover_image.filename};
    image.file = re[Symbol.replace](this.FormPrintableValues.cover_image.file, '');
    this.fileService.SendCreatedFile(image).subscribe((data:field_file_reference) => {
      this.project.field_cover_photo.und[0]= data;
      this.FormPrintableValues.tags.forEach((value,index)=>{
        this.viewService.getView('api-project-tags',[['name',value]]).subscribe((tag) => {
          if(tag[0]){
            this.project.field_tags.und.push(tag[0].tid)
          }
        });
      });
      console.log(this.project);
      this.SaveProject();
    });
  }
}
