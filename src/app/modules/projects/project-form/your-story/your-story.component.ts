import {
  animate,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  style,
  transition,
  trigger,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';
import { Ng2FileDropAcceptedFile } from 'ng2-file-drop';
import { CropperSettings } from 'ng2-img-cropper';
import { CustomValidators } from 'ng2-validation';
import { URLNoProtocol } from '../../../../angular/validations/url-no-protocol.validation';
import { UsaDate } from '../../../../angular/validations/usa-date.validation';
import { YoutubeOrVimeoLink } from '../../../../angular/validations/youtube-or-vimeo-link.validation';
import {
  FileEntity,
  NodeHelper,
  ProjectCategory,
  ProjectForm,
} from '../../../../core';
import { ViewService } from '../../../../core/d7services';

@Component({
  selector: 'app-project-form-your-story',
  templateUrl: './your-story.component.html',
  providers: [NgbTooltipConfig],
  animations: [
    trigger('SlideToRight', [
      transition(':enter', [
        style({
          transform: 'translateY(-100%)',
          'z-index': 0,
        }),
        animate(350),
      ]),
      transition(':leave', [
        animate(
          '0.2s ease',
          style({
            transform: 'translate(0px,-40px)',
            'z-index': -1,
            opacity: 0,
          }),
        ),
      ]),
    ]),
  ],
})
export class YourStoryComponent implements OnInit {
  /**
   * @output will emit the new values to the parent Component
   * this mainly used for tags object because its an string array so we cannot pass it as a reference
   */
  @Output() emitter = new EventEmitter();

  /**
   * @input to recieve the project object and printable values "tags and cover image"
   */
  @Input('project') project: ProjectForm;
  @Input('TryToSubmitPrivatePublic') TryToSubmitPrivatePublic: boolean;
  @Input('FormPrintableValues') FormPrintableValues;
  @Output() CanNavigate = new EventEmitter();
  @Output() StoryFormValid = new EventEmitter();
  cover_image: FileEntity;
  tags: string[];
  HtmlImg = new Image();

  /**
   * local variables to use only inside this component
   */
  YourStoryForm: FormGroup;
  accepted_image_width = 600;
  accepted_image_height = 600;
  project_categories_parents: ProjectCategory[] = [];
  project_categories_childs: ProjectCategory[] = [];
  current_parent_category: number;
  current_child_category: number;
  child_categories: ProjectCategory[] = [];
  all_categories: ProjectCategory[];
  currentPhotoModalTab: string;

  // image cropper
  cropperSettings: CropperSettings;
  imageData: any;
  sanitizethis;
  show_video;

  /**
   * an object to store the error messages for each field
   * this is usefull if we has multiple errors for each field
   */
  formErrors = {
    title: '',
    field_categories: '',
    field_cover_photo: '',
    field_show_tell_video: '',
    field_story: '',
    field_teaser: '',
    field_aha_moment: '',
    field_uh_oh_moment: '',
  };

  /**
   * the error messages to set in formerrors foreach field and also for each validator
   this way is good to save deffirent error messages for each validation
   */
  validationMessages = {
    title: {
      required: 'Project Name is required.',
      minlength: 'Project Name must be at least 4 characters long.',
      maxlength: 'Project Name maximum length is 50 characters.',
    },
    field_categories: {
      required: 'Topics is required.',
    },
    field_cover_photo: {
      required: 'Cover photo is required.',
      notvalidformat: 'Please choose an image file.',
      validimagesize: 'choose a photo that is at least 600 x 400 px.',
    },
    field_show_tell_video: {
      urlnoprotocol: 'Please enter a valid url, ex: http://example.com.',
      youtubeorvimeolink: 'Only Youtube and Vimeo are supported.',
    },
    field_story: {
      required: 'Story is required.',
    },
    field_teaser: {
      required: 'Teaser is required.',
      maxlength: 'Max number of characters is 250',
    },
    field_aha_moment: {
      maxlength: 'Max number of characters is 350',
    },
    field_uh_oh_moment: {
      maxlength: 'Max number of characters is 350',
    },
  };

  sidebarText = {
    projectName: {
      title: 'Project Name:',
      guide:
        'Think of a title that is both a little descriptive, and would catch your eye if you saw it on a website.',
    },
    teaser: {
      title: 'Teaser:',
      guide:
        'Teasers will introduce people, along with a Cover Photo, to this project. Try to clearly explain the whole project in a sentence or two.',
    },
    cover_image: {
      title: 'Cover Photo:',
      guide: `This image will represent the project anywhere it appears on the website. Try to articulate the project as clearly as possible. Images should be at least 600 by 400 pixels, and can be jpg, gif, or png.`,
    },
    category: {
      title: 'Topics:',
      guide:
        'Topics help organize projects on the site into categories. Using accurate categories will make it easier for others to find this project.',
    },
    story: {
      title: 'The Story:',
      guide: `Elaborate about the project. Some questions to think about: What does your project do? Why is it important to you? How did you get started? What was your process for working on it? What did you learn by making it? How do people react to your project? If the project didn't turn out the way you planned, what changed and why? Including video and photos of the project in different states of polish will help others visualize what's being referenced.`,
    },
    show_tell: {
      title: 'Show & Tell Video:',
      // 'guide': 'embed video:  ',
      // 'video': this.show_video
    },
    aha: {
      title: 'AHA! Moment:',
      guide: 'A moment of epiphany that really stands out to you.',
    },
    uh: {
      title: 'Uh-Oh! Moment:',
      guide:
        'Where there any moments that caught you off gaurd, or caused you to mutter about the unfairness of it all?',
    },
    tags: {
      title: 'Tags: ',
      guide:
        'Please add any tags you think would assist other Makers in finding this project.',
    },
  };
  TooltipText = {
    project_name: {
      guide: 'A catchy descriptive title',
    },
    teaser: {
      guide: 'Describe your project in a sentence or two.',
    },
    cover_image: {
      guide: 'Can support GIFs.',
    },
    category: {
      guide: 'This will help others find your project.',
    },
    story: {
      guide: 'Tell us about your project and how it came to be.',
    },
    show_tell: {
      guide: 'Add Video: Show & Tell',
    },
    aha_moment: {
      guide: 'Your biggest insight during the build.',
    },
    uh_oh_moment: {
      guide: 'Uh-oh! Moment',
    },
    tags: {
      guide:
        'Indicate types of tools, materials and skills you used on the build.',
    },
  };

  constructor(
    private fb: FormBuilder,
    private viewService: ViewService,
    private modalService: NgbModal,
    private config: NgbTooltipConfig,
  ) {
    this.SetCropperSettings();
    this.config.placement = 'right';
    this.config.triggers = 'hover';
  }

  dragFileAccepted(acceptedFile: Ng2FileDropAcceptedFile, cropper) {
    this.UploadBtn(acceptedFile.file, cropper);
  }

  SelectFileAndSave(closebtn: HTMLButtonElement, file: FileEntity) {
    this.imageData = {};
    this.currentPhotoModalTab = 'upload';
    closebtn.click();
    this.cover_image.file = file['url'];
    this.cover_image.fid = file['fid'];
  }

  /**
   * on loading the component we will assign the printable variables to the parent printable variables
   * also we will build our form
   * and getting base details as categories
   */
  ngOnInit() {
    this.currentPhotoModalTab = 'upload';
    this.cover_image = this.FormPrintableValues.cover_image;
    this.tags = this.FormPrintableValues.tags;
    this.buildForm();
    this.viewService
      .getView('projects_categories')
      .subscribe((categories: ProjectCategory[]) => {
        this.all_categories = categories;
        categories.forEach((element, index) => {
          if (element.parent_tid) {
            this.project_categories_childs.push(element);
          } else {
            this.project_categories_parents.push(element);
          }
        });
      });
    // this.meta.setTitle(`Create Project | Maker Share`);
    // this.meta.setTag('og:image', '/assets/logo.png');
    // this.meta.setTag('og:description', ' Create Project ');
    setTimeout(function() {
      //  $("html,body").animate({scrollTop: 0}, "slow");
    }, 0);
  }

  /**
   * when building the form we must assign the default value which is received from the parent and building the form with Validators
   * onValueChanged is used in two ways :
   * 1- for the hole form to check for validation error messages
   * 2- foreach control in the form to get the valid values only and save them to project object or emit them to the parent component
   */
  buildForm(): void {
    this.YourStoryForm = this.fb.group({
      title: [
        this.project.title,
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(50),
          CustomValidators.notEqual('Untitled'),
          CustomValidators.notEqual('untitled'),
        ],
      ],
      field_teaser: [
        this.project.field_teaser.und[0].value,
        [Validators.required, Validators.maxLength(250)],
      ],
      field_cover_photo: [this.cover_image, [Validators.required]],
      field_show_tell_video: [
        this.project.field_show_tell_video.und[0].value,
        [URLNoProtocol(), YoutubeOrVimeoLink()],
      ],
      field_show_tell_video_as_default: [
        this.project.field_show_tell_video_as_default.und &&
        this.project.field_show_tell_video_as_default.und[0].value == 1
          ? 1
          : null,
      ],
      field_aha_moment: [this.project.field_aha_moment.und[0].value, []],
      field_uh_oh_moment: [this.project.field_uh_oh_moment.und[0].value, []],
      field_story: [
        this.project.field_story.und[0].value,
        [Validators.required],
      ],
      field_tags: [this.tags],
      field_categories: [
        this.project.field_categories.und,
        [Validators.required],
      ],
      field_creation_date: [
        this.project.field_creation_date.und[0].value.date,
        [Validators.required, UsaDate()],
      ],
    });
    this.YourStoryForm.valueChanges.subscribe(data => {
      this.onValueChanged(data);
    });
    this.onValueChanged(this.YourStoryForm.value);
    for (const index in this.YourStoryForm.controls) {
      const control = this.YourStoryForm.controls[index];
      control.valueChanges.subscribe(value => {
        if (
          value != 0 &&
          value != 1 &&
          (NodeHelper.isEmpty(value) || !control.valid)
        ) {
          this.SetControlValue('', index);
        } else {
          this.SetControlValue(value, index);
        }
      });
    }
  }

  EmitValues() {
    this.StoryFormValid.emit(
      this.YourStoryForm['controls']['title'].valid &&
        this.YourStoryForm['controls']['field_teaser'].valid &&
        this.cover_image.file &&
        this.project.field_categories.und.length > 0 &&
        this.YourStoryForm['controls']['field_story'].valid,
    );

    if (this.YourStoryForm.dirty && this.YourStoryForm.touched) {
      this.CanNavigate.emit(false);
    }

    this.emitter.emit(this.tags);
  }

  /**
   * setting control values
   * this function will set the value to the project property
   * @param value : the value to be setted in the project property
   * @param index : the field name of the property
   */
  SetControlValue(value: any, index: string) {
    const field = this.project[index];
    if (typeof field === 'string') {
      this.project[index] = value;
    } else if (field.und[0] && typeof field.und[0] === 'object') {
      if (index == 'field_creation_date') {
        this.project[index].und[0]['value'].date = value;
      } else {
        this.project[index].und[0].value = value;
      }
    } else if (index != 'field_tags') {
      value
        ? (this.project[index].und = value)
        : (this.project[index].und = []);
    }
  }

  /**
   * this function will watch for the new changes in cover_image field and set the values after converting the file to base64
   * its better if we used custom validator so we can remove the error check here "need works"
   * @param event the selected file object
   */
  ImageUpdated(closebtn: HTMLButtonElement) {
    closebtn.click();
    delete this.cover_image.fid;
    this.cover_image.file = '';
    this.formErrors.field_cover_photo = '';
    if (!NodeHelper.isEmpty(this.imageData)) {
      this.cover_image.file = this.imageData.image;
      this.imageData = {};
      this.EmitValues();
    }
    if (!this.cover_image.file && !this.formErrors.field_cover_photo) {
      this.formErrors.field_cover_photo = this.validationMessages.field_cover_photo.notvalidformat;
    }
  }

  /**
   * a function to check the validation for each control and set the error messages to formerrors from messages array
   * @param data : the data to be checked but its not required in our case
   * this data will be helpfull if we need to make any change to the value before setting the error
   */
  onValueChanged(data?: any) {
    this.EmitValues();
    if (!this.YourStoryForm) {
      return;
    }
    const form = this.YourStoryForm;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  RemoveCategory(CategoryId: number, CategoryParentId: number): void {
    this.project.field_categories.und.splice(
      this.project.field_categories.und.indexOf(CategoryId),
      1,
    );
    let flag = false;
    this.project.field_categories.und.forEach((category, index) => {
      const catIndex = this.all_categories
        .map(element => element.tid)
        .indexOf(category);
      if (this.all_categories[catIndex].parent_tid == CategoryParentId) {
        flag = true;
        return;
      }
    });
    if (!flag) {
      this.project.field_categories.und.splice(
        this.project.field_categories.und.indexOf(CategoryParentId),
        1,
      );
    }
    this.EmitValues();
  }

  /**
   * handling selection of categories
   * @param tid : selected term id
   * @param mode : parent or child selection
   */
  SelectTerm(tid: number, mode: string) {
    if (mode == 'parent') {
      this.child_categories = [];
      this.current_parent_category = tid;
      this.project_categories_childs.forEach((element, index) => {
        if (
          element.parent_tid == this.current_parent_category &&
          this.project.field_categories.und.indexOf(element.tid) == -1
        ) {
          this.child_categories.push(element);
        }
      });
    } else {
      this.current_child_category = tid;
    }
  }

  /**
   * pushing the selected categories to project categories field and check for dublication
   */
  SetCategories(ParentCategoryElement: HTMLSelectElement) {
    ParentCategoryElement.value = '_none_';
    if (
      this.project.field_categories.und.indexOf(this.current_parent_category) ==
      -1
    ) {
      this.project.field_categories.und.push(this.current_parent_category);
    }
    if (
      this.project.field_categories.und.indexOf(this.current_child_category) ==
      -1
    ) {
      this.project.field_categories.und.push(this.current_child_category);
    }
    this.YourStoryForm.controls['field_categories'].patchValue(
      this.project.field_categories.und,
    );
    delete this.current_parent_category;
    delete this.current_child_category;
  }

  SetCropperSettings(): void {
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.width = 800;
    this.cropperSettings.height = 450;
    this.cropperSettings.minWidth = 800;
    this.cropperSettings.minHeight = 450;
    this.cropperSettings.croppedWidth = 800;
    this.cropperSettings.croppedHeight = 450;
    this.cropperSettings.noFileInput = true;
    this.cropperSettings.canvasWidth = 400;
    this.cropperSettings.canvasHeight = 225;
    this.imageData = {};
  }

  openImageModal(Template) {
    this.modalService.open(Template);
  }

  UploadBtn(file, cropper) {
    if (!file) {
      return;
    }
    const image: any = new Image();
    this.cover_image.filename = file.name;
    const myReader: FileReader = new FileReader();
    myReader.onloadend = function(loadEvent: any) {
      image.src = loadEvent.target.result;
      cropper.setImage(image);
    };
    myReader.readAsDataURL(file);
  }
}
