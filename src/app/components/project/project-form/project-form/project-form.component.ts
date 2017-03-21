import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { NodeService } from '../../../../d7services/node/node.service';
import { FileService } from '../../../../d7services/file/file.service';
import { ViewService } from '../../../../d7services/view/view.service';
import { TaxonomyService } from '../../../../d7services/taxonomy/taxonomy.service';
import { Project } from '../../../../models/project/project-form/project';
import { FileEntity } from '../../../../models/project/project-form/file_entity';
import { field_file_reference } from '../../../../models/project/project-form/field_file_reference';
import { Observable } from "rxjs";
import { NotificationBarService, NotificationType } from 'angular2-notification-bar';
import { Router,Params,ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../d7services/user/user.service'
import { field_collection_item_member,field_collection_item_tool,field_collection_item_material,field_collection_item_part,field_collection_item_resource } from '../../../../models/project/project-form/field_collection_item';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
})

/**
 * Hello and welcome to project create and edit component
 * this component is used to managing the project like editing or creating new projects
 * WARNING : MY ENGLISH IS NOT THAT GOOD AND YOU MAY HAS A CANCER WHILE READING THE COMMENTS :)
 */
export class ProjectFormComponent implements OnInit {
  /**
   * this variables are used to navigating or static project fields
   * also contain the values what will be printed in the form 
   * because the values what drupal returns are just a references to the entity
   * so we need a separated variables to store the display values
   */
  ProjectLoaded = true;
  current_active_tab: string;
  FormPrintableValues = {
    cover_image:{file:"",filename:""},
    tags:[],
    resources_files:[],
  }

  /**
   * the project object with empty values which will be transfared to the sub components to set the values inside it before posting them
   */
  project: Project = {
    // your story values
    title: "Untitled",
    field_teaser:{und:[{format:null,value:""}]},
    field_story:{und:[{format:"filtered_html",value:""}]},
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
    // team values
    field_maker_memberships:{und:[]},
    // nonviewed values
    field_visibility2:{und:[1115]},
    status:0,
    promote:0,
    sticky:0,
    type: 'project',
  };  

  constructor(
    private nodeService: NodeService,
    private fileService: FileService,
    private viewService: ViewService,
    private taxonomyService:TaxonomyService,
    private notificationBarService: NotificationBarService,
    private userService:UserService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    var nid;
    this.route.params.subscribe(params => {
      nid = params["nid"];
    });
    if(nid){
      this.ProjectLoaded = false;
      this.nodeService.getNode(nid).subscribe(data => {
        this.ConvertProjectToCreateForm(data);
      });
    }else{
      this.SetProjectOwner();
    }
    this.current_active_tab = 'Your Story';
  }

