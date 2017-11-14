import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NotificationBarService, NotificationType } from 'ngx-notification-bar/release';
import { Observable } from 'rxjs/Observable';
import {
  DateTime,
  FieldDateTime,
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
  class ProjectFormComponent implements OnInit, OnDestroy, ComponentCanDeactivate {
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

  missionNid: number;
  missionMessageShowed: boolean = false;
  missionConfirmed: boolean = false;
  isSaving: boolean = false;
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

  // Whether or not we are in edit mode
  editMode: boolean = false;
  projectId: number;

  /**
   * the project object with empty values which will be transferred to the sub components to set the values inside it before posting them
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

  canDeactivate(): Observable<boolean> | boolean {
    // insert logic to check if there are pending changes here;
    // returning true will navigate without confirmation
    // returning false will show a confirm alert before navigating away
    return this.CanNavigate;
  }

  /**
   * ngOnInit
   */
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

      // Edit mode
      if (nid) {
        this.projectId = nid;
        this.editMode = true;
        this.getProject(nid);
      } else {
        // Or creation mode
        this.setProjectOwner();
      }

      this.current_active_tab = 'Your Story';
      this.route.queryParams.subscribe(params => {
        // getting mession id from params
        this.missionNid = params['nid'];
      });
    });
  }

  /**
   * ngOnDestroy
   */
  ngOnDestroy() {
    // Destroy project on destroy
    this.project = null;
  }

  /**
   * updateHolder
   */
  updateHolder() {
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

  /**
   * getProject
   *
   * @param {number} nid
   * @constructor
   */
  getProject(nid: number) {
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
                this.isSaving = false;
                this.Holder = node;
                this.convertProjectToCreateForm(project);
              });
            } else {
              projectHold.setField('nid', hold[0].nid);
              delete projectHold.field_project_to_edit;
              this.nodeService.updateNode(projectHold).subscribe(node => {
                this.isSaving = false;
                this.Holder = hold[0];
                this.convertProjectToCreateForm(project);
              });
            }
            this.updateHolder();
          } else {
            swal(
              {
                title: 'Wait!',
                text:
                hold[0].name +
                ' is currently editing this project. Only one editor can make changes at a time, Do you want to be notified when he finishes?',
                icon: 'warning',
                buttons: {
                  cancel: {
                    text: "Cancel",
                    value: null,
                    visible: true,
                    className: "",
                    closeModal: true,
                  },
                  confirm: {
                    text: "Yes, notify me!",
                    value: true,
                    visible: true,
                    className: "",
                    closeModal: true
                  }
                },
              }
            ).then((value) => {
              if (value) {
                const holder = {
                  nid: hold[0].nid,
                  uid: localStorage.getItem('user_id'),
                };
                this.mainService.custompost('maker_project_api/hold_queue', holder).subscribe(data => {
                  this.notificationBarService.create({
                    message: 'Successfully added to notify list',
                    type: NotificationType.Success,
                  });
                  this.router.navigate(['/portfolio']);
                });
              } else {
                this.router.navigate(['/portfolio']);
              }
            });
            return;
          }
        });
    });
  }

  /**
   * convertProjectToCreateForm
   *
   * @param {ProjectView} data
   */
  convertProjectToCreateForm(data: ProjectView) {
    this.project = new ProjectForm();
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
        const created = new Date(+data.created * 1000);
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

        const datetime = new DateTime();

        datetime.date = month + '/' + day + '/' + year;
        datetime.time = hours + ':' + minutes + ':00';

        this.project.field_creation_date = { und: [new FieldDateTime(datetime)] };
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
          this.setProjectOwner();
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
                      if (parseInt(id, null)) {
                        this.project.field_maker_memberships.und[
                          ind
                        ].field_team_member.und[0].target_id =
                          member['name'] + ' (' + id + ')';
                      } else {
                        this.project.field_maker_memberships.und[
                          ind
                        ].field_team_member.und[0].target_id = id;
                      }
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
                  this.reInitEmptyFields();
                });
            } else {
              this.reInitEmptyFields();
            }
          },
        );
      },
    );
  }

  /**
   * reInitEmptyFields
   */
  reInitEmptyFields() {
    const newproject: ProjectForm = new ProjectForm();
    for (const index in this.project) {
      if (!this.project[index] || NodeHelper.isEmpty(this.project[index])) {
        this.project[index] = newproject[index];
      }
    }

    this.ProjectLoaded = true;
  }

  /**
   * setProjectOwner
   */
  setProjectOwner() {
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

  /**
   * removeStaticFields
   */
  removeStaticFields() {
    delete this.project.field_original_team_members;
    delete this.project.field_forks;
    delete this.project.field_faire_name;
    this.project.setField('sticky', null);
    this.project.setField('promote', null);
  }

  /**
   * saveProject
   *
   * final function witch will post the project object to drupal after finishing all the functions to map the values
   */
  saveProject() {
    this.ProjectLoaded = false;
    this.project.CheckIfReadyToPublic();
    this.project.field_creation_date.und[0].value.date += ' - ' + this.project.field_creation_date.und[0].value.time;
    // delete this.project.field_creation_date.und[0].value.time;
    if (this.project.field_categories.und.length == 0) {
      this.project.field_categories.und = [''];
    }

    // If project id exists, we are in edit mode
    if (this.editMode && this.projectId) {
      this.removeStaticFields();
      this.nodeService.updateNode(this.project).subscribe(
        (project: ProjectView) => {
          this.CanNavigate = true;
          this.FormPrintableValues.InvitationEmails.project = `${this.projectId}`;
          this.sendInvitedEmails(this.FormPrintableValues.InvitationEmails);

          // If draft, reload project (I guess ?)
          if (this.project.field_visibility2.und[0] == 1115) {
            this.getProject(project.nid);
          }
          if (this.missionConfirmed) {
            const body = {
              type: 'challenge_entry',
              field_entry_project: project.nid,
              field_entry_challenge: this.missionNid,
            };
            this.mainService.custompost('maker_challenge_entry_api', body).subscribe(data => {
              this.showSuccessMessage(
                'create',
                this.project.field_visibility2['und'][0],
              );
            }, err => {
              this.notificationBarService.create({
                message: "Your project has been saved, but it doesn't meet the mission requirements",
                type: NotificationType.Warning,
              });
              this.projectId = +project.nid;
              this.editMode = true;
              this.getProject(+project.nid);
            });
          } else {
            this.showSuccessMessage(
              'create',
              this.project.field_visibility2['und'][0],
            );
          }
        },
        err => {
          this.notificationBarService.create({
            message: 'Project not saved, check the logs please',
            type: NotificationType.Error,
          });
        },
      );
    } else {
      this.nodeService.createNode(this.project).subscribe(
        (project: ProjectView) => {
          this.CanNavigate = true;
          this.FormPrintableValues.InvitationEmails.project = project.nid.toString();
          if (!NodeHelper.isEmpty(this.FormPrintableValues.InvitationEmails.mails)) {
            this.sendInvitedEmails(this.FormPrintableValues.InvitationEmails);
          }
          // If draft, reload project ?
          if (this.project.field_visibility2.und[0] == 1115) {
            this.projectId = +project.nid;
            this.editMode = true;
            this.getProject(+project.nid);
          }
          if (this.missionConfirmed) {
            const body = {
              type: 'challenge_entry',
              field_entry_project: project.nid,
              field_entry_challenge: this.missionNid,
            };
            this.mainService.custompost('maker_challenge_entry_api', body).subscribe(data => {
              this.showSuccessMessage(
                'create',
                this.project.field_visibility2['und'][0],
              );
            }, err => {
              this.notificationBarService.create({
                message: "Your project has been saved, but it doesn't meet the mission requirements",
                type: NotificationType.Warning,
              });
              this.projectId = +project.nid;
              this.editMode = true;
              this.getProject(+project.nid);
            });
          } else {
            this.showSuccessMessage(
              'create',
              this.project.field_visibility2['und'][0],
            );
          }
        },
        err => {
          this.notificationBarService.create({
            message: 'Project not saved, check the logs please',
            type: NotificationType.Error,
          });
        },
      );
    }
  }

  /**
   * sendInvitedEmails
   *
   * @param emails
   */
  sendInvitedEmails(emails) {
    this.mainService.custompost('team_service/send', emails).subscribe(
      data => { },
      err => {
        //  console.log(err);
      },
    );
  }

  /**
   * updateFields
   *
   * form update handler from all sub components
   *
   * @param event : the value of the object from sub componet emitter
   * @param component
   */
  updateFields(event, component) {
    if (component === 'Your Story') {
      this.FormPrintableValues.tags = event;
    } else if (component === 'Team') {
      this.FormPrintableValues.InvitationEmails = event;
    } else {
      this.FormPrintableValues.resources_files = event;
    }
  }

  /**
   * gettingFieldsReady
   *
   * form saving function for all types of the project
   *
   * @param {number} Status : the status of the project dependent on visibility type
   * @param {number} visibility : the field value witch has 3 types "public ,private and draft"
   */
  gettingFieldsReady(status: number, visibility: number) {
    if (this.isSaving) {
      return;
    }
    // if the user pressed public and he is coming from mession enter page
    if (!this.missionMessageShowed && (visibility == 370 && this.missionNid && this.StoryFormValid)) {
      this.showMessionConfirmationMessage();
      return;
    }
    this.isSaving = true;
    this.current_active_tab = 'Your Story';
    const saveAsDraft: boolean = visibility === 1115;

    // If 'private' or 'public', check  required fields
    if (
      visibility != 1115 &&
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
    this.project.setField('field_visibility2', visibility);
    this.project.setField('status', status);

    // if not project title, set to 'untitled'
    if (saveAsDraft && !this.project.title) {
      this.project.setField('title', 'Untitled');
    }
    if (this.project.field_show_tell_video_as_default.und) {
      if (this.project.field_show_tell_video_as_default.und[0].value == 0) {
        delete this.project.field_show_tell_video_as_default.und;
      }
    }
    this.setProjectValues();
  }

  /**
   * setProjectValues
   *
   * function to migrate and map the values from the forms to the project object
   * for example you must upload the file image then reference the project cover_image field to this fid
   */
  setProjectValues() {
    const tasks = [];

    // Field tags
    this.project.setField(
      'field_tags',
      this.FormPrintableValues.tags.toString(),
    );

    // Cover Image
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
        this.resetFieldCollectionEmptyRows();
      },
    );
  }

  /**
   * resetFieldCollectionEmptyRows
   */
  resetFieldCollectionEmptyRows() {
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
    this.inviteTeam();
  }

  /**
   * inviteTeam
   */
  inviteTeam() {
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
          this.saveProject();
        });
    } else {
      this.saveProject();
    }
  }

  /**
   * showSuccessMessage
   *
   * Shows a success message as notification
   *
   * @param {string} action : the action (save/update)
   * @param {number} visibility : the tid of the visibility status
   */
  showSuccessMessage(action: string, visibility: number) {
    let state: string = 'public';
    const actionVerb: string = `${action}d`;
    let notificationMessage: string = '';

    switch (visibility) {
      case 1115:
      default:
        notificationMessage = `Your project has been ${actionVerb} as a Draft. Publish to make it public.`;
        state = 'draft';
        break;
      case 371:
        notificationMessage = `Your project has been ${actionVerb} as private.`;
        state = 'private';
        break;
      case 370:
        if (this.missionNid) {
          if (this.missionConfirmed) {
            notificationMessage = `Your project has been entered. Thank you for participating!.`;
          } else {
            notificationMessage = `Your project is published but not entered into the mission. You can enter it later.`;
          }
        } else {
          notificationMessage = `Your project has been ${actionVerb}.`;
        }
        break;
    }

    this.notificationBarService.create({
      message: notificationMessage,
      type: NotificationType.Success,
      allowClose: true,
      autoHide: false,
      hideOnHover: false,
    });
    // Navigate to portfolio if not draft
    if (state !== 'draft') {
      const userID = +localStorage.getItem('user_id');
      if (this.missionConfirmed) {
        this.nodeService.getUrlFromId(this.missionNid, 'challenge').subscribe(res => {
          this.router.navigate(['/missions/' + res[0]]);
        });
      } else {
        this.userService.getUrlFromId(userID).subscribe(res => {
          this.router.navigate(['/portfolio/' + res.url], <NavigationExtras>{
            queryParams: { tab: state },
          });
        });
      }
    }
  }

  showMessionConfirmationMessage() {
    this.missionMessageShowed = true;
    swal(
      {
        title: 'Please Confirm',
        text: 'Do you still want to enter this project into the mission?',
        icon: 'success',
        buttons: {
          cancel: {
            text: "No",
            value: null,
            visible: true,
            className: "",
            closeModal: true,
          },
          confirm: {
            text: "Yes",
            value: true,
            visible: true,
            className: "",
            closeModal: true
          }
        },
      }).then((confirm) => {
        if (confirm) {
          this.missionConfirmed = true;
        }
        this.gettingFieldsReady(0, 370);
      });
  }
}
