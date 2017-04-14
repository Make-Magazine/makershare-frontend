import { Address } from './address';
import { ProfileSocial } from './ProfileSocial';
import { Intrests } from './intrests';
import { MakerSpace } from './makerspace';

export interface UserProfile {
  name?: string,
  mail?: string,
  created?: number,
  timezone?: string,
  roles?:number [],
  uid?: number,
  changed?: number,
  bio?: string,
  field_add_your_makerspace_s_?:MakerSpace[];
  first_name?: string,
  last_name?: string,
  describe_yourself?: string,
  started_making?: string,
  field_social_accounts?: ProfileSocial, // should covert from array to object
  nickname?: string,
  contact_email?: string,
  address?: Address,
  address_publish?: number,
  maker_interests?: Intrests[], // should replace in the back-end to be an array
  display_projects_likes?: number,
  display_project_forks?: number,
  user_photo?: string,
  profile_cover?: string,
  profile_completion?: number,
  total_projects?: number,
  total_likes?: number,
  pass?:string,
  newsletter_subscription?:number,
}

export class UserProfile implements UserProfile {
  constructor(){
    this.name =  '';
    this.user_photo = '';
    this.bio = '';
    this.started_making = '';
    this.field_social_accounts = new ProfileSocial();
    this.address = '';
  }
}