  ConvertProjectToCreateForm(data){
    var tasks = [];
    let NotReadyFields = ["field_categories","field_difficulty","field_duration","field_tags","field_tools","field_materials","field_parts","field_resources","field_maker_memberships"];
    for(let index in data){
      let field = data[index];
      if(NotReadyFields.indexOf(index) == -1){
        this.project[index] = field;
      }else{
        switch(index)
        {
          case "field_categories":
          {
            field.und.forEach( category => {
              this.project.field_categories.und.push(category.tid);
            });
            break;
          }
          case "field_difficulty":
          {
            this.project.field_difficulty.und = field.und[0].tid;
            break;
          }
          case "field_duration":
          {
            this.project.field_duration.und = field.und[0].tid;
            break;
          }
          case "field_tags":
          {
            field.und.forEach(tag => {
              tasks.push(this.taxonomyService.getTermByID(tag.tid));
            });
            break;
          }
          case "field_maker_memberships":
          {
            field.und.forEach(member => {
              tasks.push(this.viewService.getView("entity_field_collection_item/"+member.value));
            });
            break;
          }
          case "field_tools":
          {
            field.und.forEach(tool => {
              tasks.push(this.viewService.getView("entity_field_collection_item/"+tool.value));
            });
            break;
          }
          case "field_materials":
          {
            field.und.forEach(material => {
              tasks.push(this.viewService.getView("entity_field_collection_item/"+material.value));
            });
            break;
          }
          case "field_parts":
          {
            field.und.forEach(part => {
              tasks.push(this.viewService.getView("entity_field_collection_item/"+part.value));
            });
            break;
          }
          case "field_resources":
          {
            field.und.forEach(resource => {
              tasks.push(this.viewService.getView("entity_field_collection_item/"+resource.value));
            });
            break;
          }
          default:
          {
            break;
          }
        }
      }
    }
    var subtasks = [];
    let source = Observable.forkJoin(tasks);
    source.subscribe(
      (x) => {
        var index = 0;
        //field tools
        for(index; index < data.field_tools.und.length;index++){
          let tool = x[index];
          subtasks.push(this.nodeService.getNode(tool['field_tool_name'].und[0].target_id));
          this.project.field_tools.und.push(tool as field_collection_item_tool);
        }
        //field materials
        for(let i=0; i < data.field_materials.und.length ; i++){
          let material = x[index];
          subtasks.push(this.nodeService.getNode(material['field_material_name'].und[0].target_id));
          this.project.field_materials.und.push(material as field_collection_item_material);
          index++;
        }
        // field parts
        for(let i=0; i < data.field_parts.und.length ; i++){
          let part = x[index];
          subtasks.push(this.nodeService.getNode(part['field_part_name'].und[0].target_id));
          this.project.field_parts.und.push(part as field_collection_item_part);
          index++;
        }
        // field tags
        for(let i=0; i < data.field_tags.und.length ; i++){
          let tag = x[index];
          this.FormPrintableValues.tags.push(tag['name']);
          index++;
        }
        // field resources
        for(let i=0; i < data.field_resources.und.length ; i++){
          let resource = x[index];
          let value = resource['field_label'].und[0].tid;
          delete resource['field_label'].und;
          resource['field_label'].und = value;
          this.project.field_resources.und.push(resource as field_collection_item_resource);
          this.FormPrintableValues.resources_files.push(resource['field_resource_file'].und[0]);
          index++;
        }
        // field team
        for(let i=0; i< data.field_maker_memberships.und.length;i++){
          let member = x[index];
          subtasks.push(this.userService.getUser(member['field_team_member'].und[0].target_id));
          this.project.field_maker_memberships.und.push(member as field_collection_item_member);
          index++;
        }
                
      },
      (err) => {
        console.log('Error: %s', err);
      },
      () => {
        let subsource = Observable.forkJoin(subtasks);
        subsource.subscribe(
          (subx) => {
            var subindex = 0;
            // field tools
            for(subindex; subindex < data.field_tools.und.length ; subindex++){
              let tool = subx[subindex];
              let id = this.project.field_tools.und[subindex].field_tool_name.und[0].target_id;
              this.project.field_tools.und[subindex].field_tool_name.und[0].target_id = tool['title']+' ('+id+')';
            }
            // field materials
            for(let i = 0; i < data.field_materials.und.length ; i++){
              let material = subx[subindex];
              let id = this.project.field_materials.und[i].field_material_name.und[0].target_id;
              this.project.field_materials.und[i].field_material_name.und[0].target_id = material['name']+' ('+id+')';
              subindex++;
            }
            // field parts
            for(let i = 0; i < data.field_parts.und.length ; i++){
              let part = subx[subindex];
              let id = this.project.field_parts.und[i].field_part_name.und[0].target_id;
              this.project.field_parts.und[i].field_part_name.und[0].target_id = part['name']+' ('+id+')';
              subindex++;
            }
            // field team
            for(let i = 0; i < data.field_maker_memberships.und.length ; i++){
              let member = subx[subindex];
              let id = this.project.field_maker_memberships.und[i].field_team_member.und[0].target_id;
              this.project.field_maker_memberships.und[i].field_team_member.und[0].target_id = member['name']+' ('+id+')';
              subindex++;
            }
          },
          (err) => {
            console.log('Error: %s', err);
          },
          () => {
            this.fileService.getFileById(this.project.field_cover_photo.und[0].fid).subscribe((file:FileEntity) =>{
              file.file = "data:"+file.filemime+";base64,"+file.file;
              this.FormPrintableValues.cover_image = file;
              this.ProjectLoaded = true;
            });
          }
        );
      }
    );
  }

