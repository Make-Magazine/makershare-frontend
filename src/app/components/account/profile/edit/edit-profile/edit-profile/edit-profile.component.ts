import { Component, OnInit, ViewChild } from '@angular/core';
import { UserProfile } from "../../../../../../models/profile/userprofile";
import { ProfileSocial } from "../../../../../../models/profile/ProfileSocial";
import { ProfileService } from '../../../../../../d7services/profile/profile.service';
import { FileService } from '../../../../../../d7services/file/file.service';
import { NodeHelper } from '../../../../../../models';
import { Router } from '@angular/router';
import { NotificationBarService, NotificationType } from 'angular2-notification-bar/release';
import { LoaderService } from '../../../../../shared/loader/loader.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
})
export class EditProfileComponent implements OnInit {
  currentTab:string;
  userProfile: UserProfile;
  uid:number;
  BasicInfoSaved;
  CurrentTabValidation:boolean;
  CoverImage;

  constructor(
    private profileService: ProfileService,
    private fileService: FileService,
    private router: Router,
    private notificationBarService: NotificationBarService,
    private loaderService: LoaderService,
  ) {}

  ngOnInit() {
    this.loaderService.display(true);
    this.currentTab = "basic";
    this.BasicInfoSaved = false;
    this.CurrentTabValidation = false;

    this.uid = +localStorage.getItem('user_id');
    this.UpdateProfile();
  }

  UpdateProfile(NewTab?){
    this.profileService.getUser(this.uid).subscribe((profile: UserProfile) => {
      this.userProfile = profile;
      if(NewTab){
        this.currentTab = NewTab;
        this.BasicInfoSaved = true;
        this.CurrentTabValidation = false;
      }
      this.loaderService.display(false);
    }, err => {
      this.loaderService.display(false);
    });
  }
  EmmitHandler(event){
    if(event){
      this.CurrentTabValidation = true;
      this.userProfile = event;
    }
  }
  saveNext(NewTab:string) {
    if(!this.CurrentTabValidation){
      //show error message for validation
      this.notificationBarService.create({ message: '*There are some required fields need to be filled', type: NotificationType.Error});
      return;
    }
    if(this.BasicInfoSaved){
      this.SaveAndExit();
    }else{
      if(this.CoverImage){
        let image ={
          file:NodeHelper.RemoveFileTypeFromBase64(this.CoverImage.file),
          filename:this.CoverImage.filename,
        }
        this.fileService.SendCreatedFile(image).subscribe(file=>{
          this.userProfile.user_photo = file.fid;
          this.profileService.updateProfile(this.uid,this.userProfile).subscribe(user=>{
            this.UpdateProfile(NewTab);
          });
        });
      }else{
        this.profileService.updateProfile(this.uid,this.userProfile).subscribe(user=>{
          this.UpdateProfile(NewTab);
        });
      }
    }
  }

  SaveAndExit(){
    this.userProfile.uid = this.uid;
    this.profileService.updateProfile(this.uid,this.userProfile).subscribe(user=>{
      this.router.navigate(['/portfolio']);
    },err=>console.log(err));
  }
}
