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
  Language: string = 'und';

  GetBackEndUrl(): string {
    const url = this.apiProtocol + '://' + this.apiHost;
    return this.apiPort ? url + ':' + this.apiPort + '/' : url + '/';
  }

  GetBackEndUrlWithEndpoint(): string {
    return this.GetBackEndUrl() + this.apiEndPoint + '/';
  }

}
