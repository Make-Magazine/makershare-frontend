import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { NodeService } from '../../../../d7services/node/node.service';
import { FileService } from '../../../../d7services/file/file.service';
import { ViewService } from '../../../../d7services/view/view.service';
import { TaxonomyService } from '../../../../d7services/taxonomy/taxonomy.service';
import { ProjectForm, ProjectView } from '../../../../models/project/project-form/project';
import { FileEntity } from '../../../../models/Drupal/file_entity';
import { field_file_reference } from '../../../../models/Drupal/field_file_reference';
import { Observable } from "rxjs";
import { NotificationBarService, NotificationType } from 'angular2-notification-bar';
import { Router,Params,ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../d7services/user/user.service';
import { field_collection_item_member,field_collection_item_tool,field_collection_item_material,field_collection_item_part,field_collection_item_resource } from '../../../../models/project/project-form/field_collection_item';
import { NodeHelper } from '../../../../models/Drupal/NodeHelper';

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
  project: ProjectForm = new ProjectForm(); 

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
    this.ProjectLoaded = false;
    this.route.params.subscribe(params => {
      nid = params["nid"];
    });
    if(nid){
      this.nodeService.getNode(nid).subscribe((project:ProjectView) => {
        this.ConvertProjectToCreateForm(project);
      });
    }else{
      this.SetProjectOwner();
    }
    this.current_active_tab = 'Your Story';
  }

  ConvertProjectToCreateForm(data:ProjectView){
    var tasks = [];
    let NotReadyFields = ["field_categories","field_difficulty","field_duration","field_tags","field_tools","field_materials","field_parts","field_resources","field_maker_memberships"];
    for(let index in data){
      let field = data[index];
      if(NotReadyFields.indexOf(index) == -1){
        this.project[index] = field;
      }else if(field.und){
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
        if(data.field_tools.und){
          for(index; index < data.field_tools.und.length;index++){
            let tool = x[index];
            if(tool['field_tool_name'].und){
              subtasks.push(this.nodeService.getNode(tool['field_tool_name'].und[0].target_id));
              this.project.field_tools.und.push(tool as field_collection_item_tool);
            }
          }
        }
        //field materials
        if(data.field_materials.und){
          for(let i=0; i < data.field_materials.und.length ; i++){
            let material = x[index];
            if(material['field_material_name'].und){
              subtasks.push(this.nodeService.getNode(material['field_material_name'].und[0].target_id));
              this.project.field_materials.und.push(material as field_collection_item_material);
            }
            index++;
          }
        }
        // field parts
        if(data.field_parts.und){
          for(let i=0; i < data.field_parts.und.length ; i++){
            let part = x[index];
            if(part['field_part_name'].und){
              subtasks.push(this.nodeService.getNode(part['field_part_name'].und[0].target_id));
              this.project.field_parts.und.push(part as field_collection_item_part);
            }
            index++;
          }
        }
        // field tags
        if(data.field_tags.und){
          for(let i=0; i < data.field_tags.und.length ; i++){
            let tag = x[index];
            this.FormPrintableValues.tags.push(tag['name']);
            index++;
          }
        }
        // field resources
        if(data.field_resources.und){
          for(let i=0; i < data.field_resources.und.length ; i++){
            let resource = x[index];
            if(resource['field_resource_file'].und){
              let value = resource['field_label'].und[0].tid;
              delete resource['field_label'].und;
              resource['field_label'].und = value;
              this.project.field_resources.und.push(resource as field_collection_item_resource);
              this.FormPrintableValues.resources_files.push(resource['field_resource_file'].und[0]);
            }
            index++;
          }
        }
        // field team
        for(let i=0; i< data.field_maker_memberships.und.length;i++){
          let member = x[index];
          if(member['field_team_member'].und){
            subtasks.push(this.userService.getUser(member['field_team_member'].und[0].target_id));
            this.project.field_maker_memberships.und.push(member as field_collection_item_member);
          }
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
            if(data.field_tools.und){
              for(let i = 0; i < data.field_tools.und.length ; i++){
                let tool = subx[subindex];
                if(tool && tool['title']){
                  let id = this.project.field_tools.und[i].field_tool_name.und[0].target_id;
                  this.project.field_tools.und[i].field_tool_name.und[0].target_id = tool['title']+' ('+id+')';
                  subindex++;
                }
              }
            }
            // field materials
            if(data.field_materials.und){
              for(let i = 0; i < data.field_materials.und.length ; i++){
                let material = subx[subindex];
                if(material && material['title']){
                  let id = this.project.field_materials.und[i].field_material_name.und[0].target_id;
                  this.project.field_materials.und[i].field_material_name.und[0].target_id = material['title']+' ('+id+')';
                  subindex++;
                }
              }
            }
            // field parts
            if(data.field_parts.und){
              for(let i = 0; i < data.field_parts.und.length ; i++){
                let part = subx[subindex];
                if(part && part['title']){
                  let id = this.project.field_parts.und[i].field_part_name.und[0].target_id;
                  this.project.field_parts.und[i].field_part_name.und[0].target_id = part['title']+' ('+id+')';
                  subindex++;
                }
              }
            }
            // field team
            for(let i = 0; i < data.field_maker_memberships.und.length ; i++){
              let member = subx[subindex];
              if(member && member['name']){
                let id = this.project.field_maker_memberships.und[i].field_team_member.und[0].target_id;
                this.project.field_maker_memberships.und[i].field_team_member.und[0].target_id = member['name']+' ('+id+')';
                subindex++;
              }
            }
          },
          (err) => {
            console.log('Error: %s', err);
          },
          () => {
            if(this.project.field_cover_photo.und){
              this.fileService.getFileById(this.project.field_cover_photo.und[0].fid as number).subscribe((file:FileEntity) =>{
                file.file = NodeHelper.AddFileTypeToBase64(file.file,file.filemime);
                this.FormPrintableValues.cover_image = file;
                this.ProjectLoaded = true;
              });
            }else{
              this.ProjectLoaded = true;
            }
            this.ReInitEmptyFields();
          }
        );
      }
    );
  }

  ReInitEmptyFields(){
    let newproject:ProjectForm = new ProjectForm();
    for(let index in this.project){
      if(!this.project[index] || NodeHelper.isEmpty(this.project[index])){
        this.project[index] = newproject[index];
      }
    }    
  }

  SetProjectOwner(){
    this.userService.getStatus().subscribe(data => {
      let owner:field_collection_item_member = {
        field_team_member:{und:[{target_id:data.user.name+' ('+data.user.uid+')'}]},
        field_membership_role:{und:[{value:'admin'}]},
        field_sort_order:{und:[{value:1}]},
      }
      this.project.SetField(owner,'field_maker_memberships');
      this.ProjectLoaded = true;
    });
  }

  /**
   * final function witch will post the project object to drupal after finishing all the functions to map the values
   */
  SaveProject(){
    if(this.project.GetField("field_visibility2").und[0] == 370){
      this.project.CheckIfReadyToPublic();
    }
    if(this.project.GetField("nid")){
      delete this.project.field_original_team_members;
      this.nodeService.UpdateNode(this.project).subscribe((project:ProjectView) =>{
        this.notificationBarService.create({ message: 'Project Updated', type: NotificationType.Success});
        this.router.navigate(['/profile']);
      }, err =>{
        console.log(err);
        this.notificationBarService.create({ message: 'Project not saved , check the logs please', type: NotificationType.Error});
      });
    }else{
      this.nodeService.createNode(this.project).subscribe((project:ProjectView) => {
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
    this.project.SetField(Visibility,"field_visibility2");
    this.project.SetField(Status,"status");
    this.SetPrjectValues();
  }

  /**
   * function to migrate and map the values from the forms to the project object
   * for example you must upload the file image then reference the project cover_image field to this fid
   */
  SetPrjectValues(){
    var tasks = [];
    this.project.SetField(this.FormPrintableValues.tags.toString(),"field_tags");
    var image:FileEntity = {file:this.FormPrintableValues.cover_image.file,filename:this.FormPrintableValues.cover_image.filename};
    if(!this.FormPrintableValues.cover_image['fid']){
      image.file = NodeHelper.RemoveFileTypeFromBase64(this.FormPrintableValues.cover_image.file);    
      if(image.file){
        tasks.push(this.fileService.SendCreatedFile(image));
      }
    }
    if(this.FormPrintableValues.resources_files.length > 0){
      this.FormPrintableValues.resources_files.forEach((element:FileEntity,index:number)=>{
        if(!element.fid){
          element.file = NodeHelper.RemoveFileTypeFromBase64(element.file);
          tasks.push(this.fileService.SendCreatedFile(element));
        }
      });
    }
    let source = Observable.forkJoin(tasks);
    source.subscribe(
      (x) => {
        var index = 0;
        if(!this.FormPrintableValues.cover_image['fid'] && image.file){
          this.project.SetField(x[0] as field_file_reference,'field_cover_photo');
          index++;
        }
        for(let i=0; i < this.FormPrintableValues.resources_files.length; i++){
          if(!this.FormPrintableValues.resources_files[i].fid && this.project.field_resources.und[i]){
            this.project.field_resources.und[i].field_resource_file.und[0] = x[index] as field_file_reference;
            index++;
          }
        }
      },
      (err) => {
        console.log('Error: %s', err);
      },
      () => {
        this.ResetFieldCollectionEmptyRows();
      }
    );
  }

  ResetFieldCollectionEmptyRows(){
    for(let i = this.project.field_maker_memberships.und.length-1;i < 6; i++){
      let member = new field_collection_item_member();
      this.project.field_maker_memberships.und.push(member);
    }
    for(let i = this.project.field_tools.und.length-1;i < 19; i++){
      let tool = new field_collection_item_tool();
      this.project.field_tools.und.push(tool);
    }
    for(let i = this.project.field_parts.und.length-1;i < 19; i++){
      let part = new field_collection_item_part();
      this.project.field_parts.und.push(part);
    }
    for(let i = this.project.field_materials.und.length-1;i < 19; i++){
      let material = new field_collection_item_material();
      this.project.field_materials.und.push(material);
    }
    for(let i = this.project.field_resources.und.length-1;i < 19; i++){
      let resource = new field_collection_item_resource();
      this.project.field_resources.und.push(resource);
    }
    this.SaveProject();
  }

}
