export interface Settings{
  appURL:string,
  domain:string,
  solrPath:string,
  endpoint:string,
  appName:string,
  LANGUAGE:string,
}

export class Settings implements Settings{
  appURL:string = 'http://localhost:4200';
  domain = 'http://localhost:333';
  solrPath = 'http://192.168.0.208:333/solr/drupal/';
  endpoint = '/api';
  appName = 'Maker Share';
  LANGUAGE = 'und';
}