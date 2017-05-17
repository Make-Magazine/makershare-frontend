import { Component, OnInit, HostListener } from '@angular/core';
import { Validators } from '@angular/forms';
import { NodeService,FileService,ViewService,MainService,TaxonomyService,UserService } from '../../../../d7services';
import { Observable } from "rxjs";
import { NotificationBarService, NotificationType } from 'angular2-notification-bar/release';
import { Router, NavigationExtras, ActivatedRoute, Params, NavigationEnd } from '@angular/router';
import {
  FileEntity, ProjectForm, ProjectView, field_file_reference, NodeHelper, UserInvitations,
  field_number, field_collection_item_member, field_collection_item_tool, field_collection_item_material,
  field_collection_item_part, field_collection_item_resource
}from '../../../../models';
import { ComponentCanDeactivate } from '../pending-changes.guard';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
})

/**
 * Hello and welcome to project create and edit component
 * this component is used to managing the project like editing or creating new projects
 * WARNING : MY ENGLISH IS NOT THAT GOOD AND YOU MAY HAS A CANCER WHILE READING THE COMMENTS :)
 */
export class ProjectFormComponent implements OnInit, ComponentCanDeactivate {
  CanNavigate: boolean = true;
  // @HostListener allows us to also guard against browser refresh, close, etc.
  canDeactivate(): Observable<boolean> | boolean {
    // insert logic to check if there are pending changes here;
    // returning true will navigate without confirmation
    // returning false will show a confirm alert before navigating away
    return this.CanNavigate;
  }

