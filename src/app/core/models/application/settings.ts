export class Settings {

 apiEndPoint: string = 'api';

 // // connect to stage
 apiProtocol: 'http'|'https' = 'https';

 // Switch based on which site you are compiling
 
 // LOCAL settings
 // apiHost: string = 'preview-manage.makershare.com';
 // appURL: string = 'http://localhost:4200';
 // callbackURL: string = 'http://localhost:4200/authenticate-redirect';
 // solrPath: string = 'https://preview-manage.makershare.com/solr/stage/';

 // Preview settings
 // apiHost: string = 'preview-manage.makershare.com';
 // appURL: string = 'https://preview.makershare.com';
 // callbackURL: string = 'https://preview.makershare.com/authenticate-redirect';
 // solrPath: string = 'https://preview-manage.makershare.com/solr/stage/';

 // PROD settings
 apiHost: string = 'manage.makershare.com';
 appURL: string = 'https://makershare.com';
 callbackURL: string = 'https://makershare.com/authenticate-redirect';
 solrPath: string = 'https://manage.makershare.com/solr/makershare/';


 apiPort: number;

 appName: string = 'Maker Share';
 language: string = 'und';

 orgCreated: boolean = false;
 orgDeleted: boolean = false;


 getBackEndUrl(): string {
   const url = this.apiProtocol + '://' + this.apiHost;
   return this.apiPort ? url + ':' + this.apiPort + '/' : url + '/';
 }

 getBackEndUrlWithEndPoint(): string {
   return this.getBackEndUrl() + this.apiEndPoint + '/';
 }

}