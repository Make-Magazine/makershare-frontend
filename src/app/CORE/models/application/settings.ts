export interface ISettings {
  APIProtocol: string;
  APIHost: string;
  APIPort: number;
  APIEndPoint: string;
  solrPath: string;

  AppURL: string;
  AppName: string;
  LANGUAGE: string;

  GetBackEndUrl(): string;
  GetBackEndUrlWithEndpoint(): string;
}
