export interface IMissionDate {
  value: string;
  timezone?: string;
  timezone_db?: string;
  date_type?: string;
}

export interface IMissionData {
  title: string;
  cover_image: string;
  sponsor_bar?: string;
  sponsored_by: string;
  public_voting: number;
  body: string;
  rules: string;
  opened: boolean;
  diffDays: number;
  display_entries: number;
  nid: number;
  path: string;
  status_id: number;
  summary_trim: string;
  status?: string;
  summary?: string;
  nbProjects?: number;
  nbFollowers?: number;
  challengeDate?: number;
  challenge_start_date?: IMissionDate;
  challenge_end_date?: IMissionDate;
  winners_announcement_date?: IMissionDate;
}

export class MissionData {
  title = '';
  cover_image = '';
  sponsor_bar = '';
  sponsored_by = '';
  public_voting = 0;
  body = '';
  rules = '';
  diffDays = 0;
  opened = false;
  display_entries = 0;
  nid = 0;
  path = '';
  status_id = 0;
  summary_trim = '';
  nbProjects = 0;
  nbFollowers = 0;
  challengeDate = 0;
  challenge_start_date = {
    value: '',
    timezone: '',
    timezone_db: '',
    date_type: '',
  };
  challenge_end_date = {
    value: '',
    timezone: '',
    timezone_db: '',
    date_type: '',
  };
  winners_announcement_date = {
    value: '',
    timezone: '',
    timezone_db: '',
    date_type: '',
  };
}
