export interface ISettings {
  apiProtocol: string;
  apiHost: string;
  apiPort: number;
  apiEndPoint: string;
  solrPath: string;

  appURL: string;
  appName: string;
  language: string;

  getBackEndUrl(): string;
  getBackEndUrlWithEndpoint(): string;
}
