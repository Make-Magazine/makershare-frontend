import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { NodeService } from '../../../../d7services/node/node.service';
import { FileService } from '../../../../d7services/file/file.service';
import { ViewService } from '../../../../d7services/view/view.service';
import { TaxonomyService } from '../../../../d7services/taxonomy/taxonomy.service';
import { Project } from '../../../../models/project/create-project/project';
import { FileEntity } from '../../../../models/project/create-project/file_entity';
import { field_file_reference } from '../../../../models/project/create-project/field_file_reference';
import { Observable } from "rxjs";
import { NotificationBarService, NotificationType } from 'angular2-notification-bar';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
})

/**
 * Hello and welcome to project create and edit component
 * this component is used to managing the project like editing or creating new projects
 * WARNING : MY ENGLISH IS NOT THAT GOOD AND YOU MAY HAS A CANCER WHILE READING THE COMMENTS :)
 */
export class CreateProjectComponent implements OnInit {
  /**
   * this variables are used to navigating or static project fields
   * also contain the values what will be printed in the form 
   * because the values what drupal returns are just a references to the entity
   * so we need a separated variables to store the display values
   */
  current_active_tab: string;
  visibility:number = 1115; // draft
  FormPrintableValues = {
    cover_image:{file:"",filename:""},
    tags:[],
    resources_files:[],
    team:[],
  }
  created = false;

  /**
   * the project object with empty values which will be transfared to the sub components to set the values inside it before posting them
   */
  project: Project = {
    title: "Untitled",
    // your story values
    field_teaser:{und:[{format:null,value:""}]},
    field_story:{und:[{format:"filtered_html",value:""}]},
    field_visibility2:{und:[this.visibility]},
    field_cover_photo:{und:[{fid:0}]},
    field_categories:{und:[]},
    field_tags:{und:''},
    field_show_tell_video:{und:[{format:null}]},
    field_aha_moment:{und:[{format:null}]},
    field_uh_oh_moment:{und:[{format:null}]},
    // how to values
    field_how_to:{und:[{format:null,value:""}]},
    field_tools:{und:[]},
    field_parts:{und:[]},
    field_materials:{und:[]},
    field_difficulty:{und:5},
    field_duration:{und:8},
    field_resources:{und:[]},
    field_maker_memberships:{und:[]},

    status:0,
    promote:0,
    sticky:0,
    type: 'project',
  };  
  
  /**
   * useless for new structure "must be deleted"
   */
  CreateProjectComponentValues = [];

  constructor(
    private nodeService: NodeService,
    private fileService: FileService,
    private viewService: ViewService,
    private taxonomyService:TaxonomyService,
    private notificationBarService: NotificationBarService,
  ) {}
  ngOnInit(): void {
    this.current_active_tab = 'Your Story';
  }

  /**
   * also useless and most be deleted after updating all sub components 
   */
  FormUpdateHandler (values, Component){
    console.log(this.project);
  }

  /**
   * final function witch will post the project object to drupal after finishing all the functions to map the values
   */
  SaveProject(){
    console.log(this.project);
    this.nodeService.createNode(this.project).subscribe((project:Project) => {
      this.created = true;
      this.notificationBarService.create({ message: 'Project Saved', type: NotificationType.Success});
      // this.project = project;
    }, err =>{
      console.log(err);
      this.notificationBarService.create({ message: 'Project not saved , check the logs please', type: NotificationType.Error});
    });
  }

  /**
   * form update handler from all sub components "still WIP - not finished"
   * @param event : the value of the object from sub componet emitter
   */
  UpdateFields(event,component){
    if(component === "Your Story"){
      this.FormPrintableValues.tags = event;
    }else{
      this.FormPrintableValues.resources_files = event;
    }
  }

  /**
   * form saving function for all types of the project
   * @param Visibility : the field value witch has 3 types "public ,private and draft"
   * @param Status : the status of the project dependent on visibility type
   */
  GettingFieldsReady(Visibility:number,Status:number){
    this.visibility = Visibility;
    this.project.status = Status;
    this.SetYourStoryValues();
  }

  /**
   * function to migrate and map the values from the forms to the project object
   * for example you must upload the file image then reference the project cover_image field to this fid
   */
  SetYourStoryValues(){
    this.project.field_tags.und = this.FormPrintableValues.tags.toString();
    let re = /^data:image\/[^;]+;base64,/g;
    let image:FileEntity = {file:this.FormPrintableValues.cover_image.file,filename:this.FormPrintableValues.cover_image.filename};
    image.file = re[Symbol.replace](this.FormPrintableValues.cover_image.file, '');    
    let tasks = [];
    if(image.file){
      tasks.push(this.fileService.SendCreatedFile(image));
    }
    let source = Observable.forkJoin(tasks);
    source.subscribe(
      (x) => {
        this.project.field_cover_photo.und[0] = x[0] as field_file_reference;        
      },
      (err) => {
        console.log('Error: %s', err);
      },
      () => {
        this.SaveProject();
      }
    );
  }
}
