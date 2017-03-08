export interface IChallengeData{

title: string;
cover_image:string;
sponsored_by:string;
challenge_start_date: {
value: string;
timezone: string;
timezone_db: string;
date_type: string;
},
challenge_end_date: {
value: string;
timezone: string;
timezone_db: string;
date_type: string;
},
winners_announcement_date: {
value: string;
timezone: string;
timezone_db: string;
date_type: string;
},
public_voting: number;
body: string;
rules:string;
display_entries: number;
nid: number;

}