  // @HostListener allows us to also guard against browser refresh, close, etc.
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (!this.canDeactivate()) {
      $event.returnValue = "You have unsaved changes, are you sure you want to leave this page?";
    }
  }
  /**
   * this variables are used to navigating or static project fields
   * also contain the values what will be printed in the form 
   * because the values what drupal returns are just a references to the entity
   * so we need a separated variables to store the display values
   */
  defaultTabObs: Observable<string>;
  missionRedirection: string='no';

  ProjectLoaded: boolean;
  StoryFormValid: boolean = false;
  current_active_tab: string;
  TryToSubmitPrivatePublic: boolean = false;
  FormPrintableValues = {
    cover_image: { file: "", filename: "" },
    tags: [],
    resources_files: [],
    InvitationEmails: { uid: '', project: '', mails: [] }
  }

  /**
   * the project object with empty values which will be transfared to the sub components to set the values inside it before posting them
   */
  project: ProjectForm = new ProjectForm();

  constructor(
    private nodeService: NodeService,
    private fileService: FileService,
    private viewService: ViewService,
    private taxonomyService: TaxonomyService,
    private notificationBarService: NotificationBarService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private mainService: MainService,

  ) { }

  ngOnInit(): void {
    var path;
    this.ProjectLoaded = false;
    this.route.params.subscribe(params => {
      path = params["path"];
    });
    this.nodeService.getIdFromUrl(path,'project').subscribe(ids=>{
      var nid = ids[0];  
      if(path && !ids[0])
        nid = path;
      if (nid) {
        this.GetProject(nid);
      } else {
        this.SetProjectOwner();
      }
      this.current_active_tab = 'Your Story';
      // set default tab according to url parameter "tab"
      this.defaultTabObs = this.route.queryParams.map(params => params['redirectTo']);
      this.defaultTabObs.subscribe(tab => {
        if (tab != undefined || tab != '') {
          this.missionRedirection = decodeURIComponent(tab);
        }
        else if(tab =undefined){
        //  console.log("asdsadsadsadsa");
        }
      });
    });
  }

  GetProject(nid: number) {
    this.nodeService.getNode(nid).subscribe((project: ProjectView) => {
      this.ConvertProjectToCreateForm(project);
    });
  }

  ConvertProjectToCreateForm(data: ProjectView) {
    var tasks = [];
    let NotReadyFields = ["field_visibility2", "field_categories", "field_difficulty", "field_duration", "field_tags", "field_tools", "field_materials", "field_parts", "field_resources", "field_maker_memberships"];
    for (let index in data) {
      let field = data[index];
      if (NotReadyFields.indexOf(index) == -1) {
        this.project[index] = field;
      } else if (field.und) {
        switch (index) {
          case "field_categories":
            {
              field.und.forEach(category => {
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
                tasks.push(this.viewService.getView("entity_field_collection_item/" + member.value));
              });
              break;
            }
          case "field_tools":
            {
              field.und.forEach(tool => {
                tasks.push(this.viewService.getView("entity_field_collection_item/" + tool.value));
              });
              break;
            }
          case "field_materials":
            {
              field.und.forEach(material => {
                tasks.push(this.viewService.getView("entity_field_collection_item/" + material.value));
              });
              break;
            }
          case "field_parts":
            {
              field.und.forEach(part => {
                tasks.push(this.viewService.getView("entity_field_collection_item/" + part.value));
              });
              break;
            }
          case "field_resources":
            {
              field.und.forEach(resource => {
                tasks.push(this.viewService.getView("entity_field_collection_item/" + resource.value));
              });
              break;
            }
          case "field_visibility2":
            {
              this.project.field_visibility2.und[0] = field.und[0].tid;
              if(this.project.field_visibility2.und[0] != 1115){
                this.StoryFormValid = true;
              }
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
        if (data.field_tools.und) {
          for (index; index < data.field_tools.und.length; index++) {
            let tool = x[index];
            if (tool['field_tool_name'].und) {
              subtasks.push(this.nodeService.getNode(tool['field_tool_name'].und[0].target_id));
              this.project.field_tools.und.push(tool as field_collection_item_tool);
            }
          }
        }
        //field materials
        if (data.field_materials.und) {
          for (let i = 0; i < data.field_materials.und.length; i++) {
            let material = x[index];
            if (material['field_material_name'].und) {
              subtasks.push(this.nodeService.getNode(material['field_material_name'].und[0].target_id));
              this.project.field_materials.und.push(material as field_collection_item_material);
            }
            index++;
          }
        }
        // field parts
        if (data.field_parts.und) {
          for (let i = 0; i < data.field_parts.und.length; i++) {
            let part = x[index];
            if (part['field_part_name'].und) {
              subtasks.push(this.nodeService.getNode(part['field_part_name'].und[0].target_id));
              this.project.field_parts.und.push(part as field_collection_item_part);
            }
            index++;
          }
        }
        // field tags
        if (data.field_tags.und) {
          for (let i = 0; i < data.field_tags.und.length; i++) {
            let tag = x[index];
            this.FormPrintableValues.tags.push(tag['name']);
            index++;
          }
        }
        // field resources
        if (data.field_resources.und) {
          for (let i = 0; i < data.field_resources.und.length; i++) {
            let resource = x[index];
            this.project.field_resources.und.push(resource as field_collection_item_resource);
            if (resource['field_resource_file'].und) {
              this.FormPrintableValues.resources_files.push(resource['field_resource_file'].und[0]);
            }
            index++;
          }
        }
        // field team
        if (data.field_maker_memberships.und) {
          for (let i = 0; i < data.field_maker_memberships.und.length; i++) {
            let member = x[index];
            if (member['field_team_member'].und) {
              subtasks.push(this.userService.getUser(member['field_team_member'].und[0].target_id));
            }
            this.project.field_maker_memberships.und.push(member as field_collection_item_member);
            index++;
          }
        } else {
          this.SetProjectOwner();
        }
      },
      (err) => {
       // console.log('Error: %s', err);
      },
      () => {
        let subsource = Observable.forkJoin(subtasks);
        subsource.subscribe(
          (subx) => {
            var subindex = 0;
            // field tools
            if (data.field_tools.und) {
              for (let i = 0; i < data.field_tools.und.length; i++) {
                let tool = subx[subindex];
                if (tool && tool['title']) {
                  let id = this.project.field_tools.und[i].field_tool_name.und[0].target_id;
                  this.project.field_tools.und[i].field_tool_name.und[0].target_id = tool['title'] + ' (' + id + ')';
                  subindex++;
                }
              }
            }
            // field materials
            if (data.field_materials.und) {
              for (let i = 0; i < data.field_materials.und.length; i++) {
                let material = subx[subindex];
                if (material && material['title']) {
                  let id = this.project.field_materials.und[i].field_material_name.und[0].target_id;
                  this.project.field_materials.und[i].field_material_name.und[0].target_id = material['title'] + ' (' + id + ')';
                  subindex++;
                }
              }
            }
            // field parts
            if (data.field_parts.und) {
              for (let i = 0; i < data.field_parts.und.length; i++) {
                let part = subx[subindex];
                if (part && part['title']) {
                  let id = this.project.field_parts.und[i].field_part_name.und[0].target_id;
                  this.project.field_parts.und[i].field_part_name.und[0].target_id = part['title'] + ' (' + id + ')';
                  subindex++;
                }
              }
            }
            // field team
            for (let i = 0; i < data.field_maker_memberships.und.length; i++) {
              let member = subx[subindex];
              if (member && member['name']) {
                this.project.field_maker_memberships.und.forEach((element,ind)=>{
                  if(element.field_team_member.und){
                    let id = this.project.field_maker_memberships.und[ind].field_team_member.und[0].target_id;
                    this.project.field_maker_memberships.und[ind].field_team_member.und[0].target_id = member['name'] + ' (' + id + ')';
                    subindex++;
                  }
                });
              }
            }
          },
          (err) => {
            //console.log('Error: %s', err);
          },
          () => {
            if (this.project.field_cover_photo.und) {
              this.fileService.getFileById(this.project.field_cover_photo.und[0].fid as number).subscribe((file: FileEntity) => {
                file.file = NodeHelper.AddFileTypeToBase64(file.file, file.filemime);
                this.FormPrintableValues.cover_image = file;
                this.ProjectLoaded = true;
              });
            } else {
              this.ProjectLoaded = true;
            }
            this.ReInitEmptyFields();
          }
        );
      }
    );
  }

  ReInitEmptyFields() {
    let newproject: ProjectForm = new ProjectForm();
    for (let index in this.project) {
      if (!this.project[index] || NodeHelper.isEmpty(this.project[index])) {
        this.project[index] = newproject[index];
      }
    }
  }

  SetProjectOwner() {
    let owner: field_collection_item_member = {
      field_team_member: { und: [{ target_id: localStorage.getItem("user_name") + ' (' + localStorage.getItem("user_id") + ')' }] },
      field_membership_role: { und: [{ value: 'admin' }] },
    }
    this.project.SetField(owner, 'field_maker_memberships');
    this.ProjectLoaded = true;
  }

  /**
   * final function witch will post the project object to drupal after finishing all the functions to map the values
   */
  SaveProject() {
    this.ProjectLoaded = false;
    if (this.project.GetField("field_visibility2").und[0] == 370 || this.project.GetField("field_visibility2").und[0] == 371) {
      this.project.CheckIfReadyToPublic();
    }
    if(this.project.field_categories.und.length == 0){
      this.project.field_aha_moment.und = [""];
    }
    if (this.project.GetField("nid")) {
      delete this.project.field_original_team_members;
      delete this.project.field_forks;
      this.nodeService.UpdateNode(this.project).subscribe((project: ProjectView) => {
        this.CanNavigate = true;
        this.FormPrintableValues.InvitationEmails.project = project.nid.toString();
        this.sendInvitedEmails(this.FormPrintableValues.InvitationEmails);
        this.GetProject(project.nid);
        this.showSuccessMessage('update', this.project.field_visibility2['und'][0]);
        this.project = new ProjectForm();
      }, err => {
       // console.log(err);
        this.notificationBarService.create({ message: 'Project not saved , check the logs please', type: NotificationType.Error });
      });
    } else {
      this.nodeService.createNode(this.project).subscribe((project: ProjectView) => {
        this.CanNavigate = true;
        this.FormPrintableValues.InvitationEmails.project = project.nid.toString();
        if (!NodeHelper.isEmpty(this.FormPrintableValues.InvitationEmails.mails)) {
          this.sendInvitedEmails(this.FormPrintableValues.InvitationEmails);
        }
        this.GetProject(project.nid);
        this.showSuccessMessage('create', this.project.field_visibility2['und'][0]);
        this.project = new ProjectForm();
      }, err => {
       // console.log(err);
        this.notificationBarService.create({ message: 'Project not saved , check the logs please', type: NotificationType.Error });
      });
    }
  }

  sendInvitedEmails(emails) {
    this.mainService.post('/api/team_service/send', emails).map(res => res.json()).subscribe(data => {

    }, err => {
    //  console.log(err);
    });
  }

  /**
   * form update handler from all sub components
   * @param event : the value of the object from sub componet emitter
   */
  UpdateFields(event, component) {
    if (component === "Your Story") {
      this.FormPrintableValues.tags = event;
    } else if (component === "Team") {
      this.FormPrintableValues.InvitationEmails = event;
    } else {
      this.FormPrintableValues.resources_files = event;
    }
  }

  /**
   * form saving function for all types of the project
   * @param Visibility : the field value witch has 3 types "public ,private and draft"
   * @param Status : the status of the project dependent on visibility type
   */
  GettingFieldsReady(Status: number, Visibility: number) {
    this.current_active_tab = 'Your Story';
    if (Visibility != 1115 && !this.StoryFormValid && this.project.field_visibility2['und'][0] == 1115) {
      this.notificationBarService.create({ message: 'Ah snap! Looks Like we need a little more info from you.', type: NotificationType.Error });
      this.TryToSubmitPrivatePublic = true;
      return;
    }
    this.project.SetField(Visibility, 'field_visibility2');
    this.project.SetField(Status, "status");
    if (!this.project.title) {
      this.project.SetField("Untitled", "title");
    }
    if (this.project.field_show_tell_video_as_default.und[0].value == 0) {
      delete this.project.field_show_tell_video_as_default.und;
    }
    this.SetPrjectValues();
  }

  /**
   * function to migrate and map the values from the forms to the project object
   * for example you must upload the file image then reference the project cover_image field to this fid
   */
  SetPrjectValues() {
    var tasks = [];
    this.project.SetField(this.FormPrintableValues.tags.toString(), "field_tags");
    var image: FileEntity = { file: this.FormPrintableValues.cover_image.file, filename: this.FormPrintableValues.cover_image.filename };
    if (!this.FormPrintableValues.cover_image['fid']) {
      image.file = NodeHelper.RemoveFileTypeFromBase64(this.FormPrintableValues.cover_image.file);
      if (image.file) {
        tasks.push(this.fileService.SendCreatedFile(image));
      }
    } else {
      this.project.field_cover_photo.und[0].fid = this.FormPrintableValues.cover_image['fid'];
    }
    if (this.FormPrintableValues.resources_files.length > 0) {
      this.FormPrintableValues.resources_files.forEach((element: FileEntity, index: number) => {
        if (!element.fid) {
          element.file = NodeHelper.RemoveFileTypeFromBase64(element.file);
          tasks.push(this.fileService.SendCreatedFile(element));
        }
      });
    }
    let source = Observable.forkJoin(tasks);
    source.subscribe(
      (x) => {
        var index = 0;
        if (!this.FormPrintableValues.cover_image['fid'] && image.file) {
          this.project.SetField(x[0] as field_file_reference, 'field_cover_photo');
          index++;
        }
        this.project.field_resources.und.forEach((item,resourcesindex)=>{
          for (let i = 0; i < this.FormPrintableValues.resources_files.length; i++) {
            if (!this.FormPrintableValues.resources_files[i].fid && item.field_resource_file == this.FormPrintableValues.resources_files[i].filename) {
              this.project.field_resources.und[resourcesindex].field_resource_file.und[0] = x[index] as field_file_reference;
              index++;
              return;
            }
          }
        });
      },
      (err) => {
       // console.log('Error: %s', err);
      },
      () => {
        this.ResetFieldCollectionEmptyRows();
      }
    );
  }

  ResetFieldCollectionEmptyRows() {
    for (let i = this.project.field_maker_memberships.und.length - 1; i < 6; i++) {
      let member = new field_collection_item_member();
      this.project.field_maker_memberships.und.push(member);
    }
    for (let i = this.project.field_tools.und.length - 1; i < 19; i++) {
      let tool = new field_collection_item_tool();
      this.project.field_tools.und.push(tool);
    }
    for (let i = this.project.field_parts.und.length - 1; i < 19; i++) {
      let part = new field_collection_item_part();
      this.project.field_parts.und.push(part);
    }
    for (let i = this.project.field_materials.und.length - 1; i < 19; i++) {
      let material = new field_collection_item_material();
      this.project.field_materials.und.push(material);
    }
    for (let i = this.project.field_resources.und.length - 1; i < 19; i++) {
      let resource = new field_collection_item_resource();
      this.project.field_resources.und.push(resource);
    }
    this.InviteTeam();
  }

  InviteTeam() {
    if (this.FormPrintableValues.InvitationEmails.mails.length !== 0) {
      this.mainService.post('/api/team_service/build', this.FormPrintableValues.InvitationEmails).map(res => res.json()).subscribe(data => {
        for (let email in data) {
          let user = data[email];
          this.project.field_maker_memberships.und.forEach((row: field_collection_item_member, index: number) => {
            if (row.field_team_member.und && row.field_team_member.und[0].target_id === email) {
              row.field_team_member.und[0].target_id = user.name + ' (' + user.uid + ')';
              return;
            }
          });
        } 
        this.SaveProject();
      });
    } else {
      this.SaveProject();
    }
  }

  /**
   * form update handler from all sub components
   * @param action : the action (save/update)
   * @param visibility : the tid of the visibility status
   */
  showSuccessMessage(action: string, visibility: number) {
    // update success messages
    var tab: string = 'public';
    if (action == 'update') {

      if (visibility == 1115) {
        // updates as draft
        this.notificationBarService.create({ message: 'Your project is missing some fields, so we added it to your Drafts', type: NotificationType.Warning, allowClose: true, autoHide: false, hideOnHover: false  });
        tab = 'draft';
      } else if (visibility == 371) {
        // save as private
        this.notificationBarService.create({ message: 'Your project has been updated as private.', type: NotificationType.Success, allowClose: true, autoHide: false, hideOnHover: false });
        tab = 'private';
      } else {
        // save is public
        this.notificationBarService.create({ message: 'Your project has been updated.', type: NotificationType.Success, allowClose: true, autoHide: false, hideOnHover: false });
        tab = 'public';
      }
    } else if (action == 'create') {
      if (visibility == 1115) {
        // updates as draft
        this.notificationBarService.create({ message: 'Your project is missing some fields, so we added it to your Drafts', type: NotificationType.Warning , allowClose: true, autoHide: false, hideOnHover: false });
        tab = 'draft';

      } else if (visibility == 371) {
        // save as private
        this.notificationBarService.create({ message: 'Your project has been saved as private.', type: NotificationType.Success, allowClose: true, autoHide: false, hideOnHover: false });
        tab = 'private';
      } else {
        // save is public
        this.notificationBarService.create({ message: 'Your project has been created.', type: NotificationType.Success, allowClose: true, autoHide: false, hideOnHover: false });
        if (this.missionRedirection.includes("/missions/enter-mission/")) {
          let navigationExtras: NavigationExtras = {
            queryParams: { 'projectId': "newproject" },
          };
          this.router.navigate([this.missionRedirection], navigationExtras);
        }
        tab = 'public';
      }
    }
    // navigate to the portfolio with required tab
    let navigationExtras: NavigationExtras = {
      queryParams: { 'tab': tab },
    };
    let userID = +localStorage.getItem("user_id");
    if (visibility != 1115 && this.missionRedirection == 'undefined') {
      this.userService.getUrlFromId(userID).subscribe(res => {
        this.router.navigate(['/portfolio/' + res.url], navigationExtras);
      });
    }
  }
}
