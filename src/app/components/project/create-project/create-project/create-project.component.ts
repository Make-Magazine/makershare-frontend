import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators , FormControl , FormControlDirective , FormGroup} from '@angular/forms';
import { NodeService } from '../../../../d7services/node/node.service';
import { CreateProject } from '../../../../models/project/create-project/create-project';
import { CreateYourStoryModel } from '../../../../models/project/create-project/your-story';
import { CoverImage } from '../../../../models/project/create-project/cover-image';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
})

export class CreateProjectComponent implements OnInit {
  project: CreateProject;
  current_active_tab: string;

  CoverImg: CoverImage = {
    file: '',
    filename: '',
  };

  YourStoryModel:CreateYourStoryModel = {
    title:'',
    Categories:[],
    field_aha_moment:'',
    field_cover_photo: this.CoverImg,
    field_show_tell_video:'',
    field_story:'',
    field_tags:[],
    field_teaser:'',
    field_uh_oh_moment:'',
  };
  
  CreateProjectComponentValues = [];
  constructor(
    private nodeService:NodeService,
  ) {}

  ngOnInit(): void {
    this.current_active_tab = 'Your Story';
    this.CreateProjectComponentValues['Your Story'] = this.YourStoryModel;
  }

  FormUpdateHandler (values, Component){
    this.CreateProjectComponentValues[Component] =  {};
    this.CreateProjectComponentValues[Component] = values;
  }

  SaveProjectClick(Visibility,Status){
    this.project.field_visibility2 = Visibility;
    this.project.status = Status;
    console.log(this.project);
    this.nodeService.createNode(this.project).subscribe(project => {
      console.log("project saved");
      console.log(project);
    }, err =>{
      console.log("error");
      console.log(err);
    });
  }
}
