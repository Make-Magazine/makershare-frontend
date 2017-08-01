import { ISettings } from '../../Models';

export class Settings implements ISettings{
  appURL:string = 'http://localhost:4200';
  domain = 'http://localhost:333';
  solrPath = 'http://192.168.0.208:333/solr/drupal/';
  endpoint = '/api';
  appName = 'Maker Share';
  LANGUAGE = 'und';
}