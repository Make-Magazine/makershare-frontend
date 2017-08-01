import { Settings } from '../../';

export interface Singleton{
  instance:Singleton,
  Settings:Settings,
}

export class Singleton{
    private static instance: Singleton;
    private settings:Settings;

    constructor() {
      this.settings = new Settings();
    }

    static get Instance() {
      if (this.instance === null || this.instance === undefined) {
        this.instance = new Singleton();
      }
      return this.instance;
    }

    static get Settings (){
      return this.Instance.settings;
    }
}
