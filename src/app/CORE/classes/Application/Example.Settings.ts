import { ISettings } from '../../models';

export class Settings implements ISettings{

  APIEndPoint = 'api';
  
  // // connect to stage
  // APIProtocol = 'https';
  // APIHost = 'preview-manage.makershare.com';
  // APIPort;

  // connect locally
  APIProtocol = 'http';
  APIHost = 'localhost';
  APIPort = 333;

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