export interface IProfileSocial {
  field_website_or_blog?: string;
  field_additional_site?: string;
  field_facebook?: string;
  field_instagram?: string;
  field_linkedin?: string;
  field_twitter?: string;
  field_pinterest?: string;
  field_youtube?: string;
  field_hackster_io?: string;
  field_instructables?: string;
  field_hackday?: string;
  field_preferred?: string;
  field_blog_title: string;
  field_website_title: string;
  field_thingyverse?: string;
  field_gitlabs?: string;
  field_twitch?: string;
  field_github?: string;
  field_stackoverflow?: string;
}

export class ProfileSocial implements IProfileSocial {
  field_additional_site = '';
  field_website_or_blog = '';
  field_facebook = '';
  field_instagram = '';
  field_linkedin = '';
  field_twitter = '';
  field_pinterest = '';
  field_youtube = '';
  field_hackster_io = '';
  field_instructables = '';
  field_hackday = '';
  field_preferred = '';
  field_blog_title = '';
  field_website_title = '';
  field_thingyverse = '';
  field_gitlabs = '';
  field_twitch = '';
  field_github = '';
  field_stackoverflow = '';

  constructor() {
  }

  public SetFieldValue(FieldName: string, Value: string) {
    this[FieldName] = Value;
  }
}
