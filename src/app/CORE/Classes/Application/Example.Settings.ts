import { ISettings } from '../../Models';

export class Settings implements ISettings{
  APIProtocol = 'http';
  // APIProtocol = 'https';
  APIHost = 'localhost';
  // APIHost = 'preview-manage.makershare.com';
  APIPort=333;

  APIEndPoint = 'api';
  
  solrPath = 'http://192.168.0.208:333/solr/drupal/';

  AppURL = 'http://localhost:4200';
  AppName = 'Maker Share';
  LANGUAGE = 'und';

  GetBackEndUrl():string {
    const url = this.APIProtocol+'://'+this.APIHost;
    return this.APIPort? url+':'+this.APIPort+'/' : url+'/' ;
  }

  GetBackEndUrlWithEndpoint():string{
    return this.GetBackEndUrl()+this.APIEndPoint+'/';
  }

}