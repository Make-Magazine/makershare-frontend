export class Settings {

  apiEndPoint: string = 'api';

  // // connect to stage
  // apiProtocol: 'http'|'https' = 'https';
  // apiHost: string = 'preview-manage.makershare.com';
  // apiPort: number;

  // connect locally
  apiProtocol: 'http'|'https' = 'http';
  apiHost: string = 'localhost';
  apiPort: number = 333;

  solrPath: string = 'http://192.168.0.208:333/solr/drupal/';
  appURL: string = 'http://localhost:4200';
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
