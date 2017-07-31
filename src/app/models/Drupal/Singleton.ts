import { Settings } from './';

export interface AppSingleton{
  instance:AppSingleton,
  Settings:Settings,
}

export class AppSingleton{
    private static instance: AppSingleton;
    private settings:Settings;

    constructor() {
      this.settings = new Settings();
    }

    static get Instance() {
      if (this.instance === null || this.instance === undefined) {
        this.instance = new AppSingleton();
      }
      return this.instance;
    }

    static get Settings (){
      return this.Instance.settings;
    }
}
