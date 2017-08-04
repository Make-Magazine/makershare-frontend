import { IAddress } from 'app/CORE/models/profile/address';
import { IInterests } from 'app/CORE/models/profile/interests';
import { MakerSpace } from 'app/CORE/models/profile/makerspace';
import { IProfileSocial } from 'app/CORE/models/profile/profile-social';

export interface UserProfile {
  name?: string;
  mail?: string;
  created?: number;
  timezone?: string;
  roles?: number[];
  uid?: number;
  changed?: number;
  bio?: string;
  bioShort?: string;
  field_add_your_makerspace_s_?: MakerSpace[];
  first_name?: string;
  last_name?: string;
  describe_yourself?: string;
  started_making?: string;
  started_making_short?: string;
  field_social_accounts?: IProfileSocial; // should covert from array to object
  nickname?: string;
  address?: IAddress;
  address_publish?: number;
  maker_interests?: IInterests[]; // should replace in the back-end to be an array
  display_projects_likes?: number;
  display_project_forks?: number;
  user_photo?: string;
  profile_cover?: string;
  profile_completion?: number;
  total_projects?: number;
  total_likes?: number;
  views_count?: number;
  pass?: string;
  status?: string;
}
