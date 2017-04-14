import { Component, OnInit, ViewChild } from '@angular/core';
import { UserProfile } from "../../../../../../models/profile/userprofile";
import { ProfileSocial } from "../../../../../../models/profile/ProfileSocial";
import { ProfileService } from '../../../../../../d7services/profile/profile.service';
import { FileService } from '../../../../../../d7services/file/file.service';
import { NodeHelper } from '../../../../../../models';
import { Router } from '@angular/router';

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
  ) {}

  ngOnInit() {
    this.currentTab = "basic";
    this.BasicInfoSaved = false;
    this.CurrentTabValidation = false;

    this.uid = +localStorage.getItem('user_id');
    this.UpdateProfile();
  }

  UpdateProfile(){
    this.profileService.getUser(this.uid).subscribe((profile: UserProfile) => {
      this.userProfile = profile;
    });
  }

  saveNext(NewTab:string) {
    if(!this.CurrentTabValidation){
      //show error message for validation
      return;
    }
    if(this.BasicInfoSaved){
      this.SaveAndExit();
    }else{
      this.profileService.updateProfile(this.uid,this.userProfile).subscribe(user=>{
        this.userProfile = user;
        this.currentTab = NewTab;
        this.BasicInfoSaved = true;
        this.CurrentTabValidation = false;
      });
    }
  }

  SaveAndExit(){
    if(this.CoverImage){
      this.CoverImage.file = NodeHelper.RemoveFileTypeFromBase64(this.CoverImage.file);
      this.fileService.SendCreatedFile(this.CoverImage).subscribe(file=>{
        this.userProfile.user_photo = file.fid;
        this.profileService.updateProfile(this.uid,this.userProfile).subscribe(user=>{
          this.router.navigate(['/portfolio']);
        });
      });
    }else{
      this.profileService.updateProfile(this.uid,this.userProfile).subscribe(user=>{
        this.router.navigate(['/portfolio']);
      });
    }
  }
}
