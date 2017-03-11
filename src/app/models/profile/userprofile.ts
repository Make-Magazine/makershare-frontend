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
total_likes?: number
}