  SetProjectOwner(){
    this.userService.getStatus().subscribe(data => {
      let owner:field_collection_item_member = {
        field_team_member:{und:[{target_id:data.user.name+' ('+data.user.uid+')'}]},
        field_membership_role:{und:[{value:'admin'}]},
        field_sort_order:{und:[{value:1}]},
      }
      this.project.field_maker_memberships.und.push(owner);
    });
  }

  /**
   * final function witch will post the project object to drupal after finishing all the functions to map the values
   */
  SaveProject(){
    if(this.project.field_visibility2.und[0] == 370){
      this.CheckIfReadyToPublic();
    }
    if(this.project.nid){
      this.nodeService.UpdateNode(this.project).subscribe((project:Project) =>{
        this.notificationBarService.create({ message: 'Project Updated', type: NotificationType.Success});
        this.router.navigate(['/profile']);
      }, err =>{
        console.log(err);
        this.notificationBarService.create({ message: 'Project not saved , check the logs please', type: NotificationType.Error});
      });
    }else{
      this.nodeService.createNode(this.project).subscribe((project:Project) => {
        this.notificationBarService.create({ message: 'Project Saved', type: NotificationType.Success});
        this.router.navigate(['/profile']);
      }, err =>{
        console.log(err);
        this.notificationBarService.create({ message: 'Project not saved , check the logs please', type: NotificationType.Error});
      });
    }
  }

  /**
   * form update handler from all sub components
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
    this.project.field_visibility2.und[0] = Visibility;
    this.project.status = Status;
    this.SetPrjectValues();
  }

  /**
   * Checking the project if ready to publish
   * otherwhise will be saved as a draft
   */
  CheckIfReadyToPublic(){
    if(this.project.title == ""){
      this.project.title = "Untitled";
    }
    if(this.project.field_categories.und.length == 0 || this.project.field_cover_photo.und[0].fid == 0 ||
       this.project.title == ("Untitled" || "untitled") || this.project.field_story.und[0].value == ""){
        this.project.field_visibility2.und[0] = 1115;
        this.project.status = 0;
       }
  }

  /**
   * function to migrate and map the values from the forms to the project object
   * for example you must upload the file image then reference the project cover_image field to this fid
   */
  SetPrjectValues(){
    this.project.field_tags.und = this.FormPrintableValues.tags.toString();
    let image:FileEntity = {file:this.FormPrintableValues.cover_image.file,filename:this.FormPrintableValues.cover_image.filename};
    image.file = this.RemoveFileTypeFromBase64(this.FormPrintableValues.cover_image.file);    
    let tasks = [];
    if(image.file){
      tasks.push(this.fileService.SendCreatedFile(image));
    }
    if(this.FormPrintableValues.resources_files.length > 0){
      this.FormPrintableValues.resources_files.forEach((element:FileEntity,index:number)=>{
        element.file = this.RemoveFileTypeFromBase64(element.file);
        tasks.push(this.fileService.SendCreatedFile(element));
      });
    }
    let source = Observable.forkJoin(tasks);
    source.subscribe(
      (x) => {
        var index = 0;
        if(image.file){
          this.project.field_cover_photo.und[0] = x[0] as field_file_reference;
          index++;
        }
        for(index; index < this.FormPrintableValues.resources_files.length; index++){
          this.project.field_resources.und[index].field_resource_file.und[0] = x[index] as field_file_reference;
        }
      },
      (err) => {
        console.log('Error: %s', err);
      },
      () => {
        this.SaveProject();
      }
    );
  }

  RemoveFileTypeFromBase64(filecontent:string):string{
    let re = /^data:image\/[^;]+;base64,/g;
    let newcontent = re[Symbol.replace](filecontent, '');  
    return newcontent;
  }
}
