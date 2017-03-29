export interface IChallengeData{
title: string;
cover_image:string;
sponsored_by:string;
public_voting: number;
body: string;
rules:string;
opened:boolean;
diffDays:number;
display_entries: number;
nid: number;
challenge_start_date?:IChallengeStartDate;
challenge_end_date?: IChallengeEndDate;
winners_announcement_date?: IChallengeAnnouncementData;
}

export interface IChallengeStartDate{
value: string;
timezone: string;
timezone_db: string;
date_type: string;
}

export interface IChallengeEndDate{
value: string;
timezone: string;
timezone_db: string;
date_type: string;
}

export interface IChallengeAnnouncementData{
value: string;
timezone: string;
timezone_db: string;
date_type: string;
}