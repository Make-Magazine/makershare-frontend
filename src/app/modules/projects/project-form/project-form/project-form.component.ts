import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NotificationBarService, NotificationType } from 'ngx-notification-bar/release';
import { Observable } from 'rxjs/Observable';
import {
  date_time,
  field_date,
  FieldCollectionItemMaterial,
  FieldCollectionItemMember,
  FieldCollectionItemPart,
  FieldCollectionItemResource,
  FieldCollectionItemTool,
  FieldFileReference,
  FileEntity,
  NodeHelper,
  ProjectForm,
  ProjectHold,
  ProjectView
} from '../../../../core';
import {
  FileService,
  MainService,
  NodeService,
  TaxonomyService,
  UserService,
  ViewService
} from '../../../../core/d7services';
import { ComponentCanDeactivate } from '../../../projects/project-form/pending-changes.guard';

declare var swal: any;
@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
})
export /**
 * Hello and welcome to project create and edit component
 * this component is used to managing the project like editing or creating new projects
 * WARNING : MY ENGLISH IS NOT THAT GOOD AND YOU MAY HAS A CANCER WHILE READING THE COMMENTS :) - Breaker "Wasim Nabil"
 */
class ProjectFormComponent implements OnInit, ComponentCanDeactivate {
  CanNavigate: boolean = true;

  // // @HostListener allows us to also guard against browser refresh, close, etc.
  // @HostListener('window:beforeunload', ['$event'])
  // unloadNotification($event: any) {
  //   if (!this.canDeactivate()) {
  //     $event.returnValue = "You have unsaved changes, are you sure you want to leave this page?";
  //   }
  // }
  /**
   * this variables are used to navigating or static project fields
   * also contain the values what will be printed in the form
   * because the values what drupal returns are just a references to the entity
   * so we need a separated variables to store the display values
   */
  defaultTabObs: Observable<string>;
  missionRedirection: string = 'no';

