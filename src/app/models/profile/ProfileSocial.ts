export interface ProfileSocial {
  field_website_or_blog?: string,
  field_additional_site?: string,
  field_facebook?: string,
  field_instagram?: string,
  field_linkedin?: string,
  field_twitter?: string,
  field_pinterest?: string,
  field_youtube?: string,
  field_hackster_io?: string,
  field_instructables?: string,
  field_hackday?: string,
  field_preferred?: string,
  field_blog_title:string,
  field_website_title:string,
  field_thingyverse?: string,
  field_gitlabs?: string,
  field_twitch?: string,
  field_github?: string,
  field_stackoverflow?: string,
} 

export class ProfileSocial implements ProfileSocial{
  constructor(){
    this.field_additional_site = '';
    this.field_website_or_blog = '';
    this.field_facebook = '';
    this.field_instagram = '';
    this.field_linkedin = '';
    this.field_twitter = '';
    this.field_pinterest = '';
    this.field_youtube = '';
    this.field_hackster_io = '';
    this.field_instructables = '';
    this.field_hackday = '';
    this.field_preferred = '';
    this.field_blog_title = '';
    this.field_website_title = '';
    this.field_thingyverse = '';
    this.field_gitlabs = '';
    this.field_twitch = '';
    this.field_github = '';
    this.field_stackoverflow ='';
  }

  public SetFieldValue(FieldName:string,Value:string){
    this[FieldName] = Value;
  }
}