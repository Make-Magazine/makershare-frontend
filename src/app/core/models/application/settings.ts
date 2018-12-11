export class Settings {

 apiEndPoint: string = 'api';

 // // connect to stage
 apiProtocol: 'http'|'https' = 'https';

 // Switch based on which site you are compiling

 // Preview settings
 // apiHost: string = 'preview-manage.makershare.com';
 // appURL: string = 'https://preview.makershare.com';
 // solrPath: string = 'https://preview-manage.makershare.com/solr/stage/';

 // PROD settings
 apiHost: string = 'manage.makershare.com';
 appURL: string = 'https://makershare.com';
 solrPath: string = 'https://manage.makershare.com/solr/makershare/';

 apiPort: number;

 // appURL: string = 'http://localhost:4200';
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