  Holder;
  ProjectLoaded: boolean;
  StoryFormValid: boolean = false;
  current_active_tab: string;
  TryToSubmitPrivatePublic: boolean = false;
  FormPrintableValues = {
    cover_image: { file: '', filename: '' },
    tags: [],
    resources_files: [],
    InvitationEmails: { uid: '', project: '', mails: [] },
  };

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
  ) {}

  canDeactivate(): Observable<boolean> | boolean {
    // insert logic to check if there are pending changes here;
    // returning true will navigate without confirmation
    // returning false will show a confirm alert before navigating away
    return this.CanNavigate;
  }

  ngOnInit(): void {
    let path;
    this.ProjectLoaded = false;
    this.route.params.subscribe(params => {
      path = params['path'];
    });
    this.nodeService.getIdFromUrl(path, 'project').subscribe(ids => {
      let nid = ids[0];
      if (path && !ids[0]) {
        nid = path;
      }
      if (nid) {
        this.GetProject(nid);
      } else {
        this.SetProjectOwner();
      }
      this.current_active_tab = 'Your Story';
      // set default tab according to url parameter "tab"
      this.defaultTabObs = this.route.queryParams.map(
        params => params['redirectTo'],
      );
      this.defaultTabObs.subscribe(tab => {
        if (tab != undefined || tab != '') {
          this.missionRedirection = decodeURIComponent(tab);
        } else if ((tab = undefined)) {
          //  console.log("asdsadsadsadsa");
        }
      });
    });
  }

  UpdateHolder() {
    setInterval(() => {
      const projectHold = new ProjectHold(
        this.project.getField('title') +
          ' (' +
        this.project.getField('nid') +
          ')',
      );
      projectHold.setField('title', this.project.getField('title'));
      projectHold.setField('nid', this.Holder.nid);
      if (this.Holder.field_users_wants_edit) {
        projectHold.field_users_wants_edit = this.Holder.field_users_wants_edit;
      }
      this.nodeService.updateNode(projectHold).subscribe();
    }, 180000);
  }

  GetProject(nid: number) {
    this.nodeService.getNode(nid).subscribe((project: ProjectView) => {
      this.viewService
        .getView('api_project_hold', [['nid', nid]])
        .subscribe(hold => {
          if (
            hold.length == 0 ||
            hold[0].uid == +localStorage.getItem('user_id')
          ) {
            const projectHold = new ProjectHold(
              project.title + ' (' + nid + ')',
            );
            projectHold.setField('title', project.title);
            if (hold.length == 0) {
              this.nodeService.createNode(projectHold).subscribe(node => {
                this.Holder = node;
                this.ConvertProjectToCreateForm(project);
              });
            } else {
              projectHold.setField('nid', hold[0].nid);
              delete projectHold.field_project_to_edit;
              this.nodeService.updateNode(projectHold).subscribe(node => {
                this.Holder = hold[0];
                this.ConvertProjectToCreateForm(project);
              });
            }
            this.UpdateHolder();
          } else {
            swal(
              {
                title: 'Wait!',
                text:
                  hold[0].name +
                  ' is currently editing this project. Only one editor can make changes at a time, Do you want to be notified when he finishes?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#4F4F4F',
                confirmButtonText: 'Yes, notify me!',
                closeOnConfirm: true,
              },
              confirm => {
                if (confirm) {
                  const hoder = {
                    nid: hold[0].nid,
                    uid: localStorage.getItem('user_id'),
                  };
                  this.mainService.custompost('maker_project_api/hold_queue', hoder).subscribe(data => {
                    this.notificationBarService.create({
                      message: 'Successfully added to notify list',
                      type: NotificationType.Success,
                    });
                    this.router.navigate(['/portfolio']);
                  });
                } else {
                  this.router.navigate(['/portfolio']);
                }
              },
            );
            return;
          }
        });
    });
  }

  ConvertProjectToCreateForm(data: ProjectView) {
    const tasks = [];
    const NotReadyFields = [
      'field_creation_date',
      'field_visibility2',
      'field_categories',
      'field_difficulty',
      'field_duration',
      'field_tags',
      'field_tools',
      'field_materials',
      'field_parts',
      'field_resources',
      'field_maker_memberships',
    ];
    for (const index in data) {
      const field = data[index];
      if (NotReadyFields.indexOf(index) == -1) {
        this.project[index] = field;
      } else if (field.und) {
        switch (index) {
          case 'field_categories': {
            field.und.forEach(category => {
              this.project.field_categories.und.push(category.tid);
            });
            break;
          }
          case 'field_creation_date': {
            let date = field.und[0].value.split(' ');
            date = date[0].split('-');
            this.project.field_creation_date.und[0].value.date =
              date[1] + '/' + date[2] + '/' + date[0];
            break;
          }
          case 'field_difficulty': {
            this.project.field_difficulty.und = field.und[0].tid;
            break;
          }
          case 'field_duration': {
            this.project.field_duration.und = field.und[0].tid;
            break;
          }
          case 'field_tags': {
            field.und.forEach(tag => {
              tasks.push(this.taxonomyService.getTermByID(tag.tid));
            });
            break;
          }
          case 'field_maker_memberships': {
            field.und.forEach(member => {
              tasks.push(
                this.viewService.getView(
                  'entity_field_collection_item/' + member.value,
                ),
              );
            });
            break;
          }
          case 'field_tools': {
            field.und.forEach(tool => {
              tasks.push(
                this.viewService.getView(
                  'entity_field_collection_item/' + tool.value,
                ),
              );
            });
            break;
          }
          case 'field_materials': {
            field.und.forEach(material => {
              tasks.push(
                this.viewService.getView(
                  'entity_field_collection_item/' + material.value,
                ),
              );
            });
            break;
          }
          case 'field_parts': {
            field.und.forEach(part => {
              tasks.push(
                this.viewService.getView(
                  'entity_field_collection_item/' + part.value,
                ),
              );
            });
            break;
          }
          case 'field_resources': {
            field.und.forEach(resource => {
              tasks.push(
                this.viewService.getView(
                  'entity_field_collection_item/' + resource.value,
                ),
              );
            });
            break;
          }
          case 'field_visibility2': {
            this.project.field_visibility2.und[0] = field.und[0].tid;
            if (this.project.field_visibility2.und[0] != 1115) {
              this.StoryFormValid = true;
            }
            break;
          }
          default: {
            break;
          }
        }
      } else if (index == 'field_creation_date' && !field.und) {
        const created = new Date(+data.getField('created') * 1000);
        let date = new Date(
          created.getUTCFullYear(),
          created.getUTCMonth(),
          created.getUTCDate(),
          created.getUTCHours(),
          created.getUTCMinutes(),
          created.getUTCSeconds(),
        ); // reset date to UTC
        date = new Date(date.getTime() - 3 * 60 * 60 * 1000); // convert to america time zone
        let day = date.getDate().toString();
        let month = (date.getMonth() + 1).toString();
        const year = date.getFullYear();
        const minutes = date.getMinutes();
        const hours = date.getHours();
        if (+month < 10) {
          month = '0' + month;
        }
        if (+day < 10) {
          day = '0' + day;
        }

        const datetime = new date_time();

        datetime.date = month + '/' + day + '/' + year;
        datetime.time = hours + ':' + minutes + ':00';

        this.project.field_creation_date = { und: [new field_date(datetime)] };
      }
    }
    const subtasks = [];
    const source = Observable.forkJoin(tasks);
    source.subscribe(
      x => {
        let index = 0;
        // field tools
        if (data.field_tools.und) {
          for (index; index < data.field_tools.und.length; index++) {
            const tool = x[index];
            if (tool['field_tool_name'].und) {
              subtasks.push(
                this.nodeService.getNode(
                  tool['field_tool_name'].und[0].target_id,
                ),
              );
              this.project.field_tools.und.push(
                tool as FieldCollectionItemTool,
              );
            }
          }
        }
        // field materials
        if (data.field_materials.und) {
          for (let i = 0; i < data.field_materials.und.length; i++) {
            const material = x[index];
            if (material['field_material_name'].und) {
              subtasks.push(
                this.nodeService.getNode(
                  material['field_material_name'].und[0].target_id,
                ),
              );
              this.project.field_materials.und.push(
                material as FieldCollectionItemMaterial,
              );
            }
            index++;
          }
        }
        // field parts
        if (data.field_parts.und) {
          for (let i = 0; i < data.field_parts.und.length; i++) {
            const part = x[index];
            if (part['field_part_name'].und) {
              subtasks.push(
                this.nodeService.getNode(
                  part['field_part_name'].und[0].target_id,
                ),
              );
              this.project.field_parts.und.push(
                part as FieldCollectionItemPart,
              );
            }
            index++;
          }
        }
        // field tags
        if (data.field_tags.und) {
          for (let i = 0; i < data.field_tags.und.length; i++) {
            const tag = x[index];
            this.FormPrintableValues.tags.push(tag['name']);
            index++;
          }
        }
        // field resources
        if (data.field_resources.und) {
          for (let i = 0; i < data.field_resources.und.length; i++) {
            const resource = x[index] as FieldCollectionItemResource;
            if (resource.field_label.und) {
              this.project.field_resources.und.push(resource);
              if (resource['field_resource_file'].und) {
                this.FormPrintableValues.resources_files.push(
                  resource['field_resource_file'].und[0],
                );
              }
            }
            index++;
          }
        }
        // field team
        if (data.field_maker_memberships.und) {
          for (let i = 0; i < data.field_maker_memberships.und.length; i++) {
            const member = x[index];
            if (member['field_team_member'].und) {
              subtasks.push(
                this.userService.getUser(
                  member['field_team_member'].und[0].target_id,
                ),
              );
            }
            this.project.field_maker_memberships.und.push(
              member as FieldCollectionItemMember,
            );
            index++;
          }
        } else {
          this.SetProjectOwner();
        }
      },
      err => {
        // console.log('Error: %s', err);
      },
      () => {
        const subsource = Observable.forkJoin(subtasks);
        subsource.subscribe(
          subx => {
            let subindex = 0;
            // field tools
            if (data.field_tools.und) {
              for (let i = 0; i < data.field_tools.und.length; i++) {
                const tool = subx[subindex];
                if (tool && tool['title']) {
                  const id = this.project.field_tools.und[i].field_tool_name
                    .und[0].target_id;
                  this.project.field_tools.und[
                    i
                  ].field_tool_name.und[0].target_id =
                    tool['title'] + ' (' + id + ')';
                  subindex++;
                }
              }
            }
            // field materials
            if (data.field_materials.und) {
              for (let i = 0; i < data.field_materials.und.length; i++) {
                const material = subx[subindex];
                if (material && material['title']) {
                  const id = this.project.field_materials.und[i]
                    .field_material_name.und[0].target_id;
                  this.project.field_materials.und[
                    i
                  ].field_material_name.und[0].target_id =
                    material['title'] + ' (' + id + ')';
                  subindex++;
                }
              }
            }
            // field parts
            if (data.field_parts.und) {
              for (let i = 0; i < data.field_parts.und.length; i++) {
                const part = subx[subindex];
                if (part && part['title']) {
                  const id = this.project.field_parts.und[i].field_part_name
                    .und[0].target_id;
                  this.project.field_parts.und[
                    i
                  ].field_part_name.und[0].target_id =
                    part['title'] + ' (' + id + ')';
                  subindex++;
                }
              }
            }
            // field team
            for (let i = 0; i < data.field_maker_memberships.und.length; i++) {
              const member = subx[subindex];
              if (member && member['name']) {
                this.project.field_maker_memberships.und.forEach(
                  (element, ind) => {
                    if (element.field_team_member.und) {
                      const id = this.project.field_maker_memberships.und[ind]
                        .field_team_member.und[0].target_id;
                      this.project.field_maker_memberships.und[
                        ind
                      ].field_team_member.und[0].target_id =
                        member['name'] + ' (' + id + ')';
                      subindex++;
                    }
                  },
                );
              }
            }
          },
          err => {
          },
          () => {
            if (this.project.field_cover_photo.und) {
              this.fileService
                .getFileById(
                  this.project.field_cover_photo.und[0].fid as number,
                )
                .subscribe((file: FileEntity) => {
                  file.file = NodeHelper.AddFileTypeToBase64(
                    file.file,
                    file.filemime,
                  );
                  this.FormPrintableValues.cover_image = file;
                  this.ProjectLoaded = true;
                });
            } else {
              this.ProjectLoaded = true;
            }
            this.ReInitEmptyFields();
          },
        );
      },
    );
  }

  ReInitEmptyFields() {
    const newproject: ProjectForm = new ProjectForm();
    for (const index in this.project) {
      if (!this.project[index] || NodeHelper.isEmpty(this.project[index])) {
        this.project[index] = newproject[index];
      }
    }
  }

  SetProjectOwner() {
    const owner: FieldCollectionItemMember = {
      field_team_member: {
        und: [
          {
            target_id:
              localStorage.getItem('user_name') +
              ' (' +
              localStorage.getItem('user_id') +
              ')',
          },
        ],
      },
      field_membership_role: { und: [{ value: 'Project Lead' }] },
    };
    this.project.setField('field_maker_memberships', owner);
    this.ProjectLoaded = true;
  }

  RemoveStaticFields() {
    delete this.project.field_original_team_members;
    delete this.project.field_forks;
    delete this.project.field_faire_name;
    this.project.setField('sticky', null);
    this.project.setField('promote', null);
  }

  /**
   * final function witch will post the project object to drupal after finishing all the functions to map the values
   */
  SaveProject() {
    this.ProjectLoaded = false;
    this.project.CheckIfReadyToPublic();
    delete this.project.field_creation_date.und[0].value.time;
    if (this.project.field_categories.und.length == 0) {
      this.project.field_categories.und = [''];
    }
    if (this.project.getField('nid')) {
      this.RemoveStaticFields();
      this.nodeService.updateNode(this.project).subscribe(
        (project: ProjectView) => {
          this.CanNavigate = true;
          this.FormPrintableValues.InvitationEmails.project = project
            .getField('nid')
            .toString();
          this.sendInvitedEmails(this.FormPrintableValues.InvitationEmails);
          if (this.project.field_visibility2.und[0] == 1115) {
            this.GetProject(+project.getField('nid'));
          }
          this.showSuccessMessage(
            'update',
            this.project.field_visibility2['und'][0],
          );
          this.project = new ProjectForm();
        },
        err => {
          // console.log(err);
          this.notificationBarService.create({
            message: 'Project not saved , check the logs please',
            type: NotificationType.Error,
          });
        },
      );
    } else {
      this.nodeService.createNode(this.project).subscribe(
        (project: ProjectView) => {
          this.CanNavigate = true;
          this.FormPrintableValues.InvitationEmails.project = project.nid.toString();
          if (
            !NodeHelper.isEmpty(this.FormPrintableValues.InvitationEmails.mails)
          ) {
            this.sendInvitedEmails(this.FormPrintableValues.InvitationEmails);
          }
          if (this.project.field_visibility2.und[0] == 1115) {
            this.GetProject(+project.nid);
          }
          this.showSuccessMessage(
            'create',
            this.project.field_visibility2['und'][0],
          );
          this.project = new ProjectForm();
        },
        err => {
          this.notificationBarService.create({
            message: 'Project not saved , check the logs please',
            type: NotificationType.Error,
          });
        },
      );
    }
  }

  sendInvitedEmails(emails) {
    this.mainService.custompost('team_service/send', emails).subscribe(
      data => {},
      err => {
        //  console.log(err);
      },
    );
  }

  /**
   * form update handler from all sub components
   * @param event : the value of the object from sub componet emitter
   */
  UpdateFields(event, component) {
    if (component === 'Your Story') {
      this.FormPrintableValues.tags = event;
    } else if (component === 'Team') {
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
    if (
      Visibility != 1115 &&
      !this.StoryFormValid &&
      this.project.field_visibility2['und'][0] == 1115
    ) {
      this.notificationBarService.create({
        message: "You're missing some required fields before you can publish.",
        type: NotificationType.Error,
      });
      this.TryToSubmitPrivatePublic = true;
      return;
    }
    this.project.setField('field_visibility2', Visibility);
    this.project.setField('status', Status);
    if (!this.project.getField('title')) {
      this.project.setField('title', 'Untitled');
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
    const tasks = [];
    this.project.setField(
      'field_tags',
      this.FormPrintableValues.tags.toString(),
    );
    const image = {
      file: this.FormPrintableValues.cover_image.file,
      filename: this.FormPrintableValues.cover_image.filename,
    };
    if (!this.FormPrintableValues.cover_image['fid']) {
      image.file = NodeHelper.RemoveFileTypeFromBase64(
        this.FormPrintableValues.cover_image.file,
      );
      if (image.file) {
        tasks.push(this.fileService.SendCreatedFile(image));
      }
    } else {
      this.project.field_cover_photo.und[0].fid = this.FormPrintableValues.cover_image[
        'fid'
      ];
    }
    if (this.FormPrintableValues.resources_files.length > 0) {
      this.FormPrintableValues.resources_files.forEach(
        (element: FileEntity, index: number) => {
          if (!element.fid) {
            element.file = NodeHelper.RemoveFileTypeFromBase64(element.file);
            tasks.push(this.fileService.SendCreatedFile(element));
          }
        },
      );
    }
    const source = Observable.forkJoin(tasks);
    source.subscribe(
      x => {
        let index = 0;
        if (!this.FormPrintableValues.cover_image['fid'] && image.file) {
          this.project.setField(
            'field_cover_photo',
            x[0] as FieldFileReference,
          );
          index++;
        }
        this.project.field_resources.und.forEach((item, resourcesindex) => {
          for (
            let i = 0;
            i < this.FormPrintableValues.resources_files.length;
            i++
          ) {
            if (
              !this.FormPrintableValues.resources_files[i].fid &&
              item.field_resource_file.und[0].filename ==
                this.FormPrintableValues.resources_files[i].filename
            ) {
              this.project.field_resources.und[
                resourcesindex
              ].field_resource_file.und[0] = x[index] as FieldFileReference;
              index++;
              return;
            }
          }
        });
      },
      err => {
      },
      () => {
        this.ResetFieldCollectionEmptyRows();
      },
    );
  }

  ResetFieldCollectionEmptyRows() {
    for (
      let i = this.project.field_maker_memberships.und.length - 1;
      i < 6;
      i++
    ) {
      this.project.field_maker_memberships.und.push(new FieldCollectionItemMember());
    }
    for (let i = this.project.field_tools.und.length - 1; i < 19; i++) {
      this.project.field_tools.und.push(new FieldCollectionItemTool());
    }
    for (let i = this.project.field_parts.und.length - 1; i < 19; i++) {
      this.project.field_parts.und.push(new FieldCollectionItemPart());
    }
    for (let i = this.project.field_materials.und.length - 1; i < 19; i++) {
      this.project.field_materials.und.push(new FieldCollectionItemMaterial());
    }
    for (let i = this.project.field_resources.und.length - 1; i < 19; i++) {
      this.project.field_resources.und.push(new FieldCollectionItemResource());
    }
    this.InviteTeam();
  }

  InviteTeam() {
    if (this.FormPrintableValues.InvitationEmails.mails.length !== 0) {
      this.mainService
        .custompost(
          'team_service/build',
          this.FormPrintableValues.InvitationEmails,
        )
        .subscribe(data => {
          for (const email in data) {
            const user = data[email];
            this.project.field_maker_memberships.und.forEach(
              (row: FieldCollectionItemMember, index: number) => {
                if (
                  row.field_team_member.und &&
                  row.field_team_member.und[0].target_id === email
                ) {
                  row.field_team_member.und[0].target_id =
                    user.name + ' (' + user.uid + ')';
                  return;
                }
              },
            );
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
    let tab: string = 'public';
    if (action == 'update') {
      if (visibility == 1115) {
        // updates as draft
        this.notificationBarService.create({
          message:
            'Your project is saved as a Draft. Publish to make it public.',
          type: NotificationType.Success,
          allowClose: true,
          autoHide: false,
          hideOnHover: false,
        });
        tab = 'draft';
      } else if (visibility == 371) {
        // save as private
        this.notificationBarService.create({
          message: 'Your project has been updated as private.',
          type: NotificationType.Success,
          allowClose: true,
          autoHide: false,
          hideOnHover: false,
        });
        tab = 'private';
      } else {
        // save is public
        this.notificationBarService.create({
          message: 'Your project has been updated.',
          type: NotificationType.Success,
          allowClose: true,
          autoHide: false,
          hideOnHover: false,
        });
        tab = 'public';
      }
    } else if (action == 'create') {
      if (visibility == 1115) {
        // updates as draft
        this.notificationBarService.create({
          message:
            'Your project is saved as a Draft. Publish to make it public.',
          type: NotificationType.Success,
          allowClose: true,
          autoHide: false,
          hideOnHover: false,
        });
        tab = 'draft';
      } else if (visibility == 371) {
        // save as private
        this.notificationBarService.create({
          message: 'Your project has been saved as private.',
          type: NotificationType.Success,
          allowClose: true,
          autoHide: false,
          hideOnHover: false,
        });
        tab = 'private';
      } else {
        // save is public
        this.notificationBarService.create({
          message: 'Your project has been created.',
          type: NotificationType.Success,
          allowClose: true,
          autoHide: false,
          hideOnHover: false,
        });
        if (this.missionRedirection.includes('/missions/enter-mission/')) {
          const navExtras: NavigationExtras = {
            queryParams: { projectId: 'newproject' },
          };
          this.router.navigate([this.missionRedirection], navExtras);
        }
        tab = 'public';
      }
    }
    // navigate to the portfolio with required tab
    const navigationExtras: NavigationExtras = {
      queryParams: { tab: tab },
    };
    const userID = +localStorage.getItem('user_id');
    if (visibility != 1115 && this.missionRedirection == 'undefined') {
      this.userService.getUrlFromId(userID).subscribe(res => {
        this.router.navigate(['/portfolio/' + res.url], navigationExtras);
      });
    }
  }
}
