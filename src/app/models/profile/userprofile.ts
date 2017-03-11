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
field_bio?: string,
field_add_your_makerspace_s_?:MakerSpace[];
// field_add_your_makerspace_s_: [
// {
// field_makerspace_name: {
// target_id: "33",
// title: "Maker space one"
// },
// field_makerspace_url: {
// url: "http://google.com"
// }
// },
// {
// field_makerspace_name: {
// target_id: "34",
// title: "Maker space two"
// },
// field_makerspace_url: {
// url: "google.com"
// }
// },
// {
// field_makerspace_name: {
// target_id: "78",
// title: "maker 3"
// },
// field_makerspace_url: {
// url: "www.maker3.com"
// }
// }
// ],// should fix the format of this field from the back-end
field_first_name?: string,
field_last_name?: string,
field_describe_yourself?: string,
field_started_making?: string,
field_social_accounts?: ProfileSocial, // should covert from array to object
field_nickname?: string,
field_contact_email?: string,
field_address?: Address,
field_address_publish?: number,
field_maker_interests?: Intrests[], // should replace in the back-end to be an array
field_display_projects_likes?: number,
field_display_project_forks?: number,
field_user_photo?: string,
field_profile_cover?: string,
profile_completion?: number,
total_projects?: number,
total_likes?: number
}